/* QuaintAI — language switch. No dependencies, no build step. */
(function () {
  'use strict';

  var STORAGE_KEY = 'quaintai.lang';

  var LOCALE = {
    zh: { htmlLang: 'zh-Hans', ogLocale: 'zh_CN' },
    en: { htmlLang: 'en', ogLocale: 'en_US' }
  };

  var root = document.documentElement;

  var buttons = Array.prototype.slice.call(
    document.querySelectorAll('[data-set-lang]')
  );

  function setText(el, value) {
    if (el && value) { el.setAttribute('content', value); }
  }

  /* Per-page title and description live on <html data-title-zh> etc. */
  function pageMeta(lang, key) {
    return root.getAttribute('data-' + key + '-' + lang);
  }

  function apply(lang, persist) {
    if (lang !== 'zh' && lang !== 'en') { lang = 'en'; }
    var m = LOCALE[lang];
    var title = pageMeta(lang, 'title');
    var description = pageMeta(lang, 'desc');

    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', m.htmlLang);

    if (title) { document.title = title; }
    setText(document.getElementById('meta-description'), description);
    setText(document.getElementById('og-title'), title);
    setText(document.getElementById('og-description'), description);
    setText(document.getElementById('og-locale'), m.ogLocale);

    buttons.forEach(function (btn) {
      btn.setAttribute(
        'aria-pressed',
        btn.getAttribute('data-set-lang') === lang ? 'true' : 'false'
      );
    });

    if (persist) {
      try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked */ }
    }
  }

  function stored() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-set-lang'), true);
    });
  });

  var saved = stored();
  apply(saved === 'en' || saved === 'zh' ? saved : 'en', false);
})();
