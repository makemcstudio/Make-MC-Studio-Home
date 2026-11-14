(function () {
  var root = document.documentElement;
  if (window.top !== window.self) return;

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var ambient = document.querySelector('.ambient');
  var canvas = document.getElementById('embers');
  var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  var track = document.querySelector('.ticker-track');
  var art = document.querySelector('.t-art');
  var hero = document.querySelector('.hero');
  var grid = document.getElementById('craftGrid');
  var topButton = document.querySelector('.to-top');
  var heroHeight = hero ? hero.offsetHeight : 0;
  var shownHs = -1;
  var topShown = false;
  var connection = navigator.connection;
  var frugal = !!(connection && connection.saveData) || (navigator.hardwareConcurrency || 4) <= 2;

  var width = 0;
  var height = 0;
  var ratio = 1;
  var embers = [];
  var colors = ['#ff751f', '#ffa15c', '#f2f0ee'];
  var running = false;
  var stamp = 0;
  var lastY = 0;
  var speed = 0;
  var rate = 1;
  var shownSy = -1;
  var shownPy = -1;
  var artVisible = false;
  var ticker = null;

  function embersOn() {
    return !!ctx && !calm.matches && !frugal && !root.hasAttribute('data-skin');
  }

  function readColors() {
    var style = window.getComputedStyle(root);
    var a = style.getPropertyValue('--accent').trim();
    var b = style.getPropertyValue('--accent-2').trim();
    var c = style.getPropertyValue('--ink').trim();
    colors = [a || colors[0], b || colors[1], c || colors[2]];
  }

  function spawn(ember, anywhere) {
    var size = [2, 2, 2, 4, 4, 6][Math.floor(Math.random() * 6)];
    ember.s = size;
    ember.x = Math.random() * width;
    ember.y = anywhere ? Math.random() * height : height + size + Math.random() * 40;
    ember.rise = 10 + Math.random() * 26 + size * 3;
    ember.depth = 0.1 + size * 0.07;
    ember.sway = 6 + Math.random() * 16;
    ember.phase = Math.random() * 6.283;
    ember.pulse = 0.6 + Math.random() * 1.4;
    ember.alpha = 0.34 + Math.random() * 0.4;
    ember.tint = Math.random() < 0.58 ? 0 : (Math.random() < 0.7 ? 1 : 2);
    return ember;
  }

  function resize() {
    if (hero) heroHeight = hero.offsetHeight;
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w === width && Math.abs(h - height) < 160) return;
    width = w;
    height = h;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    var count = Math.round(Math.min(48, Math.max(16, (w * h) / 38000)));
    while (embers.length < count) embers.push(spawn({}, true));
    embers.length = count;
    embers.forEach(function (ember) {
      if (ember.x > width) ember.x = Math.random() * width;
      if (ember.y > height + 40) ember.y = Math.random() * height;
    });
  }

  function paint(dt, shift, streak) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    var now = stamp / 1000;
    for (var i = 0; i < embers.length; i += 1) {
      var e = embers[i];
      e.y += (-e.rise * dt) / 1000 - shift * e.depth;
      if (e.y < -e.s - 24 || e.y > height + 60) {
        spawn(e, false);
        if (shift < 0) e.y = -e.s - 4;
        continue;
      }
      var x = e.x + Math.sin(now * 0.5 + e.phase) * e.sway;
      var glow = 0.55 + 0.45 * Math.sin(now * e.pulse + e.phase);
      ctx.globalAlpha = e.alpha * glow;
      ctx.fillStyle = colors[e.tint];
      var px = Math.round(x / 2) * 2;
      var py = Math.round(e.y / 2) * 2;
      ctx.fillRect(px, py, e.s, e.s);
      if (e.s > 2) {
        ctx.globalAlpha = e.alpha * glow * 0.22;
        ctx.fillRect(px - 2, py - 2, e.s + 4, e.s + 4);
      }
      if (streak > 1.5) {
        var tail = Math.min(34, streak * e.depth * 2.4);
        ctx.globalAlpha = e.alpha * glow * 0.45;
        ctx.fillRect(px, shift > 0 ? py - tail : py + e.s, e.s, tail);
      }
    }
    ctx.globalAlpha = 1;
  }

  function frame(t) {
    var dt = Math.min(t - stamp || 16, 50);
    stamp = t;
    var y = window.pageYOffset;
    var dy = ((y - lastY) * 16.7) / Math.max(dt, 8);
    lastY = y;
    speed += (dy - speed) * 0.2;

    var max = root.scrollHeight - window.innerHeight;
    var sy = max > 0 ? Math.min(y / max, 1) : 0;
    if (ambient && Math.abs(sy - shownSy) > 0.0005) {
      shownSy = sy;
      ambient.style.setProperty('--sy', sy.toFixed(4));
    }

    if (hero && heroHeight && !calm.matches) {
      var hs = Math.min(1, Math.max(0, y / heroHeight));
      if (Math.abs(hs - shownHs) > 0.002) {
        shownHs = hs;
        hero.style.setProperty('--hs', hs.toFixed(3));
      }
    }

    if (topButton) {
      var wantTop = y > window.innerHeight * 1.1;
      if (wantTop !== topShown) {
        topShown = wantTop;
        topButton.classList.toggle('show', wantTop);
      }
    }

    if (art && artVisible) {
      var box = art.getBoundingClientRect();
      var py = Math.max(0, Math.min(1, (window.innerHeight - box.top) / (window.innerHeight + box.height)));
      if (Math.abs(py - shownPy) > 0.002) {
        shownPy = py;
        art.style.setProperty('--py', py.toFixed(3));
      }
    }

    if (track && !calm.matches) {
      if (!ticker) ticker = track.getAnimations && track.getAnimations()[0];
      if (ticker) {
        var target = 1 + Math.min(Math.abs(speed) * 0.45, 7);
        rate += (target - rate) * 0.1;
        if (Math.abs(rate - 1) < 0.01) rate = 1;
        ticker.playbackRate = rate;
      }
    }

    var drawing = embersOn();
    if (drawing) {
      paint(dt, Math.abs(speed) > 0.1 ? speed : 0, Math.abs(speed));
      canvas.classList.add('on');
    } else {
      if (canvas) canvas.classList.remove('on');
      if (ctx && width) ctx.clearRect(0, 0, width, height);
    }

    if (drawing || Math.abs(speed) > 0.05 || rate !== 1) {
      window.requestAnimationFrame(frame);
    } else {
      running = false;
    }
  }

  function kick() {
    if (running) return;
    running = true;
    lastY = window.pageYOffset;
    stamp = performance.now();
    window.requestAnimationFrame(frame);
  }

  if (ctx) {
    readColors();
    resize();
    window.addEventListener('resize', function () {
      resize();
      kick();
    }, { passive: true });
  }
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('load', function () {
    if (hero) heroHeight = hero.offsetHeight;
    kick();
  });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) kick();
  });
  if (calm.addEventListener) calm.addEventListener('change', kick);
  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (ctx) readColors();
      kick();
    }).observe(root, { attributes: true, attributeFilter: ['data-skin', 'data-look'] });
  }
  if (art && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      artVisible = entries[0].isIntersecting;
      if (artVisible) kick();
    }, { rootMargin: '10% 0px' }).observe(art);
  }
  kick();

  if (topButton) {
    topButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: calm.matches ? 'auto' : 'smooth' });
      topButton.blur();
    });
  }

  if (!calm.matches) {
    var sparks = null;
    var sparkCtx = null;
    var bits = [];
    var sparkStamp = 0;
    var sparkRunning = false;

    var step = function (t) {
      var dt = Math.min((t - sparkStamp) / 1000, 0.05);
      sparkStamp = t;
      sparkCtx.clearRect(0, 0, sparks.width, sparks.height);
      bits = bits.filter(function (bit) {
        bit.life -= dt;
        if (bit.life <= 0) return false;
        bit.vy += 900 * dt;
        bit.x += bit.vx * dt;
        bit.y += bit.vy * dt;
        sparkCtx.globalAlpha = Math.min(1, bit.life / 0.35);
        sparkCtx.fillStyle = colors[bit.tint];
        sparkCtx.fillRect(Math.round(bit.x / 2) * 2, Math.round(bit.y / 2) * 2, bit.s, bit.s);
        return true;
      });
      sparkCtx.globalAlpha = 1;
      if (bits.length) {
        window.requestAnimationFrame(step);
      } else {
        sparkRunning = false;
        sparks.remove();
        sparks = null;
        sparkCtx = null;
      }
    };

    document.addEventListener('pointerdown', function (event) {
      var target = event.target.closest ? event.target.closest('a,button') : null;
      if (!target || event.button > 0) return;
      if (!sparks) {
        sparks = document.createElement('canvas');
        sparks.className = 'burst';
        sparks.setAttribute('aria-hidden', 'true');
        sparkCtx = sparks.getContext('2d');
        document.body.appendChild(sparks);
      }
      if (!sparkCtx) return;
      if (sparks.width !== window.innerWidth || sparks.height !== window.innerHeight) {
        sparks.width = window.innerWidth;
        sparks.height = window.innerHeight;
      }
      for (var i = 0; i < 14; i += 1) {
        var angle = Math.random() * 6.283;
        var power = 110 + Math.random() * 230;
        bits.push({
          x: event.clientX,
          y: event.clientY,
          vx: Math.cos(angle) * power,
          vy: Math.sin(angle) * power - 150,
          s: Math.random() < 0.6 ? 4 : 6,
          life: 0.5 + Math.random() * 0.4,
          tint: Math.floor(Math.random() * 3)
        });
      }
      if (!sparkRunning) {
        sparkRunning = true;
        sparkStamp = performance.now();
        window.requestAnimationFrame(step);
      }
    }, { passive: true });
  }

  if (!fine.matches || calm.matches) return;

  var tilted = null;
  var pulled = null;
  var selector = '.card,.fact,.step,.ing,.panel';
  var current = null;
  var pointerX = 0;
  var pointerY = 0;
  var queued = false;
  var inHero = false;

  function flush() {
    queued = false;
    if (current) {
      var box = current.getBoundingClientRect();
      current.style.setProperty('--mx', Math.round(pointerX - box.left) + 'px');
      current.style.setProperty('--my', Math.round(pointerY - box.top) + 'px');
    }
    if (tilted) {
      var tb = tilted.getBoundingClientRect();
      var tx = (pointerX - tb.left) / tb.width;
      var ty = (pointerY - tb.top) / tb.height;
      tilted.style.setProperty('--mry', ((tx - 0.5) * 9).toFixed(2) + 'deg');
      tilted.style.setProperty('--mrx', ((0.5 - ty) * 7).toFixed(2) + 'deg');
    }
    if (pulled) {
      var pb = pulled.getBoundingClientRect();
      var px = Math.max(-8, Math.min(8, (pointerX - (pb.left + pb.width / 2)) * 0.22));
      var py = Math.max(-6, Math.min(6, (pointerY - (pb.top + pb.height / 2)) * 0.22));
      pulled.style.setProperty('--bx', px.toFixed(1) + 'px');
      pulled.style.setProperty('--by', py.toFixed(1) + 'px');
    }
    if (inHero && hero) {
      var rect = hero.getBoundingClientRect();
      var nx = (pointerX - rect.left) / rect.width;
      var ny = (pointerY - rect.top) / rect.height;
      hero.style.setProperty('--hx', Math.round(pointerX - rect.left) + 'px');
      hero.style.setProperty('--hy', Math.round(pointerY - rect.top) + 'px');
      hero.style.setProperty('--ho', '1');
      if (grid) {
        grid.style.setProperty('--ry', ((nx - 0.5) * 12).toFixed(2) + 'deg');
        grid.style.setProperty('--rx', ((0.5 - ny) * 10).toFixed(2) + 'deg');
      }
    }
  }

  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(flush);
  }

  function settle() {
    if (tilted) {
      tilted.style.setProperty('--mrx', '0deg');
      tilted.style.setProperty('--mry', '0deg');
      tilted = null;
    }
    if (pulled) {
      pulled.style.setProperty('--bx', '0px');
      pulled.style.setProperty('--by', '0px');
      pulled = null;
    }
  }

  function leaveHero() {
    inHero = false;
    if (hero) hero.style.setProperty('--ho', '0');
    if (grid) {
      grid.style.setProperty('--rx', '0deg');
      grid.style.setProperty('--ry', '0deg');
    }
  }

  document.addEventListener('pointermove', function (event) {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    var target = event.target.closest ? event.target.closest(selector) : null;
    if (target !== current) {
      if (current) current.classList.remove('hot');
      current = target;
      if (current) current.classList.add('hot');
    }
    var card = event.target.closest ? event.target.closest('.member') : null;
    var magnet = event.target.closest ? event.target.closest('.btn:not(.btn-link),.social-icon') : null;
    if (card !== tilted || magnet !== pulled) {
      var keepCard = card;
      var keepMagnet = magnet;
      settle();
      tilted = keepCard;
      pulled = keepMagnet;
    }
    var over = !!(hero && event.target.closest && event.target.closest('.hero'));
    if (over !== inHero) {
      if (over) inHero = true;
      else leaveHero();
    }
    if (current || inHero || tilted || pulled) schedule();
  }, { passive: true });

  window.addEventListener('scroll', function () {
    if (current) current.classList.remove('hot');
    current = null;
    settle();
    if (inHero) leaveHero();
  }, { passive: true });

  root.addEventListener('mouseleave', function () {
    if (current) current.classList.remove('hot');
    current = null;
    settle();
    leaveHero();
  });
})();
