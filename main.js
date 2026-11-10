(function () {
  var root = document.documentElement;
  if (window.top !== window.self) {
    root.hidden = true;
    return;
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasObserver = 'IntersectionObserver' in window;

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  var navLinks = nav ? nav.querySelectorAll('a') : [];

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('open', open);
    });
    navLinks.forEach(function (link) { link.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });
  }

  if (hasObserver) {
    var map = {};
    navLinks.forEach(function (link) { map[link.getAttribute('href').slice(1)] = link; });
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (link && !entry.isIntersecting) link.classList.remove('active');
      });
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        navLinks.forEach(function (other) { other.classList.remove('active'); });
        link.classList.add('active');
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(function (section) { sectionObserver.observe(section); });
  }

  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  if (header) {
    var ticking = false;
    var syncHeader = function () {
      var y = window.pageYOffset;
      var max = root.scrollHeight - window.innerHeight;
      header.classList.toggle('scrolled', y > 8);
      if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(y / max, 1).toFixed(4) : '0');
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncHeader);
    }, { passive: true });
    window.addEventListener('resize', syncHeader, { passive: true });
    syncHeader();
  }

  var reveals = document.querySelectorAll('.rv');
  if (hasObserver && !reduceMotion && reveals.length) {
    root.classList.add('js');
    var revealObserver = new IntersectionObserver(function (entries) {
      var order = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--d', Math.min(order, 5) * 90 + 'ms');
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
        order += 1;
      });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  var grid = document.getElementById('craftGrid');
  var result = document.getElementById('craftResult');
  var chips = document.querySelectorAll('.chip[data-g]');
  if (grid && result && chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var on = chip.getAttribute('aria-pressed') !== 'true';
        chip.setAttribute('aria-pressed', String(on));
        grid.querySelectorAll('[data-g="' + chip.getAttribute('data-g') + '"]').forEach(function (cell) {
          cell.classList.toggle('off', !on);
        });
        var all = Array.prototype.every.call(chips, function (c) { return c.getAttribute('aria-pressed') === 'true'; });
        result.classList.toggle('lit', all);
      });
    });
  }
})();
