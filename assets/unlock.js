// Password gate for encrypted pages. The page body is AES-GCM ciphertext (key from PBKDF2-SHA256);
// it is decrypted in the browser, so the plain text never appears in the published files.
(function () {
  var data = document.getElementById('enc');
  if (!data) return;
  var box = JSON.parse(data.textContent);
  var form = document.getElementById('unlock');
  var err = document.getElementById('unlock-err');
  var b64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); };

  function decrypt(pw) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(box.s), iterations: box.n, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      })
      .then(function (key) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(box.i) }, key, b64(box.c)); })
      .then(function (buf) { return new TextDecoder().decode(buf); });
  }

  function open(pw) {
    return decrypt(pw).then(function (html) {
      sessionStorage.setItem('personal-pw', pw);   // other personal pages open without asking again (this tab only)
      document.querySelector('main').innerHTML = html;
      if (window.drawElevation) document.querySelectorAll('.elev[data-spans]').forEach(window.drawElevation);
      if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
    });
  }

  var saved = sessionStorage.getItem('personal-pw');
  if (saved) open(saved).catch(function () { sessionStorage.removeItem('personal-pw'); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.style.display = 'none';
    var btn = form.querySelector('button');
    btn.disabled = true; btn.style.opacity = .6;   // key derivation takes about a second
    open(form.pw.value).catch(function () {
      err.style.display = 'block'; form.pw.select();
      btn.disabled = false; btn.style.opacity = 1;
    });
  });
})();
