(function () {
  var root = document.documentElement;
  var SUPPORTED = ['es', 'en', 'pt', 'fr', 'de', 'it', 'ru', 'tr', 'ar', 'zh-Hans', 'zh-Hant', 'ja', 'ko'];
  var STORE = 'mcs-lang';
  var FALLBACK = { menu_open: 'Abrir menú', menu_close: 'Cerrar menú' };
  var MAIL = 'makemcstudio@gmail.com';
  var MCS = window.MCS = { dict: {}, lang: 'es' };

  function readStore() {
    try {
      var value = window.localStorage.getItem(STORE);
      return SUPPORTED.indexOf(value) > -1 ? value : null;
    } catch (error) {
      return null;
    }
  }

  function writeStore(code) {
    try {
      window.localStorage.setItem(STORE, code);
    } catch (error) {}
  }

  function match(tag) {
    var lower = String(tag || '').toLowerCase();
    var base = lower.split('-')[0];
    if (base === 'zh') return /-(tw|hk|mo|hant)(-|$)/.test(lower) ? 'zh-Hant' : 'zh-Hans';
    return SUPPORTED.indexOf(base) > -1 ? base : null;
  }

  function detect() {
    var saved = readStore();
    if (saved) return saved;
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length; i += 1) {
      var found = match(list[i]);
      if (found) return found;
    }
    return 'en';
  }

  MCS.t = function (key) {
    var table = MCS.dict[MCS.lang];
    if (table && table[key] != null) return table[key];
    return FALLBACK[key] || '';
  };

  function setDirection(code) {
    root.lang = code;
    root.dir = code === 'ar' ? 'rtl' : 'ltr';
  }

  function fill(el, value) {
    var tag = el.getAttribute('data-rich');
    if (!tag) {
      el.textContent = value;
      return;
    }
    el.textContent = '';
    value.split(/(\[[^\]]*\])/).forEach(function (part) {
      if (!part) return;
      if (part.charAt(0) === '[' && part.charAt(part.length - 1) === ']') {
        var child = document.createElement(tag);
        child.textContent = part.slice(1, -1);
        el.appendChild(child);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }

  function apply(code) {
    var table = MCS.dict[code];
    if (!table) return;
    MCS.lang = code;
    setDirection(code);

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var value = table[el.getAttribute('data-i18n')];
      if (value != null) fill(el, value);
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        var value = table[parts[1]];
        if (value == null) return;
        el.setAttribute(parts[0], value.replace('{name}', el.getAttribute('data-name') || ''));
      });
    });

    var mail = document.querySelector('[data-mail]');
    if (mail && table.mail_subject != null && table.mail_body != null) {
      mail.setAttribute('href', 'mailto:' + MAIL + '?subject=' + encodeURIComponent(table.mail_subject) + '&body=' + encodeURIComponent(table.mail_body));
    }

    var select = document.getElementById('langSelect');
    if (select) select.value = code;
    document.dispatchEvent(new Event('mcs:lang'));
  }

  function load(code, done) {
    if (MCS.dict[code]) {
      done(true);
      return;
    }
    var script = document.createElement('script');
    script.src = 'lang/' + code + '.js?v=46';
    script.onload = function () { done(Boolean(MCS.dict[code])); };
    script.onerror = function () { done(false); };
    (document.head || root).appendChild(script);
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function reveal() {
    root.classList.remove('i18n-pending');
  }

  MCS.set = function (code, remember) {
    load(code, function (ok) {
      if (!ok) {
        setDirection(MCS.lang);
        reveal();
        return;
      }
      ready(function () {
        apply(code);
        if (remember) writeStore(code);
        reveal();
      });
    });
  };

  var initial = detect();
  if (initial !== 'es') {
    root.classList.add('i18n-pending');
    setDirection(initial);
    window.setTimeout(function () {
      if (MCS.lang !== initial) {
        setDirection(MCS.lang);
        reveal();
      }
    }, 2500);
    MCS.set(initial, false);
  }

  ready(function () {
    var select = document.getElementById('langSelect');
    if (!select) return;
    select.value = MCS.lang;
    select.addEventListener('change', function () { MCS.set(select.value, true); });
  });
})();
