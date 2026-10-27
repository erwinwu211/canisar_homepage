(() => {
  'use strict';
  const languages = new Set(['ja', 'en']);
  const languageButtons = document.querySelectorAll('[data-language]');
  const isContactPage = document.body.dataset.page === 'contact';
  const metadata = {
    ja: {
      title: 'CanisAR — 人と、デジタルのいのちをつなぐ。',
      description: 'CanisARは、人とペットのインタラクションと動作生成の研究を通じて、デジタルのいのちと心が通う未来を目指します。',
      contactTitle: '会社概要・チーム — CanisAR',
      contactDescription: 'CanisARのチームと、共同研究・技術開発・パートナーシップについて。',
      navigation: 'メインナビゲーション', scroll: 'ビジョンへ移動', home: 'CanisAR ホーム',
    },
    en: {
      title: 'CanisAR — Virtual companions. Real connections.',
      description: 'CanisAR explores human–pet interaction and motion generation to build a future with digital companions that feel closer to life.',
      contactTitle: 'About Us — CanisAR',
      contactDescription: 'Meet the CanisAR team and explore research, technology development, and partnership opportunities.',
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
    document.querySelectorAll('[data-page-link]').forEach((link) => {
      const url = new URL(link.getAttribute('href'), window.location.href);
      url.searchParams.set('lang', language);
      link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
    });
    const page = document.body.dataset.page || 'home';
    const titles = {home: language === 'ja' ? 'CanisAR — 人と、動きと、可能性をつなぐ。' : 'CanisAR — People. Motion. New possibilities.', pet:'Pet Interaction — CanisAR', sports:'Sports Interaction — CanisAR', contact:metadata[language].contactTitle};
    document.title = titles[page];
    const descriptions = {home: language === 'ja' ? 'ペットとスポーツのインタラクションを通じた技術製品の研究開発。' : 'Research and technology development in pet and sports interaction.', pet: language === 'ja' ? '人とペットのインタラクション、InterPet4D、バーチャルペットの研究開発。' : 'Human–pet interaction, InterPet4D, and virtual companion research.', sports: language === 'ja' ? 'スキー、ゴルフ、足圧センシングと技能支援の研究。' : 'Skiing, golf, foot-pressure sensing, and skill acquisition research.',contact:metadata[language].contactDescription};
    document.querySelector('meta[name="description"]').content = descriptions[page];
    document.querySelector('.main-nav').setAttribute('aria-label', metadata[language].navigation);
    document.querySelector('.hero-baseline a')?.setAttribute('aria-label', metadata[language].scroll);
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

  const menu = document.querySelector('.research-menu');
  document.addEventListener('click', (event) => { if (menu && !menu.contains(event.target)) menu.open = false; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu?.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  document.addEventListener('focusin', (event) => { if (menu && !menu.contains(event.target)) menu.open = false; });
  const gaussianSection = document.querySelector('.gaussian-showcase');
  if (gaussianSection) {
    const videos = [...gaussianSection.querySelectorAll('video')];
    const toggle = gaussianSection.querySelector('.motion-toggle');
    const label = toggle.querySelector('[data-motion-label]');
    const icon = toggle.querySelector('.motion-toggle-icon');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reducedMotion.matches;
    let visible = false;

    function updateBackground() {
      const shouldPlay = visible && !paused && !document.hidden;
      videos.forEach((video) => {
        if (shouldPlay) {
          video.play().catch(() => {
            // Keep the posters usable if the browser declines automatic playback.
            if (visible && !paused && !document.hidden) {
              paused = true;
              updateBackground();
            }
          });
        } else {
          video.pause();
        }
      });
      label.dataset.ja = paused ? '背景を再生' : '背景を一時停止';
      label.dataset.en = paused ? 'Play background' : 'Pause background';
      label.textContent = label.dataset[document.documentElement.lang];
      icon.textContent = paused ? '▶' : 'Ⅱ';
    }

    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      paused = !paused;
      updateBackground();
    });
    reducedMotion.addEventListener('change', (event) => {
      paused = event.matches;
      updateBackground();
    });
    document.addEventListener('visibilitychange', updateBackground);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateBackground();
      }, { threshold:0 });
      observer.observe(gaussianSection);
    } else {
      visible = true;
    }
    updateBackground();
  }

  const navigationLinks = [...document.querySelectorAll('.main-nav a')].filter((link) => link.getAttribute('href').startsWith('#'));
  if ('IntersectionObserver' in window && navigationLinks.length) {
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
    document.querySelectorAll('#vision, #research').forEach((section) => observer.observe(section));
  }
})();
