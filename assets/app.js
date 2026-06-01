(function () {
  const key = 'reader-lang';
  function setLang(lang) {
    const next = lang === 'en' ? 'en' : 'zh';
    document.documentElement.dataset.lang = next;
    try { localStorage.setItem(key, next); } catch (error) {}
    document.querySelectorAll('[data-set-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.dataset.setLang === next ? 'true' : 'false');
    });
  }
  let initial = 'zh';
  try { initial = localStorage.getItem(key) || initial; } catch (error) {}
  setLang(initial);

  document.addEventListener('click', function (event) {
    const langButton = event.target.closest('[data-set-lang]');
    if (langButton) {
      setLang(langButton.dataset.setLang);
      return;
    }
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({behavior: 'smooth'}); }
  });
})();
