(function () {
  var root = document.documentElement;
  var skin = root.getAttribute('data-skin');
  if (!skin) return;

  var SVG = 'http://www.w3.org/2000/svg';
  var cache = {};

  function canvas(w, h) {
    var cells = [];
    for (var y = 0; y < h; y++) {
      var row = [];
      for (var x = 0; x < w; x++) row.push('.');
      cells.push(row);
    }
    return {
      w: w,
      h: h,
      cells: cells,
      px: function (x, y, c) {
        if (x >= 0 && y >= 0 && x < w && y < h) cells[y][x] = c;
      },
      rect: function (x, y, rw, rh, c) {
        for (var j = 0; j < rh; j++) for (var i = 0; i < rw; i++) this.px(x + i, y + j, c);
      },
      ell: function (cx, cy, rx, ry, c) {
        for (var j = 0; j < h; j++) {
          for (var i = 0; i < w; i++) {
            var dx = (i - cx) / rx;
            var dy = (j - cy) / ry;
            if (dx * dx + dy * dy <= 1) this.px(i, j, c);
          }
        }
      },
      rows: function (x, y, list) {
        for (var j = 0; j < list.length; j++) {
          for (var i = 0; i < list[j].length; i++) {
            if (list[j][i] !== '.') this.px(x + i, y + j, list[j][i]);
          }
        }
      }
    };
  }

  function fromRows(list) {
    var c = canvas(list[0].length, list.length);
    c.rows(0, 0, list);
    return c;
  }

  var MAKERS = {
    tree: function () {
      var c = canvas(13, 17);
      c.rect(5, 0, 3, 1, 'Y');
      c.rect(4, 1, 5, 1, 'Y');
      c.rect(5, 2, 3, 1, 'Y');
      [[3, 4, 3], [7, 4, 5], [11, 4, 7]].forEach(function (t) {
        for (var r = 0; r < t[1]; r++) {
          var w = t[2] + r * 2;
          var x = 6 - (w - 1) / 2;
          c.rect(x, t[0] + r, w, 1, 'G');
          c.px(x, t[0] + r, 'D');
          c.px(x + 1, t[0] + r, r ? 'D' : 'G');
        }
        c.rect(6 - (t[2] + 6 - 1) / 2, t[0] + 3, t[2] + 6, 1, 'D');
      });
      c.rect(5, 15, 3, 2, 'B');
      c.px(5, 8, 'R'); c.px(8, 10, 'Y'); c.px(4, 12, 'Y'); c.px(9, 13, 'R'); c.px(6, 5, 'R'); c.px(7, 12, 'B2');
      return c;
    },
    snowman: function () {
      var c = canvas(9, 15);
      c.rect(2, 0, 5, 2, 'K');
      c.rect(2, 1, 5, 1, 'R');
      c.rect(1, 2, 7, 1, 'K');
      c.ell(4, 5, 3, 2.7, 'W');
      c.ell(4, 11, 4, 3.8, 'W');
      c.px(3, 4, 'K'); c.px(5, 4, 'K'); c.px(4, 5, 'O'); c.px(5, 5, 'O');
      c.rect(2, 7, 5, 1, 'R');
      c.px(4, 9, 'K'); c.px(4, 11, 'K'); c.px(4, 13, 'K');
      c.px(0, 8, 'B'); c.px(1, 9, 'B'); c.px(8, 8, 'B'); c.px(7, 9, 'B');
      return c;
    },
    gift: function () {
      var c = canvas(8, 9);
      c.rect(2, 0, 2, 2, 'Y');
      c.rect(4, 0, 2, 2, 'Y');
      c.rect(0, 3, 8, 6, 'A');
      c.rect(0, 3, 8, 2, 'A2');
      c.rect(3, 2, 2, 7, 'Y');
      return c;
    },
    cane: function () {
      var c = canvas(7, 11);
      c.rows(0, 0, [
        '..WRWR.',
        '.WR..WR',
        '.RW...R',
        '.....WR',
        '..WR..W',
        '..RW...',
        '..WR...',
        '..RW...',
        '..WR...',
        '..RW...',
        '..WR...'
      ]);
      return c;
    },
    hat: function () {
      return fromRows([
        '..........WW..',
        '......RRRRRWW.',
        '.....RRRRRRRW.',
        '....RRRRRRRR..',
        '...RRRRRRRRR..',
        '..RRRRRRRRR...',
        '.RRRRRRRRRR...',
        'WWWWWWWWWWWW..',
        'WWWWWWWWWWWW..'
      ]);
    },
    bow: function () {
      return fromRows([
        '.YYY....YYY.',
        'YYYYY..YYYYY',
        'YYYYYYYYYYYY',
        'YYYYYYYYYYYY',
        '.YYY.YY.YYY.',
        '......YY....',
        '.....YYYY...',
        '....YY..YY..'
      ]);
    },
    sleigh: function () {
      return fromRows([
        '...........Y.',
        '..RRRRR...YY.',
        '..RRRRRR.YY..',
        'KKRRRRRRRK...',
        '.KKKKKKKK....'
      ]);
    },
    pumpkin: function () {
      var c = canvas(11, 10);
      c.rect(5, 0, 2, 2, 'G');
      c.ell(5, 6, 5, 3.6, 'O');
      c.rect(2, 4, 1, 5, 'O2');
      c.rect(8, 4, 1, 5, 'O2');
      c.rect(5, 3, 1, 6, 'O2');
      c.px(3, 5, 'Y'); c.px(4, 5, 'Y'); c.px(4, 4, 'Y');
      c.px(7, 5, 'Y'); c.px(6, 5, 'Y'); c.px(6, 4, 'Y');
      c.rect(3, 7, 5, 1, 'Y'); c.px(4, 8, 'Y'); c.px(6, 8, 'Y');
      return c;
    },
    tomb: function () {
      var c = fromRows([
        '..GGGGG..',
        '.GGGGGGG.',
        'GGGGGGGGG',
        'GGGWWWGGG',
        'GGGGWGGGG',
        'GGGGWGGGG',
        'GGGGGGGGG',
        'GGGGGGGGG',
        'GGGGGGGGG'
      ]);
      return c;
    },
    ghost: function () {
      return fromRows([
        '..WWWWW..',
        '.WWWWWWW.',
        'WWWWWWWWW',
        'WWKKWKKWW',
        'WWKKWKKWW',
        'WWWWWWWWW',
        'WWWWKWWWW',
        'WWWWWWWWW',
        'WW.WWW.WW'
      ]);
    },
    bat: function () {
      return fromRows([
        'K.......K',
        'KK.K.K.KK',
        'KKKKKKKKK',
        '.KK.K.KK.',
        '..K...K..'
      ]);
    },
    witch: function () {
      return fromRows([
        '......K..',
        '.....KK..',
        '.....KK..',
        '....KKKK.',
        '....KPPK.',
        '...KKKKKK',
        '..KKKKKKK',
        'KKKKKKKKKK'.slice(0, 9)
      ]);
    },
    heart: function () {
      return fromRows([
        '.RRR..RRR.',
        'RRRRRRRRRR',
        'RRRRRRRRRR',
        'RRRRRRRRRR',
        '.RRRRRRRR.',
        '..RRRRRR..',
        '...RRRR...',
        '....RR....'
      ]);
    },
    heartl: function () {
      return fromRows([
        '.RR.RR.',
        'RRRRRRR',
        'RRRRRRR',
        '.RRRRR.',
        '..RRR..',
        '...R...'
      ]);
    },
    rose: function () {
      return fromRows([
        '.RRR.',
        'RRDRR',
        'RDRRR',
        '.RRR.',
        '..G..',
        'G.G..',
        '.GG..',
        '..G..',
        '..G..',
        '..G..'
      ]);
    },
    letter: function () {
      return fromRows([
        'WWWWWWWWW',
        'WRWWWWWRW',
        'WWRWWWRWW',
        'WWWRWRWWW',
        'WWWWRWWWW',
        'WWWWWWWWW',
        'WWWWWWWWW'
      ]);
    },
    arrow: function () {
      return fromRows([
        '..........Y.Y',
        '.........YYY.',
        'KKKKKKKKKKY..',
        '..........YYY',
        '..........Y.Y'.slice(0, 13)
      ]);
    },
    skull: function () {
      return fromRows([
        '.WWWWWWW.',
        'WWWWWWWWW',
        'WPPWWWPPW',
        'WPKWWWKPW',
        'WWWWKWWWW',
        '.WWWWWWW.',
        '.WKWKWKW.',
        '.WWWWWWW.'
      ]);
    },
    flower: function () {
      return fromRows([
        '.OOO.OOO.',
        'OOOOOOOOO',
        'OOYOOOYOO',
        'OOOOYOOOO',
        'OOYOOOYOO',
        'OOOOOOOOO',
        '.OOO.OOO.'
      ]);
    },
    candle: function () {
      return fromRows([
        '.Y.',
        'YOY',
        '.W.',
        'WWW',
        'WWW',
        'WWW',
        'WWW',
        'WWW'
      ]);
    },
    butterfly: function () {
      return fromRows([
        'OO...OO',
        'OKO.OKO',
        'OOOKOOO',
        '.OOKOO.',
        '..OKO..'
      ]);
    },
    altar: function () {
      var c = canvas(25, 11);
      c.rect(7, 0, 11, 3, 'P');
      c.rect(3, 3, 19, 3, 'M');
      c.rect(0, 6, 25, 5, 'P');
      c.rect(0, 6, 25, 1, 'Y');
      c.rect(3, 3, 19, 1, 'Y');
      c.rect(7, 0, 11, 1, 'Y');
      for (var x = 2; x < 24; x += 4) c.rect(x, 8, 2, 2, 'O');
      return c;
    },
    bell: function () {
      return fromRows([
        '....YY....',
        '...YYYY...',
        '..YYYYYY..',
        '..YYWYYY..',
        '.YYYWYYYY.',
        '.YYYWYYYY.',
        '.YYYYYYYY.',
        'YYYYYYYYYY',
        'YYYYYYYYYY',
        '..YYYYYY..',
        '....YY....'
      ]);
    },
    flag: function () {
      var c = canvas(10, 16);
      c.rect(0, 0, 1, 16, 'K2');
      c.rect(1, 1, 3, 7, 'F1');
      c.rect(4, 1, 3, 7, 'F2');
      c.rect(7, 1, 3, 7, 'F3');
      return c;
    },
    flagh: function () {
      var c = canvas(10, 16);
      c.rect(0, 0, 1, 16, 'K2');
      c.rect(1, 1, 9, 3, 'F1');
      c.rect(1, 4, 9, 2, 'F2');
      c.rect(1, 6, 9, 2, 'F3');
      return c;
    },
    mxflag: function () {
      var c = canvas(10, 16);
      c.rect(0, 0, 1, 16, 'K2');
      c.rect(1, 1, 3, 7, 'G');
      c.rect(4, 1, 3, 7, 'W');
      c.rect(7, 1, 3, 7, 'R');
      c.px(5, 4, 'B2'); c.px(5, 3, 'B2');
      return c;
    },
    crown: function () {
      return fromRows([
        'Y...Y...Y',
        'YY.YYY.YY',
        'YYYYYYYYY',
        'YRYYBYYRY',
        'YYYYYYYYY',
        'YYYYYYYYY'
      ]);
    },
    star: function () {
      return fromRows([
        '....Y....',
        '....Y....',
        '...YYY...',
        'YYYYYYYYY',
        '.YYYYYYY.',
        '..YYYYY..',
        '..YY.YY..',
        '.YY...YY.'
      ]);
    },
    bstar: function () {
      return fromRows([
        '.......Y.......',
        '.......Y.......',
        '......YWY......',
        '......YWY......',
        'YYYYYYYWYYYYYYY',
        '......YWY......',
        '......YWY......',
        '.......Y.......',
        '.......Y.......'
      ]);
    },
    rosca: function () {
      var c = canvas(13, 7);
      c.ell(6, 3, 6.4, 3.4, 'B');
      c.ell(6, 3, 2.4, 1.2, 'K0');
      c.px(2, 2, 'R'); c.px(5, 0, 'Y'); c.px(9, 1, 'G'); c.px(11, 3, 'R'); c.px(8, 5, 'Y'); c.px(3, 5, 'G'); c.px(6, 6, 'R');
      return c;
    },
    camel: function () {
      return fromRows([
        '.........CC..',
        '...CC...CCCC.',
        '..CCCC..CCC..',
        '..CCCCCCCCC..',
        '.CCCCCCCCCC..',
        'CCCCCCCCCCC..',
        'CCCCCCCCCC...',
        '.C.C...C.C...',
        '.C.C...C.C...',
        '.C.C...C.C...'
      ]);
    },
    egg: function () {
      var c = canvas(7, 9);
      c.ell(3, 5, 3.2, 3.9, 'A');
      c.rect(0, 4, 7, 1, 'A2');
      c.rect(0, 6, 7, 1, 'A3');
      return c;
    },
    chick: function () {
      return fromRows([
        '..YYY..',
        '.YKYYY.',
        '.YYYOO.',
        'YYYYYY.',
        'YYYYYYY',
        '.YYYYY.',
        '..O.O..'
      ]);
    },
    tulip: function () {
      return fromRows([
        'P.P.P',
        'PPPPP',
        '.PPP.',
        '..G..',
        'G.G..',
        '.GGG.',
        '..G..',
        '..G..'
      ]);
    },
    bunny: function () {
      return fromRows([
        '.WW...WW.',
        '.WP...PW.',
        '.WP...PW.',
        '.WW...WW.',
        '..WWWWW..',
        '.WWWWWWW.',
        'WWKWWWKWW',
        'WWWWPWWWW',
        '.WWWWWWW.'
      ]);
    },
    mask: function () {
      return fromRows([
        'Y.....P.....B',
        'YY...PPP...BB',
        '.YYMMMMMMMBB.',
        '..MMMMMMMMM..',
        '..MKKMMMKKM..',
        '..MMMMMMMMM..',
        '...MMMMMMM...'
      ]);
    },
    balloon: function () {
      var c = canvas(7, 13);
      c.ell(3, 3.5, 3.2, 3.6, 'A');
      c.px(1, 2, 'W'); c.px(1, 3, 'W');
      c.px(3, 7, 'A2');
      for (var y = 8; y < 13; y++) c.px(3 + (y % 2), y, 'K2');
      return c;
    },
    burst: function () {
      var c = canvas(13, 13);
      var d = [[0, -6], [0, -5], [0, 5], [0, 6], [-6, 0], [-5, 0], [5, 0], [6, 0], [-4, -4], [4, -4], [-4, 4], [4, 4], [-2, -3], [2, -3], [-2, 3], [2, 3], [-3, -2], [3, -2], [-3, 2], [3, 2]];
      d.forEach(function (p, i) { c.px(6 + p[0], 6 + p[1], i % 3 === 0 ? 'A2' : 'A'); });
      c.px(6, 6, 'W');
      return c;
    },
    clock: function () {
      var c = canvas(13, 13);
      c.ell(6, 6, 6.2, 6.2, 'Y');
      c.ell(6, 6, 4.6, 4.6, 'N');
      c.rect(6, 2, 1, 5, 'W');
      c.rect(6, 6, 3, 1, 'W');
      c.px(6, 1, 'Y'); c.px(6, 11, 'Y'); c.px(1, 6, 'Y'); c.px(11, 6, 'Y');
      return c;
    },
    party: function () {
      return fromRows([
        '.....Y...',
        '.....Y...',
        '....PPP..',
        '...PYPYP.',
        '...PPPPP.',
        '..PYPYPYP',
        '..PPPPPPP',
        '.PYPYPYPY',
        '.PPPPPPPP'
      ]);
    },
    web: function () {
      return fromRows([
        'WWWWWWWWWW',
        'WW.W..W..W',
        'W.W.W..W..',
        'WWWWWWW...',
        'W.WW.W.W..',
        'W.W.WW.W..',
        'WWWWW.WW..',
        'W..W.W.W..',
        'W..W..WW..',
        'W..W...W..'
      ]);
    },
    cactus: function () {
      return fromRows([
        '...GG...',
        '.G.GG.G.',
        '.G.GG.G.',
        '.GGGGGG.',
        '...GG...',
        '...GG...',
        '...GG...'
      ]);
    },
    spark: function () {
      return fromRows([
        '..A..',
        '..A..',
        'AAWAA',
        '..A..',
        '..A..'
      ]);
    }
  };

  var COLORS = {
    Y: '#ffd24a', G: '#2fa95b', D: '#1f7a41', R: '#e63946', B: '#8a5a2b', B2: '#ffd24a', W: '#ffffff', K: '#1a1020',
    K2: '#c9c2d6', O: '#ff7a1a', O2: '#d95f08', P: '#b88cff', M: '#ff5fd2', N: '#10182e', F1: '#e63946', F2: '#ffffff', F3: '#2fa95b',
    K0: '#0e0b14', C: '#c9a36a', B2X: '#8a5a2b'
  };

  var VARIANTS = {
    gift: { a: { A: '#e63946', A2: '#b9242f' }, b: { A: '#2fa95b', A2: '#1f7a41' }, c: { A: '#6d3fc4', A2: '#4d2a94' } },
    egg: { a: { A: '#ff9ad1', A2: '#ffffff', A3: '#9fe3c3' }, b: { A: '#9fe3c3', A2: '#ffe28a', A3: '#ff9ad1' }, c: { A: '#ffe28a', A2: '#b88cff', A3: '#ffffff' } },
    balloon: { a: { A: '#ff4fd8', A2: '#ff4fd8' }, b: { A: '#4fe3ff', A2: '#4fe3ff' }, c: { A: '#ffe14a', A2: '#ffe14a' } },
    burst: { a: { A: '#ffd24a', A2: '#ffffff' }, b: { A: '#ff5c93', A2: '#ffffff' }, c: { A: '#4fe3ff', A2: '#ffffff' }, d: { A: '#2fa95b', A2: '#ffffff' }, e: { A: '#ff4b5c', A2: '#ffffff' } },
    spark: { a: { A: '#ffd24a' }, b: { A: '#ffffff' }, c: { A: '#ff9ad1' } },
    flower: { a: { O: '#ff9a1f', Y: '#ffd24a' }, b: { O: '#ff5fd2', Y: '#ffd24a' } },
    pumpkin: { a: {} },
    hat: { a: {} },
    heart: { a: { R: '#ff5c93' }, b: { R: '#e63946' } },
    heartl: { a: { R: '#ff5c93' }, b: { R: '#ffa6c4' } },
    mask: { a: { Y: '#ffe14a', P: '#ff4fd8', B: '#4fe3ff', M: '#ffffff' } }
  };

  function sprite(name, variant) {
    var key = name + (variant || '');
    if (cache[key]) return cache[key].cloneNode(true);
    var c = MAKERS[name]();
    var table = {};
    var override = VARIANTS[name] && VARIANTS[name][variant] || {};
    var buckets = {};
    for (var y = 0; y < c.h; y++) {
      var x = 0;
      while (x < c.w) {
        var ch = c.cells[y][x];
        if (ch === '.') { x++; continue; }
        var start = x;
        while (x < c.w && c.cells[y][x] === ch) x++;
        (buckets[ch] = buckets[ch] || []).push('M' + start + ' ' + y + 'h' + (x - start) + 'v1h-' + (x - start) + 'z');
      }
    }
    var svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + c.w + ' ' + c.h);
    svg.setAttribute('width', c.w);
    svg.setAttribute('height', c.h);
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.style.setProperty('--w', c.w);
    svg.style.setProperty('--h', c.h);
    Object.keys(buckets).forEach(function (ch) {
      var path = document.createElementNS(SVG, 'path');
      path.setAttribute('d', buckets[ch].join(''));
      var fill = override[ch] || COLORS[ch] || '#ffffff';
      path.setAttribute('fill', fill);
      if (/^F[123]$/.test(ch)) {
        path.setAttribute('class', 'tone-' + ch.toLowerCase());
        path.removeAttribute('fill');
      }
      svg.appendChild(path);
    });
    cache[key] = svg;
    return svg.cloneNode(true);
  }

  function node(tag, cls) {
    var n = document.createElement(tag);
    n.className = cls;
    n.setAttribute('data-skin-node', '');
    n.setAttribute('aria-hidden', 'true');
    return n;
  }

  function put(parent, spec) {
    var holder = document.createElement('span');
    holder.className = 'sk-sprite' + (spec.cls ? ' ' + spec.cls : '');
    holder.style.setProperty('--x', spec.x + '%');
    if (spec.b !== undefined) holder.style.setProperty('--b', spec.b + 'px');
    if (spec.s) holder.style.setProperty('--sc', spec.s);
    if (spec.d !== undefined) holder.style.setProperty('--dl', spec.d + 's');
    if (spec.flip) holder.classList.add('flip');
    holder.appendChild(sprite(spec.n, spec.v));
    parent.appendChild(holder);
  }

  var SCENES = {
    xmas: {
      hero: [
        { n: 'tree', x: 3 }, { n: 'gift', v: 'a', x: 11.5 }, { n: 'gift', v: 'b', x: 14, cls: 'x', s: 0.8 },
        { n: 'snowman', x: 23, cls: 'x' }, { n: 'cane', x: 33 }, { n: 'tree', x: 44, cls: 'x', s: 0.8 },
        { n: 'gift', v: 'c', x: 56, cls: 'x' }, { n: 'tree', x: 66, cls: 'x' }, { n: 'cane', x: 76, cls: 'x' },
        { n: 'snowman', x: 84 }, { n: 'gift', v: 'a', x: 90 }, { n: 'tree', x: 94 }
      ],
      foot: [
        { n: 'tree', x: 4 }, { n: 'gift', v: 'b', x: 12 }, { n: 'tree', x: 28, cls: 'x', s: 0.8 },
        { n: 'snowman', x: 48, cls: 'x' }, { n: 'gift', v: 'a', x: 62, cls: 'x' }, { n: 'cane', x: 72 },
        { n: 'tree', x: 82 }, { n: 'gift', v: 'c', x: 91 }
      ],
      topper: { n: 'hat', cls: 'tilt-l' },
      corner: { n: 'bow' },
      sky: function (g) {
        [[3, 46, 14], [21, 22, 18], [40, 19, 14], [57, 24, 18], [59, 21, 14], [79, 37, 18], [99, 47, 14], [115, 26, 18], [117, 23, 14], [135, 17, 14], [153, 46, 18]].forEach(function (r) {
          rect(g, r[0] - 1, r[1] - 2, r[2] + 2, 2, 'sk-snow');
        });
        sky(g, 'sleigh', 98, 6, 'sk-fly');
        sky(g, 'tree', 118, 61);
        sky(g, 'tree', 32, 61);
        sky(g, 'gift', 62, 70, '', 'a');
      }
    },
    newyear: {
      hero: [
        { n: 'clock', x: 4 }, { n: 'burst', v: 'a', x: 14, cls: 'x pop', b: 22 }, { n: 'party', x: 24 },
        { n: 'balloon', v: 'a', x: 32, cls: 'bob' }, { n: 'balloon', v: 'c', x: 36, cls: 'bob x', d: 1 }, { n: 'burst', v: 'c', x: 48, cls: 'pop', b: 26, d: 1.3 },
        { n: 'party', x: 60, cls: 'x', s: 0.8 }, { n: 'balloon', v: 'b', x: 68, cls: 'bob x', d: 2 }, { n: 'burst', v: 'b', x: 78, cls: 'x pop', b: 20, d: 2.1 },
        { n: 'clock', x: 90 }
      ],
      foot: [
        { n: 'party', x: 5 }, { n: 'balloon', v: 'a', x: 14, cls: 'bob' }, { n: 'burst', v: 'a', x: 30, cls: 'pop x', b: 18 },
        { n: 'clock', x: 50, cls: 'x' }, { n: 'balloon', v: 'b', x: 66, cls: 'bob x' }, { n: 'burst', v: 'c', x: 78, cls: 'pop', b: 14, d: 1 }, { n: 'party', x: 90 }
      ],
      topper: { n: 'party', cls: 'tilt-r' },
      corner: { n: 'burst', v: 'a' },
      sky: function (g) {
        sky(g, 'burst', 24, 8, 'pop', 'a');
        sky(g, 'burst', 70, 4, 'pop d1', 'b');
        sky(g, 'burst', 108, 14, 'pop d2', 'c');
        sky(g, 'burst', 140, 2, 'pop d3', 'a');
        sky(g, 'spark', 48, 12, 'tw', 'b');
        sky(g, 'spark', 88, 24, 'tw d1', 'a');
        sky(g, 'spark', 124, 30, 'tw d2', 'c');
      }
    },
    halloween: {
      hero: [
        { n: 'pumpkin', x: 3 }, { n: 'tomb', x: 14 }, { n: 'ghost', x: 24, cls: 'bob x' }, { n: 'pumpkin', x: 34, cls: 'x', s: 0.8 },
        { n: 'bat', x: 46, b: 24, cls: 'bob' }, { n: 'tomb', x: 56, cls: 'x' }, { n: 'pumpkin', x: 66 },
        { n: 'ghost', x: 78, cls: 'bob x', d: 1.5 }, { n: 'tomb', x: 86 }, { n: 'pumpkin', x: 93, cls: 'x' }
      ],
      foot: [
        { n: 'tomb', x: 4 }, { n: 'pumpkin', x: 14 }, { n: 'bat', x: 30, b: 28, cls: 'bob' }, { n: 'ghost', x: 44, cls: 'bob x' },
        { n: 'pumpkin', x: 62, cls: 'x' }, { n: 'tomb', x: 74 }, { n: 'pumpkin', x: 88 }
      ],
      topper: { n: 'pumpkin', cls: 'tilt-l' },
      corner: { n: 'web' },
      sky: function (g) {
        sky(g, 'bat', 108, 6, 'sk-fly');
        sky(g, 'bat', 70, 12, 'sk-fly d1');
        sky(g, 'bat', 40, 4, 'sk-fly d2');
        sky(g, 'pumpkin', 22, 70);
        sky(g, 'pumpkin', 72, 70);
        sky(g, 'pumpkin', 124, 70);
        sky(g, 'tomb', 4, 69);
      }
    },
    valentine: {
      hero: [
        { n: 'heart', v: 'a', x: 4, cls: 'bob' }, { n: 'rose', x: 13 }, { n: 'letter', x: 21, cls: 'x' }, { n: 'heartl', v: 'b', x: 32, b: 20, cls: 'bob x', d: 1 },
        { n: 'arrow', x: 40 }, { n: 'heart', v: 'b', x: 52, cls: 'bob', d: 0.7 }, { n: 'rose', x: 62, cls: 'x' },
        { n: 'letter', x: 72 }, { n: 'heartl', v: 'a', x: 82, b: 18, cls: 'bob x', d: 1.4 }, { n: 'rose', x: 90 }
      ],
      foot: [
        { n: 'rose', x: 5 }, { n: 'heart', v: 'a', x: 14, cls: 'bob' }, { n: 'letter', x: 30, cls: 'x' }, { n: 'heartl', v: 'b', x: 46, b: 18, cls: 'bob' },
        { n: 'arrow', x: 60, cls: 'x' }, { n: 'rose', x: 76 }, { n: 'heart', v: 'b', x: 88, cls: 'bob' }
      ],
      topper: { n: 'heart', v: 'a', cls: 'tilt-r' },
      corner: { n: 'heartl', v: 'a' },
      sky: function (g) {
        sky(g, 'heartl', 20, 20, 'sk-rise');
        sky(g, 'heartl', 60, 30, 'sk-rise d1', 'b');
        sky(g, 'heartl', 96, 24, 'sk-rise d2');
        sky(g, 'heartl', 132, 34, 'sk-rise d3', 'b');
        sky(g, 'rose', 8, 68);
        sky(g, 'rose', 150, 68);
      }
    },
    muertos: {
      hero: [
        { n: 'flower', v: 'a', x: 3 }, { n: 'candle', x: 10, cls: 'flick' }, { n: 'skull', x: 15 }, { n: 'flower', v: 'b', x: 24, cls: 'x' },
        { n: 'altar', x: 34, cls: 'x' }, { n: 'candle', x: 52, cls: 'flick x', d: 0.8 }, { n: 'butterfly', x: 58, b: 26, cls: 'bob' },
        { n: 'skull', x: 66, cls: 'x' }, { n: 'flower', v: 'a', x: 74 }, { n: 'candle', x: 82, cls: 'flick', d: 0.4 }, { n: 'skull', x: 88 }, { n: 'flower', v: 'b', x: 94, cls: 'x' }
      ],
      foot: [
        { n: 'flower', v: 'a', x: 4 }, { n: 'skull', x: 12 }, { n: 'candle', x: 20, cls: 'flick' }, { n: 'altar', x: 38, cls: 'x' },
        { n: 'butterfly', x: 62, b: 30, cls: 'bob x' }, { n: 'candle', x: 72, cls: 'flick', d: 0.6 }, { n: 'flower', v: 'b', x: 82 }, { n: 'skull', x: 90 }
      ],
      topper: { n: 'skull', cls: 'tilt-r' },
      corner: { n: 'flower', v: 'a' },
      sky: function (g) {
        sky(g, 'butterfly', 30, 10, 'sk-fly');
        sky(g, 'butterfly', 90, 18, 'sk-fly d1');
        sky(g, 'butterfly', 130, 6, 'sk-fly d2');
        sky(g, 'candle', 18, 70, 'flick');
        sky(g, 'candle', 66, 70, 'flick d1');
        sky(g, 'candle', 112, 70, 'flick d2');
        sky(g, 'flower', 8, 72, '', 'a');
        sky(g, 'flower', 140, 72, '', 'b');
      }
    },
    mx: {
      hero: [
        { n: 'mxflag', x: 3 }, { n: 'cactus', x: 11, cls: 'x' }, { n: 'bell', x: 18 }, { n: 'burst', v: 'd', x: 30, cls: 'pop x', b: 20 },
        { n: 'mxflag', x: 42, cls: 'x' }, { n: 'burst', v: 'e', x: 52, cls: 'pop', b: 24, d: 1.2 }, { n: 'bell', x: 64, cls: 'x' },
        { n: 'mxflag', x: 74 }, { n: 'burst', v: 'a', x: 84, cls: 'pop x', b: 18, d: 2 }, { n: 'cactus', x: 92 }
      ],
      foot: [
        { n: 'mxflag', x: 4 }, { n: 'bell', x: 14 }, { n: 'cactus', x: 26, cls: 'x' }, { n: 'burst', v: 'd', x: 40, cls: 'pop', b: 14 },
        { n: 'mxflag', x: 58, cls: 'x' }, { n: 'burst', v: 'e', x: 70, cls: 'pop', b: 16, d: 1 }, { n: 'bell', x: 82 }, { n: 'mxflag', x: 92 }
      ],
      topper: { n: 'mxflag', cls: 'tilt-r' },
      corner: { n: 'bell' },
      sky: function (g) {
        sky(g, 'burst', 26, 6, 'pop', 'd');
        sky(g, 'burst', 76, 3, 'pop d1', 'e');
        sky(g, 'burst', 112, 12, 'pop d2', 'a');
        sky(g, 'burst', 146, 4, 'pop d3', 'd');
        sky(g, 'mxflag', 25, 6);
        sky(g, 'mxflag', 121, 10);
        sky(g, 'mxflag', 139, 1);
      }
    },
    kings: {
      hero: [
        { n: 'crown', x: 3 }, { n: 'gift', v: 'c', x: 11 }, { n: 'camel', x: 20, cls: 'x' }, { n: 'bstar', x: 34, b: 20, cls: 'tw' },
        { n: 'rosca', x: 46 }, { n: 'camel', x: 56, cls: 'x', flip: true }, { n: 'gift', v: 'a', x: 70 }, { n: 'crown', x: 78, cls: 'x' },
        { n: 'camel', x: 86 }, { n: 'bstar', x: 94, b: 22, cls: 'tw x', d: 1 }
      ],
      foot: [
        { n: 'camel', x: 4 }, { n: 'crown', x: 16 }, { n: 'rosca', x: 28, cls: 'x' }, { n: 'bstar', x: 44, b: 20, cls: 'tw' },
        { n: 'gift', v: 'c', x: 60, cls: 'x' }, { n: 'camel', x: 70 }, { n: 'gift', v: 'a', x: 84 }, { n: 'crown', x: 92 }
      ],
      topper: { n: 'crown', cls: 'tilt-l' },
      corner: { n: 'bstar' },
      sky: function (g) {
        sky(g, 'bstar', 112, 6, 'tw', '');
        sky(g, 'spark', 40, 10, 'tw', 'a');
        sky(g, 'spark', 84, 22, 'tw d1', 'b');
        sky(g, 'camel', 14, 67);
        sky(g, 'camel', 36, 67);
        sky(g, 'camel', 58, 67);
        sky(g, 'crown', 136, 70);
      }
    },
    easter: {
      hero: [
        { n: 'tulip', x: 3 }, { n: 'egg', v: 'a', x: 9 }, { n: 'chick', x: 16, cls: 'bob' }, { n: 'bunny', x: 25, cls: 'x' },
        { n: 'egg', v: 'b', x: 36, cls: 'x' }, { n: 'tulip', x: 44 }, { n: 'egg', v: 'c', x: 52 }, { n: 'chick', x: 62, cls: 'bob x', d: 1 },
        { n: 'bunny', x: 72 }, { n: 'egg', v: 'a', x: 84, cls: 'x' }, { n: 'tulip', x: 92 }
      ],
      foot: [
        { n: 'egg', v: 'b', x: 5 }, { n: 'tulip', x: 12 }, { n: 'bunny', x: 22 }, { n: 'chick', x: 38, cls: 'bob x' }, { n: 'egg', v: 'a', x: 52 },
        { n: 'tulip', x: 62, cls: 'x' }, { n: 'egg', v: 'c', x: 74 }, { n: 'chick', x: 86, cls: 'bob' }
      ],
      topper: { n: 'bunny', cls: 'tilt-r' },
      corner: { n: 'egg', v: 'a' },
      sky: function (g) {
        sky(g, 'egg', 16, 70, '', 'a');
        sky(g, 'egg', 48, 70, '', 'b');
        sky(g, 'egg', 94, 70, '', 'c');
        sky(g, 'egg', 130, 70, '', 'a');
        sky(g, 'tulip', 6, 70);
        sky(g, 'tulip', 64, 70);
        sky(g, 'bunny', 108, 69);
        sky(g, 'chick', 78, 71);
      }
    },
    carnival: {
      hero: [
        { n: 'mask', x: 3 }, { n: 'balloon', v: 'a', x: 14, cls: 'bob' }, { n: 'balloon', v: 'b', x: 18, cls: 'bob x', d: 1 }, { n: 'burst', v: 'b', x: 28, cls: 'pop x', b: 22 },
        { n: 'mask', x: 40, cls: 'x' }, { n: 'balloon', v: 'c', x: 52, cls: 'bob', d: 0.6 }, { n: 'spark', v: 'c', x: 60, b: 24, cls: 'tw' },
        { n: 'mask', x: 70 }, { n: 'balloon', v: 'a', x: 82, cls: 'bob x', d: 1.6 }, { n: 'balloon', v: 'b', x: 87, cls: 'bob', d: 0.3 }, { n: 'mask', x: 93, cls: 'x' }
      ],
      foot: [
        { n: 'mask', x: 4 }, { n: 'balloon', v: 'a', x: 16, cls: 'bob' }, { n: 'burst', v: 'b', x: 30, cls: 'pop', b: 14 },
        { n: 'mask', x: 48, cls: 'x' }, { n: 'balloon', v: 'c', x: 62, cls: 'bob x' }, { n: 'balloon', v: 'b', x: 68, cls: 'bob' }, { n: 'mask', x: 84 }
      ],
      topper: { n: 'mask', cls: 'tilt-r' },
      corner: { n: 'mask', v: 'a' },
      sky: function (g) {
        sky(g, 'balloon', 20, 14, 'sk-rise', 'a');
        sky(g, 'balloon', 62, 24, 'sk-rise d1', 'b');
        sky(g, 'balloon', 104, 18, 'sk-rise d2', 'c');
        sky(g, 'balloon', 138, 26, 'sk-rise d3', 'a');
        sky(g, 'burst', 40, 6, 'pop', 'b');
        sky(g, 'burst', 120, 8, 'pop d1', 'c');
      }
    },
    nation: {
      hero: [
        { n: 'flag', x: 3 }, { n: 'burst', v: 'a', x: 12, cls: 'pop x', b: 20 }, { n: 'flagh', x: 22, cls: 'x' }, { n: 'burst', v: 'b', x: 34, cls: 'pop', b: 24, d: 1 },
        { n: 'flag', x: 46 }, { n: 'burst', v: 'c', x: 58, cls: 'pop x', b: 18, d: 2 }, { n: 'flagh', x: 70 }, { n: 'burst', v: 'e', x: 80, cls: 'pop', b: 22, d: 1.4 }, { n: 'flag', x: 92 }
      ],
      foot: [
        { n: 'flag', x: 4 }, { n: 'burst', v: 'a', x: 16, cls: 'pop', b: 14 }, { n: 'flagh', x: 30, cls: 'x' }, { n: 'burst', v: 'c', x: 46, cls: 'pop x', b: 16, d: 1 },
        { n: 'flag', x: 60 }, { n: 'burst', v: 'b', x: 74, cls: 'pop', b: 12, d: 2 }, { n: 'flagh', x: 90 }
      ],
      topper: { n: 'flag', cls: 'tilt-r' },
      corner: { n: 'burst', v: 'a' },
      sky: function (g) {
        sky(g, 'burst', 24, 8, 'pop', 'a');
        sky(g, 'burst', 76, 3, 'pop d1', 'b');
        sky(g, 'burst', 112, 12, 'pop d2', 'c');
        sky(g, 'burst', 146, 4, 'pop d3', 'e');
        sky(g, 'flag', 25, 6);
        sky(g, 'flag', 121, 10);
      }
    }
  };

  function rect(g, x, y, w, h, cls) {
    var r = document.createElementNS(SVG, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y);
    r.setAttribute('width', w);
    r.setAttribute('height', h);
    r.setAttribute('class', cls);
    g.appendChild(r);
  }

  function sky(g, name, x, y, cls, variant) {
    var s = sprite(name, variant);
    var w = Number(s.getAttribute('width'));
    var h = Number(s.getAttribute('height'));
    s.removeAttribute('width');
    s.removeAttribute('height');
    s.style.removeProperty('--w');
    s.style.removeProperty('--h');
    s.setAttribute('x', x);
    s.setAttribute('y', y);
    s.setAttribute('width', w);
    s.setAttribute('height', h);
    var holder = document.createElementNS(SVG, 'g');
    holder.setAttribute('class', 'sk-over ' + (cls || ''));
    holder.appendChild(s);
    g.appendChild(holder);
  }

  var scene = SCENES[skin];
  if (!scene) return;

  function ready() {
    var host = document.body;
    var bg = node('div', 'skin-bg');
    host.insertBefore(bg, host.firstChild);

    var ticker = document.querySelector('.ticker');
    if (ticker) {
      var top = node('div', 'scene scene-hero');
      var topIn = node('div', 'scene-in');
      scene.hero.forEach(function (s) { put(topIn, s); });
      top.appendChild(topIn);
      ticker.parentNode.insertBefore(top, ticker);
    }

    var footer = document.querySelector('.site-footer');
    if (footer) {
      var bottom = node('div', 'scene scene-foot');
      var bottomIn = node('div', 'scene-in');
      scene.foot.forEach(function (s) { put(bottomIn, s); });
      bottom.appendChild(bottomIn);
      footer.parentNode.insertBefore(bottom, footer);
    }

    var craft = document.querySelector('.hero .t-craft');
    if (craft && scene.topper) {
      var topper = node('div', 'skin-topper');
      put(topper, { n: scene.topper.n, v: scene.topper.v, x: 0, cls: scene.topper.cls });
      craft.appendChild(topper);
    }

    var result = document.querySelector('.t-result');
    if (result && scene.corner) {
      var corner = node('div', 'skin-corner');
      put(corner, { n: scene.corner.n, v: scene.corner.v, x: 0 });
      result.appendChild(corner);
    }

    var skyline = document.querySelector('.skyline');
    if (skyline && scene.sky) {
      var group = document.createElementNS(SVG, 'g');
      group.setAttribute('data-skin-node', '');
      scene.sky(group);
      skyline.appendChild(group);
    }

    greet();
  }

  function greet() {
    var sets = document.querySelectorAll('.ticker-set');
    var text = window.MCS && window.MCS.greeting ? window.MCS.greeting() : '';
    if (!text) return;
    sets.forEach(function (set) {
      var item = set.querySelector('[data-skin-node]');
      if (!item) {
        item = document.createElement('span');
        item.className = 'sk-word';
        item.setAttribute('data-skin-node', '');
        set.insertBefore(item, set.firstChild);
      }
      item.textContent = text;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();

  document.addEventListener('mcs:lang', greet);
})();
