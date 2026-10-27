(() => {
  'use strict';
  const languages = new Set(['ja', 'en']);
  const languageButtons = document.querySelectorAll('[data-language]');
  const metadata = {
    ja: {
      title: 'CanisAR — 人と、デジタルのいのちをつなぐ。',
      description: 'CanisARは、人とペットのインタラクションと動作生成の研究を通じて、デジタルのいのちと心が通う未来を目指します。',
      navigation: 'メインナビゲーション', scroll: 'ビジョンへ移動', home: 'CanisAR ホーム',
    },
    en: {
      title: 'CanisAR — Virtual companions. Real connections.',
      description: 'CanisAR explores human–pet interaction and motion generation to build a future with digital companions that feel closer to life.',
      navigation: 'Main navigation', scroll: 'Scroll to Vision', home: 'CanisAR home',
    },
  };
  function setLanguage(language, persist = false) {
    if (!languages.has(language)) return;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-ja][data-en]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-alt-ja]').forEach((element) => {
      element.alt = element.getAttribute(`data-alt-${language}`);
    });
    document.querySelectorAll('[data-label-ja]').forEach((element) => {
      element.setAttribute('aria-label', element.getAttribute(`data-label-${language}`));
    });
    languageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.title = metadata[language].title;
    document.querySelector('meta[name="description"]').content = metadata[language].description;
    document.querySelector('.main-nav').setAttribute('aria-label', metadata[language].navigation);
    document.querySelector('.hero-baseline a').setAttribute('aria-label', metadata[language].scroll);
    document.querySelector('.site-header .brand').setAttribute('aria-label', metadata[language].home);
    if (persist) {
      try { localStorage.setItem('canisar-language', language); } catch { /* Storage may be unavailable. */ }
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.replaceState(null, '', url);
    }
  }
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('canisar-language'); } catch { /* Japanese remains the default. */ }
  setLanguage(languages.has(requestedLanguage) ? requestedLanguage : languages.has(savedLanguage) ? savedLanguage : 'ja');
  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language, true));
  });
  const navigationLinks = [...document.querySelectorAll('.main-nav a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = navigationLinks.find((item) => item.hash === `#${entry.target.id}`);
        if (entry.isIntersecting) {
          navigationLinks.forEach((item) => item.removeAttribute('aria-current'));
          link?.setAttribute('aria-current', 'location');
        } else if (link?.hasAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('#vision, #research, #contact').forEach((section) => observer.observe(section));
  }
})();
