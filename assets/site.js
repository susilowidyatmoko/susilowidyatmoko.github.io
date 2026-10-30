// Language switch (EN default, choice remembered) and schematic bridge elevations.
(function () {
  var root = document.documentElement;
  if (localStorage.getItem('lang') === 'id') root.classList.add('lang-id');
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lang-btn')) return;
    var id = root.classList.toggle('lang-id');
    localStorage.setItem('lang', id ? 'id' : 'en');
  });
})();

// <div class="elev" data-spans="78.2,130,78.2"></div> -> schematic BC elevation (not to scale vertically)
function drawElevation(el) {
  var spans = el.dataset.spans.split(',').map(Number);
  var total = spans.reduce(function (a, b) { return a + b; }, 0);
  var W = 800, x0 = 30, x1 = W - 30, sc = (x1 - x0) / total;
  var deck = 30, ground = 150, hPier = 46, hMid = 14;
  var main = Math.max.apply(null, spans);
  var piers = [], acc = 0;
  for (var i = 0; i < spans.length - 1; i++) { acc += spans[i]; piers.push(x0 + acc * sc); }
  var haunch = 0.45 * main * sc;
  function depth(x) {
    var d = Infinity;
    piers.forEach(function (p) { d = Math.min(d, Math.abs(x - p)); });
    var t = Math.max(0, 1 - d / haunch);
    return hMid + (hPier - hMid) * t * t;
  }
  var soffit = [];
  for (var x = x0; x <= x1 + 0.1; x += 4) soffit.push(x.toFixed(1) + ',' + (deck + depth(x)).toFixed(1));
  var s = '<svg viewBox="0 0 ' + W + ' 185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic elevation">';
  s += '<line x1="0" y1="' + ground + '" x2="' + W + '" y2="' + ground + '" stroke="#9aa5b4" stroke-dasharray="4 4"/>';
  s += '<polygon fill="#1f3864" points="' + x0 + ',' + deck + ' ' + x1 + ',' + deck + ' ' + soffit.reverse().join(' ') + '"/>';
  piers.forEach(function (p) {
    var top = deck + hPier;
    s += '<rect x="' + (p - 6) + '" y="' + top + '" width="12" height="' + (ground - top) + '" fill="#5b6573"/>';
  });
  [x0, x1].forEach(function (a, k) {
    s += '<rect x="' + (k ? a : a - 14) + '" y="' + (deck + hMid) + '" width="14" height="' + (ground - deck - hMid) + '" fill="#9aa5b4"/>';
  });
  acc = 0;
  spans.forEach(function (L) {
    var a = x0 + acc * sc, b = a + L * sc; acc += L;
    var y = 172;
    s += '<line x1="' + a + '" y1="' + (y - 5) + '" x2="' + a + '" y2="' + (y + 5) + '" stroke="#5b6573"/>';
    s += '<line x1="' + b + '" y1="' + (y - 5) + '" x2="' + b + '" y2="' + (y + 5) + '" stroke="#5b6573"/>';
    s += '<line x1="' + a + '" y1="' + y + '" x2="' + b + '" y2="' + y + '" stroke="#5b6573"/>';
    s += '<text x="' + (a + b) / 2 + '" y="' + (y - 5) + '" font-size="14" text-anchor="middle" fill="#1d232b">' + L + ' m</text>';
  });
  s += '</svg>';
  el.innerHTML = s + (el.dataset.cap ? '<div class="cap">' + el.dataset.cap + '</div>' : '');
}
document.querySelectorAll('.elev[data-spans]').forEach(drawElevation);
