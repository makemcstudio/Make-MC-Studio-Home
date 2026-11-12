(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'mcs-fest-off';
  var DAY = 86400000;

  var ZONES = {
    MX: 'America/Mexico_City America/Cancun America/Merida America/Monterrey America/Chihuahua America/Hermosillo America/Mazatlan America/Tijuana America/Matamoros America/Ojinaga America/Bahia_Banderas America/Ciudad_Juarez',
    ES: 'Europe/Madrid Atlantic/Canary Africa/Ceuta',
    PT: 'Europe/Lisbon Atlantic/Madeira Atlantic/Azores',
    AR: 'America/Argentina/ America/Buenos_Aires America/Cordoba America/Mendoza America/Jujuy America/Catamarca America/Rosario',
    CL: 'America/Santiago America/Punta_Arenas Pacific/Easter',
    CO: 'America/Bogota',
    PE: 'America/Lima',
    VE: 'America/Caracas',
    EC: 'America/Guayaquil Pacific/Galapagos',
    BO: 'America/La_Paz',
    PY: 'America/Asuncion',
    UY: 'America/Montevideo',
    BR: 'America/Sao_Paulo America/Bahia America/Fortaleza America/Recife America/Belem America/Manaus America/Cuiaba America/Campo_Grande America/Porto_Velho America/Rio_Branco America/Boa_Vista America/Maceio America/Araguaina America/Santarem America/Noronha America/Eirunepe',
    CR: 'America/Costa_Rica',
    PA: 'America/Panama',
    GT: 'America/Guatemala',
    SV: 'America/El_Salvador',
    HN: 'America/Tegucigalpa',
    NI: 'America/Managua',
    DO: 'America/Santo_Domingo',
    CU: 'America/Havana',
    PR: 'America/Puerto_Rico',
    US: 'America/New_York America/Chicago America/Denver America/Los_Angeles America/Phoenix America/Anchorage America/Detroit America/Boise America/Adak America/Juneau America/Sitka America/Nome America/Yakutat America/Metlakatla America/Menominee Pacific/Honolulu America/Indiana/ America/Kentucky/ America/North_Dakota/',
    CA: 'America/Toronto America/Vancouver America/Edmonton America/Winnipeg America/Halifax America/St_Johns America/Regina America/Montreal America/Whitehorse America/Yellowknife America/Iqaluit America/Moncton America/Glace_Bay America/Goose_Bay America/Thunder_Bay America/Swift_Current America/Dawson America/Dawson_Creek America/Fort_Nelson America/Cambridge_Bay America/Rankin_Inlet America/Inuvik America/Atikokan',
    IE: 'Europe/Dublin',
    DE: 'Europe/Berlin Europe/Busingen',
    JP: 'Asia/Tokyo',
    KR: 'Asia/Seoul',
    CN: 'Asia/Shanghai Asia/Urumqi',
    TW: 'Asia/Taipei',
    HK: 'Asia/Hong_Kong',
    SG: 'Asia/Singapore',
    RU: 'Europe/Moscow Europe/Kaliningrad Europe/Samara Europe/Volgograd Europe/Kirov Europe/Astrakhan Europe/Saratov Europe/Ulyanovsk Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr',
    BY: 'Europe/Minsk',
    RS: 'Europe/Belgrade',
    GR: 'Europe/Athens',
    RO: 'Europe/Bucharest',
    BG: 'Europe/Sofia',
    UA: 'Europe/Kyiv Europe/Kiev',
    GE: 'Asia/Tbilisi',
    SA: 'Asia/Riyadh',
    QA: 'Asia/Qatar',
    KW: 'Asia/Kuwait',
    BH: 'Asia/Bahrain',
    OM: 'Asia/Muscat',
    YE: 'Asia/Aden',
    IQ: 'Asia/Baghdad',
    IR: 'Asia/Tehran',
    AF: 'Asia/Kabul',
    PK: 'Asia/Karachi',
    BD: 'Asia/Dhaka',
    SY: 'Asia/Damascus',
    LY: 'Africa/Tripoli',
    DZ: 'Africa/Algiers',
    MA: 'Africa/Casablanca',
    TN: 'Africa/Tunis',
    SD: 'Africa/Khartoum',
    TR: 'Europe/Istanbul Asia/Istanbul',
    IL: 'Asia/Jerusalem Asia/Tel_Aviv',
    BN: 'Asia/Brunei',
    MR: 'Africa/Nouakchott',
    SO: 'Africa/Mogadishu',
    DJ: 'Africa/Djibouti',
    MV: 'Indian/Maldives'
  };

  var LUNAR = { 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19], 2035: [2, 8] };

  var SPANISH = ['ES', 'MX', 'AR', 'UY', 'PY', 'CO', 'VE', 'PE', 'BO', 'EC', 'CL', 'CR', 'SV', 'GT', 'HN', 'NI', 'PA', 'DO', 'PR', 'CU'];
  var HOLY = SPANISH.concat(['PT', 'BR']);
  var KINGS = ['ES', 'MX', 'AR', 'UY', 'PY', 'CO', 'VE', 'PE', 'BO', 'EC', 'SV', 'GT', 'HN', 'NI', 'PA', 'DO', 'PR'];
  var CARNIVAL = ['BR', 'UY', 'CO', 'PA', 'BO', 'AR', 'ES', 'DO', 'PR', 'VE', 'EC', 'PY', 'PT'];
  var QUIET = ['SA', 'QA', 'KW', 'BH', 'OM', 'YE', 'IQ', 'IR', 'AF', 'PK', 'BD', 'SY', 'LY', 'DZ', 'MA', 'TN', 'SD', 'TR', 'IL', 'BN', 'MR', 'SO', 'DJ', 'MV'];
  var QUIET_LANGS = ['ar', 'fa', 'ur', 'tr', 'he', 'ps', 'ku', 'sd', 'ug', 'dv'];
  var ORTHODOX = ['RU', 'BY', 'RS', 'GR', 'RO', 'BG', 'UA', 'GE'];
  var ORTHODOX_JANUARY = ['RU', 'BY', 'RS', 'GE'];
  var SAINTS = ['GT', 'SV', 'HN', 'NI', 'BO', 'EC', 'PE', 'ES'];
  var CENTRAL = ['CR', 'GT', 'SV', 'HN', 'NI'];
  var MAY_SECOND = ['BR', 'CL', 'CO', 'PE', 'UY', 'US', 'VE', 'EC', 'CA', 'CU', 'PR'];
  var JUNE_THIRD = ['MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'US', 'CA'];

  var LOOKS = {
    xmas: { decor: 'snow' },
    newyear: { decor: 'confetti' },
    halloween: { decor: 'embers' },
    valentine: { decor: 'hearts' },
    lent: {},
    easter: { decor: 'petals' },
    kings: { decor: 'confetti' },
    carnival: { decor: 'confetti', bunting: true },
    muertos: { decor: 'petals', bunting: true },
    mx: { decor: 'confetti', bunting: true },
    cl: { decor: 'confetti', bunting: true },
    ar: { decor: 'confetti', bunting: true },
    co: { decor: 'confetti', bunting: true },
    pe: { decor: 'confetti', bunting: true },
    ve: { decor: 'confetti', bunting: true },
    br: { decor: 'confetti', bunting: true },
    ec: { decor: 'confetti', bunting: true },
    bo: { decor: 'confetti', bunting: true },
    uy: { decor: 'confetti', bunting: true },
    py: { decor: 'confetti', bunting: true },
    ca: { decor: 'confetti', bunting: true },
    'do': { decor: 'confetti', bunting: true },
    pa: { decor: 'confetti', bunting: true },
    es: { decor: 'confetti', bunting: true },
    us: { decor: 'confetti', bunting: true },
    thanks: { decor: 'petals' },
    mother: { decor: 'petals' },
    father: {},
    junina: { decor: 'confetti', bunting: true },
    sanjuan: { decor: 'embers' },
    inti: { decor: 'confetti', bunting: true },
    patrick: { decor: 'confetti' },
    lunar: { decor: 'confetti', bunting: true },
    oktober: { bunting: true },
    jordi: { decor: 'petals' }
  };

  function at(year, month, day) {
    return new Date(year, month - 1, day);
  }

  function shift(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }

  function fixed(month, day, before, after) {
    return function (year) {
      var base = at(year, month, day);
      return [shift(base, -before), shift(base, after)];
    };
  }

  function nth(month, weekday, n, before, after) {
    return function (year) {
      var first = at(year, month, 1);
      var base = shift(first, (weekday - first.getDay() + 7) % 7 + (n - 1) * 7);
      return [shift(base, -before), shift(base, after)];
    };
  }

  function easterDate(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return at(year, month, day);
  }

  function easter(from, to) {
    return function (year) {
      var base = easterDate(year);
      return [shift(base, from), shift(base, to)];
    };
  }

  function orthodoxEaster(from, to) {
    return function (year) {
      var a = year % 4;
      var b = year % 7;
      var c = year % 19;
      var d = (19 * c + 15) % 30;
      var e = (2 * a + 4 * b - d + 34) % 7;
      var month = Math.floor((d + e + 114) / 31);
      var day = ((d + e + 114) % 31) + 1;
      var base = at(year, month, day + 13);
      return [shift(base, from), shift(base, to)];
    };
  }

  function lunar(year) {
    var entry = LUNAR[year];
    if (!entry) return null;
    var base = at(year, entry[0], entry[1]);
    return [shift(base, -1), shift(base, 2)];
  }

  function oktoberfest(year) {
    var start = at(year, 9, 16);
    start = shift(start, (6 - start.getDay() + 7) % 7);
    var end = at(year, 10, 1);
    end = shift(end, (7 - end.getDay()) % 7);
    var unity = at(year, 10, 3);
    if (end < unity) end = unity;
    return [start, end];
  }

  var HOLIDAYS = [
    { id: 'newyear', look: 'newyear', p: 1, w: function (year) { return [at(year, 12, 30), at(year + 1, 1, 2)]; } },
    { id: 'christmas', look: 'xmas', p: 1, no: ORTHODOX_JANUARY, w: fixed(12, 25, 9, 1) },
    { id: 'christmas-orthodox', name: 'christmas', look: 'xmas', p: 1, c: ORTHODOX_JANUARY, w: fixed(1, 7, 3, 0) },
    { id: 'halloween', look: 'halloween', p: 1, w: fixed(10, 31, 6, 0) },
    { id: 'valentine', look: 'valentine', p: 1, no: ['CO', 'BR'], w: fixed(2, 14, 4, 0) },
    { id: 'amistad', look: 'valentine', p: 2, c: ['CO'], w: nth(9, 6, 3, 3, 0) },
    { id: 'namorados', look: 'valentine', p: 2, c: ['BR'], w: fixed(6, 12, 4, 0) },
    { id: 'easter', look: 'easter', p: 1, no: ORTHODOX, w: easter(-2, 1) },
    { id: 'easter-orthodox', name: 'easter', look: 'easter', p: 1, c: ORTHODOX, w: orthodoxEaster(-2, 1) },
    { id: 'lent', look: 'lent', p: 2, c: HOLY, w: easter(-7, -1) },
    { id: 'kings', look: 'kings', p: 2, c: KINGS, w: fixed(1, 6, 3, 0) },
    { id: 'carnival', look: 'carnival', p: 2, c: CARNIVAL, w: easter(-51, -46) },
    { id: 'muertos', look: 'muertos', p: 2, c: ['MX'], w: fixed(11, 2, 4, 0) },
    { id: 'saints', look: 'muertos', p: 2, c: SAINTS, w: fixed(11, 2, 1, 0) },
    { id: 'independence-mx', look: 'mx', p: 3, c: ['MX'], w: fixed(9, 16, 2, 0) },
    { id: 'independence-cl', look: 'cl', p: 3, c: ['CL'], w: fixed(9, 18, 2, 1) },
    { id: 'may25-ar', look: 'ar', p: 3, c: ['AR'], w: fixed(5, 25, 2, 0) },
    { id: 'july9-ar', look: 'ar', p: 3, c: ['AR'], w: fixed(7, 9, 2, 0) },
    { id: 'independence-co', look: 'co', p: 3, c: ['CO'], w: fixed(7, 20, 2, 0) },
    { id: 'independence-pe', look: 'pe', p: 3, c: ['PE'], w: fixed(7, 28, 2, 1) },
    { id: 'independence-ve', look: 've', p: 3, c: ['VE'], w: fixed(7, 5, 2, 0) },
    { id: 'independence-br', look: 'br', p: 3, c: ['BR'], w: fixed(9, 7, 2, 0) },
    { id: 'independence-ec', look: 'ec', p: 3, c: ['EC'], w: fixed(8, 10, 2, 0) },
    { id: 'independence-bo', look: 'bo', p: 3, c: ['BO'], w: fixed(8, 6, 2, 0) },
    { id: 'independence-uy', look: 'uy', p: 3, c: ['UY'], w: fixed(8, 25, 2, 0) },
    { id: 'independence-py', look: 'py', p: 3, c: ['PY'], w: fixed(5, 15, 2, 0) },
    { id: 'independence-ca', look: 'ca', p: 3, c: CENTRAL, w: fixed(9, 15, 2, 0) },
    { id: 'independence-do', look: 'do', p: 3, c: ['DO'], w: fixed(2, 27, 2, 0) },
    { id: 'independence-pa', look: 'pa', p: 3, c: ['PA'], w: fixed(11, 3, 2, 0) },
    { id: 'hispanidad', look: 'es', p: 3, c: ['ES'], w: fixed(10, 12, 2, 0) },
    { id: 'constitution', look: 'es', p: 3, c: ['ES'], w: fixed(12, 6, 2, 0) },
    { id: 'july4', look: 'us', p: 3, c: ['US'], w: fixed(7, 4, 2, 0) },
    { id: 'thanksgiving', look: 'thanks', p: 2, c: ['US'], w: nth(11, 4, 4, 2, 1) },
    { id: 'mother-mx', look: 'mother', p: 2, c: ['MX', 'GT', 'SV'], w: fixed(5, 10, 2, 0) },
    { id: 'mother-bo', look: 'mother', p: 2, c: ['BO'], w: fixed(5, 27, 2, 0) },
    { id: 'mother-iberia', look: 'mother', p: 2, c: ['ES', 'PT'], w: nth(5, 0, 1, 2, 0) },
    { id: 'mother-second', look: 'mother', p: 2, c: MAY_SECOND, w: nth(5, 0, 2, 2, 0) },
    { id: 'mother-ar', look: 'mother', p: 2, c: ['AR'], w: nth(10, 0, 3, 2, 0) },
    { id: 'father-third', look: 'father', p: 2, c: JUNE_THIRD, w: nth(6, 0, 3, 2, 0) },
    { id: 'father-iberia', look: 'father', p: 1, c: ['ES', 'PT', 'BO', 'HN'], w: fixed(3, 19, 2, 0) },
    { id: 'father-june', look: 'father', p: 2, c: ['SV', 'GT'], w: fixed(6, 17, 2, 0) },
    { id: 'father-ni', look: 'father', p: 2, c: ['NI'], w: fixed(6, 23, 2, 0) },
    { id: 'father-uy', look: 'father', p: 2, c: ['UY'], w: nth(7, 0, 2, 2, 0) },
    { id: 'father-br', look: 'father', p: 2, c: ['BR'], w: nth(8, 0, 2, 2, 0) },
    { id: 'junina', look: 'junina', p: 2, c: ['BR'], w: fixed(6, 24, 4, 0) },
    { id: 'sanjuan', look: 'sanjuan', p: 2, c: ['ES', 'PT'], w: fixed(6, 24, 2, 0) },
    { id: 'inti', look: 'inti', p: 2, c: ['PE'], w: fixed(6, 24, 2, 0) },
    { id: 'patrick', look: 'patrick', p: 2, c: ['US', 'IE', 'CA', 'AR'], w: fixed(3, 17, 2, 0) },
    { id: 'lunar', look: 'lunar', p: 2, c: ['CN', 'TW', 'HK', 'SG', 'KR'], w: lunar },
    { id: 'oktoberfest', look: 'oktober', p: 2, c: ['DE'], w: oktoberfest },
    { id: 'jordi', look: 'jordi', p: 2, c: ['ES'], l: 'ca', w: fixed(4, 23, 2, 0) }
  ];

  var NAMES = {
    christmas: { es: '¡Feliz Navidad!', en: 'Merry Christmas!', pt: 'Feliz Natal!', fr: 'Joyeux Noël !', de: 'Frohe Weihnachten!', it: 'Buon Natale!', ru: 'С Рождеством!', tr: 'Mutlu Noeller!', ar: 'عيد ميلاد مجيد!', 'zh-Hans': '圣诞快乐！', 'zh-Hant': '聖誕快樂！', ja: 'メリークリスマス！', ko: '메리 크리스마스!' },
    newyear: { es: '¡Feliz Año Nuevo!', en: 'Happy New Year!', pt: 'Feliz Ano Novo!', fr: 'Bonne année !', de: 'Frohes neues Jahr!', it: 'Felice anno nuovo!', ru: 'С Новым годом!', tr: 'Mutlu yıllar!', ar: 'سنة جديدة سعيدة!', 'zh-Hans': '新年快乐！', 'zh-Hant': '新年快樂！', ja: '新年おめでとうございます！', ko: '새해 복 많이 받으세요!' },
    halloween: { es: '¡Feliz Halloween!', en: 'Happy Halloween!', pt: 'Feliz Halloween!', fr: 'Joyeux Halloween !', de: 'Frohes Halloween!', it: 'Buon Halloween!', ru: 'Счастливого Хэллоуина!', tr: 'Mutlu Cadılar Bayramı!', ar: 'هالوين سعيد!', 'zh-Hans': '万圣节快乐！', 'zh-Hant': '萬聖節快樂！', ja: 'ハッピーハロウィン！', ko: '해피 핼러윈!' },
    valentine: { es: '¡Feliz San Valentín!', en: "Happy Valentine's Day!", pt: 'Feliz Dia de São Valentim!', fr: 'Joyeuse Saint-Valentin !', de: 'Alles Gute zum Valentinstag!', it: 'Buon San Valentino!', ru: 'С Днём святого Валентина!', tr: 'Sevgililer Günü kutlu olsun!', ar: 'عيد حب سعيد!', 'zh-Hans': '情人节快乐！', 'zh-Hant': '情人節快樂！', ja: 'ハッピーバレンタイン！', ko: '해피 발렌타인데이!' },
    easter: { es: '¡Felices Pascuas!', en: 'Happy Easter!', pt: 'Feliz Páscoa!', fr: 'Joyeuses Pâques !', de: 'Frohe Ostern!', it: 'Buona Pasqua!', ru: 'С Пасхой!', tr: "Paskalya'nız kutlu olsun!", ar: 'عيد فصح مجيد!', 'zh-Hans': '复活节快乐！', 'zh-Hant': '復活節快樂！', ja: 'イースターおめでとう！', ko: '부활절을 축하합니다!' },
    amistad: { es: '¡Feliz Día del Amor y la Amistad!', en: 'Happy Love and Friendship Day!', pt: 'Feliz Dia do Amor e da Amizade!' },
    namorados: { es: '¡Feliz Día de los Enamorados!', en: "Happy Valentine's Day!", pt: 'Feliz Dia dos Namorados!' },
    lent: { es: 'Semana Santa', en: 'Holy Week', pt: 'Semana Santa' },
    kings: { es: '¡Feliz Día de Reyes!', en: 'Happy Three Kings Day!', pt: 'Feliz Dia de Reis!' },
    carnival: { es: '¡Feliz Carnaval!', en: 'Happy Carnival!', pt: 'Feliz Carnaval!' },
    muertos: { es: '¡Feliz Día de Muertos!', en: 'Happy Day of the Dead!', pt: 'Feliz Dia de Muertos!' },
    saints: { es: 'Día de Todos los Santos y de los Fieles Difuntos', en: "All Saints' and All Souls' Days", pt: 'Dia de Todos os Santos e Finados' },
    'independence-mx': { es: '¡Viva México! Feliz Día de la Independencia', en: 'Viva México! Happy Independence Day', pt: 'Viva o México! Feliz Dia da Independência' },
    'independence-cl': { es: '¡Felices Fiestas Patrias, Chile!', en: 'Happy Chilean National Days!', pt: 'Felizes Festas Pátrias, Chile!' },
    'may25-ar': { es: '¡Feliz 25 de Mayo!', en: 'Happy May Revolution Day!', pt: 'Feliz 25 de Maio, Argentina!' },
    'july9-ar': { es: '¡Feliz 9 de Julio, Día de la Independencia!', en: 'Happy Argentine Independence Day!', pt: 'Feliz Dia da Independência da Argentina!' },
    'independence-co': { es: '¡Feliz Día de la Independencia de Colombia!', en: 'Happy Colombian Independence Day!', pt: 'Feliz Dia da Independência da Colômbia!' },
    'independence-pe': { es: '¡Felices Fiestas Patrias, Perú!', en: 'Happy Peruvian Independence Day!', pt: 'Felizes Festas Pátrias, Peru!' },
    'independence-ve': { es: '¡Feliz Día de la Independencia de Venezuela!', en: 'Happy Venezuelan Independence Day!', pt: 'Feliz Dia da Independência da Venezuela!' },
    'independence-br': { es: '¡Feliz Independencia de Brasil!', en: 'Happy Brazilian Independence Day!', pt: 'Feliz Independência do Brasil!' },
    'independence-ec': { es: '¡Feliz Primer Grito de Independencia!', en: 'Happy First Cry of Independence Day!', pt: 'Feliz Primeiro Grito de Independência do Equador!' },
    'independence-bo': { es: '¡Feliz Día de Bolivia!', en: 'Happy Bolivia Day!', pt: 'Feliz Dia da Bolívia!' },
    'independence-uy': { es: '¡Feliz Día de la Independencia de Uruguay!', en: 'Happy Uruguayan Independence Day!', pt: 'Feliz Dia da Independência do Uruguai!' },
    'independence-py': { es: '¡Feliz Día de la Independencia del Paraguay!', en: 'Happy Paraguayan Independence Day!', pt: 'Feliz Dia da Independência do Paraguai!' },
    'independence-ca': { es: '¡Feliz Día de la Independencia Centroamericana!', en: 'Happy Central American Independence Day!', pt: 'Feliz Dia da Independência da América Central!' },
    'independence-do': { es: '¡Feliz Día de la Independencia Dominicana!', en: 'Happy Dominican Independence Day!', pt: 'Feliz Dia da Independência Dominicana!' },
    'independence-pa': { es: '¡Felices Fiestas Patrias, Panamá!', en: 'Happy Panamanian National Days!', pt: 'Felizes Festas Pátrias, Panamá!' },
    hispanidad: { es: '¡Feliz Fiesta Nacional de España!', en: 'Happy Spanish National Day!', pt: 'Feliz Dia Nacional da Espanha!' },
    constitution: { es: '¡Feliz Día de la Constitución!', en: 'Happy Spanish Constitution Day!', pt: 'Feliz Dia da Constituição Espanhola!' },
    july4: { es: '¡Feliz 4 de Julio!', en: 'Happy 4th of July!', pt: 'Feliz 4 de Julho!' },
    thanksgiving: { es: '¡Feliz Día de Acción de Gracias!', en: 'Happy Thanksgiving!', pt: 'Feliz Dia de Ação de Graças!' },
    'mother-mx': { es: '¡Feliz Día de las Madres!', en: "Happy Mother's Day!", pt: 'Feliz Dia das Mães!' },
    'mother-iberia': { es: '¡Feliz Día de la Madre!', en: "Happy Mother's Day!", pt: 'Feliz Dia da Mãe!' },
    'mother-second': { es: '¡Feliz Día de la Madre!', en: "Happy Mother's Day!", pt: 'Feliz Dia das Mães!' },
    'mother-bo': { es: '¡Feliz Día de la Madre!', en: "Happy Mother's Day!", pt: 'Feliz Dia da Mãe!' },
    'mother-ar': { es: '¡Feliz Día de la Madre!', en: "Happy Mother's Day!", pt: 'Feliz Dia da Mãe!' },
    'father-third': { es: '¡Feliz Día del Padre!', en: "Happy Father's Day!", pt: 'Feliz Dia dos Pais!' },
    'father-iberia': { es: '¡Feliz Día del Padre!', en: "Happy Father's Day!", pt: 'Feliz Dia do Pai!' },
    'father-june': { es: '¡Feliz Día del Padre!', en: "Happy Father's Day!", pt: 'Feliz Dia dos Pais!' },
    'father-ni': { es: '¡Feliz Día del Padre!', en: "Happy Father's Day!", pt: 'Feliz Dia dos Pais!' },
    'father-uy': { es: '¡Feliz Día del Padre!', en: "Happy Father's Day!", pt: 'Feliz Dia dos Pais!' },
    'father-br': { es: '¡Feliz Día del Padre!', en: "Happy Father's Day!", pt: 'Feliz Dia dos Pais!' },
    junina: { es: '¡Felices Fiestas Juninas!', en: 'Happy Festa Junina!', pt: 'Feliz Festa Junina!' },
    sanjuan: { es: '¡Feliz Noche de San Juan!', en: 'Happy Midsummer Night!', pt: 'Feliz Noite de São João!' },
    inti: { es: '¡Feliz Inti Raymi!', en: 'Happy Inti Raymi!', pt: 'Feliz Inti Raymi!' },
    patrick: { es: '¡Feliz Día de San Patricio!', en: "Happy St. Patrick's Day!", pt: 'Feliz Dia de São Patrício!' },
    lunar: { es: '¡Feliz Año Nuevo Lunar!', en: 'Happy Lunar New Year!', pt: 'Feliz Ano Novo Lunar!', 'zh-Hans': '新春快乐！', 'zh-Hant': '新春快樂！', ja: '旧正月おめでとうございます！', ko: '새해 복 많이 받으세요!' },
    oktoberfest: { es: '¡Feliz Oktoberfest!', en: 'Happy Oktoberfest!', pt: 'Feliz Oktoberfest!', de: 'Willkommen zur Wiesn!' },
    jordi: { es: '¡Feliz Sant Jordi!', en: 'Happy Sant Jordi!', pt: 'Feliz Sant Jordi!' }
  };

  var CLOSE = { es: 'Cerrar', en: 'Dismiss', pt: 'Fechar', fr: 'Fermer', de: 'Schließen', it: 'Chiudi', ru: 'Закрыть', tr: 'Kapat', ar: 'إغلاق', 'zh-Hans': '关闭', 'zh-Hant': '關閉', ja: '閉じる', ko: '닫기' };

  var query = new URLSearchParams(window.location.search);

  function readStore() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function writeStore(value) {
    try { window.localStorage.setItem(KEY, value); } catch (e) {}
  }

  function zoneCountry() {
    var zone = '';
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (!zone) return null;
    for (var code in ZONES) {
      var list = ZONES[code].split(' ');
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item === zone || (item.charAt(item.length - 1) === '/' && zone.indexOf(item) === 0)) return code;
      }
    }
    return null;
  }

  function languageCountry() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var match = /^[a-z]{2,3}(?:-[A-Za-z]{4})?-([A-Za-z]{2})$/.exec(list[i]);
      if (match && ZONES[match[1].toUpperCase()]) return match[1].toUpperCase();
    }
    return null;
  }

  function firstLanguage() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return (list[0] || '').toLowerCase().split('-')[0];
  }

  function prefersCatalan() {
    return firstLanguage() === 'ca';
  }

  function region() {
    var forced = (query.get('pais') || '').toUpperCase();
    if (/^[A-Z]{2}$/.test(forced)) return forced;
    return zoneCountry() || languageCountry();
  }

  function today() {
    var forced = /^(\d{4})-(\d{2})-(\d{2})$/.exec(query.get('fecha') || '');
    if (forced) return at(+forced[1], +forced[2], +forced[3]);
    var now = new Date();
    return at(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }

  function applies(holiday, country) {
    if (holiday.c && holiday.c.indexOf(country) === -1) return false;
    if (holiday.no && holiday.no.indexOf(country) !== -1) return false;
    if (holiday.l && !prefersCatalan()) return false;
    return true;
  }

  function find(date, country) {
    var year = date.getFullYear();
    var best = null;
    for (var i = 0; i < HOLIDAYS.length; i++) {
      var holiday = HOLIDAYS[i];
      if (!applies(holiday, country)) continue;
      for (var y = year - 1; y <= year + 1; y++) {
        var span = holiday.w(y);
        if (span && date >= span[0] && date <= span[1]) {
          if (!best || holiday.p > best.p) best = { holiday: holiday, year: y, p: holiday.p };
        }
      }
    }
    return best;
  }

  function choose() {
    var forced = query.get('fest');
    if (forced === 'off') return null;
    if (forced) {
      for (var i = 0; i < HOLIDAYS.length; i++) {
        if (HOLIDAYS[i].id === forced) return { holiday: HOLIDAYS[i], year: today().getFullYear() };
      }
      return null;
    }
    var country = region();
    if (country ? QUIET.indexOf(country) !== -1 : QUIET_LANGS.indexOf(firstLanguage()) !== -1) return null;
    return find(today(), country);
  }

  var active = choose();
  if (!active) return;

  var token = active.holiday.id + '-' + active.year;
  if (!query.get('fest') && readStore() === token) return;

  var look = LOOKS[active.holiday.look];
  var node = null;

  function dismiss() {
    writeStore(token);
    root.removeAttribute('data-look');
    root.removeAttribute('data-bunting');
    var layer = document.querySelector('.fest-layer');
    if (layer) layer.remove();
    if (node) node.remove();
  }

  function words() {
    var lang = (window.MCS && window.MCS.lang) || 'es';
    var names = NAMES[active.holiday.name || active.holiday.id];
    var used = names[lang] ? lang : 'en';
    return { text: names[used], close: CLOSE[lang] || CLOSE.en, lang: used };
  }

  function paint() {
    if (!node) return;
    var copy = words();
    var label = node.querySelector('.fest-text');
    label.textContent = copy.text;
    label.lang = copy.lang;
    label.dir = copy.lang === 'ar' ? 'rtl' : 'ltr';
    node.querySelector('.fest-x').setAttribute('aria-label', copy.close);
  }

  function build() {
    var host = document.querySelector('.hero .t-name');
    if (!host) return;
    node = document.createElement('p');
    node.className = 'fest-hello';
    var text = document.createElement('span');
    text.className = 'fest-text';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'fest-x';
    close.textContent = '×';
    close.addEventListener('click', dismiss);
    node.appendChild(text);
    node.appendChild(close);
    host.insertBefore(node, host.firstChild);
    paint();
  }

  function rain(kind) {
    var motion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var saver = navigator.connection && navigator.connection.saveData;
    if (motion || saver) return;
    var width = window.innerWidth;
    var total = width < 600 ? 14 : width < 1000 ? 22 : 32;
    var layer = document.createElement('div');
    layer.className = 'fest-layer ' + kind;
    layer.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < total; i++) {
      var piece = document.createElement('i');
      var size = kind === 'snow' ? 3 + Math.random() * 5 : kind === 'hearts' ? 10 + Math.random() * 10 : 5 + Math.random() * 7;
      var duration = kind === 'snow' ? 9 + Math.random() * 8 : kind === 'embers' ? 8 + Math.random() * 7 : 7 + Math.random() * 7;
      piece.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
      piece.style.setProperty('--s', size.toFixed(1) + 'px');
      piece.style.setProperty('--d', duration.toFixed(1) + 's');
      piece.style.setProperty('--dl', (-Math.random() * duration).toFixed(1) + 's');
      piece.style.setProperty('--dx', Math.round((Math.random() - 0.5) * 120) + 'px');
      piece.style.setProperty('--r', kind === 'snow' || kind === 'hearts' ? '0deg' : Math.round(Math.random() * 540) + 'deg');
      piece.style.setProperty('--o', (0.55 + Math.random() * 0.4).toFixed(2));
      layer.appendChild(piece);
    }
    document.body.appendChild(layer);
  }

  root.setAttribute('data-look', active.holiday.look);
  if (look.bunting) root.setAttribute('data-bunting', '');

  function start() {
    build();
    if (look.decor) rain(look.decor);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  document.addEventListener('mcs:lang', paint);
})();
