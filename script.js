document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('btn-theme-toggle');
  let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16;

  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);
  htmlEl.style.setProperty('--font-scale', `${currentFontSize}px`);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeButtonText(nextTheme);
    });
  }

  function updateThemeButtonText(theme) {
    if (themeBtn) {
      themeBtn.textContent = theme === 'light' ? 'Modo Escuro' : 'Modo Claro';
    }
  }

  const updateFont = (newSize) => {
    currentFontSize = Math.min(22, Math.max(13, newSize));
    htmlEl.style.setProperty('--font-scale', `${currentFontSize}px`);
    localStorage.setItem('fontSize', currentFontSize);
  };

  document.getElementById('btn-font-inc')?.addEventListener('click', () => updateFont(currentFontSize + 2));
  document.getElementById('btn-font-dec')?.addEventListener('click', () => updateFont(currentFontSize - 2));
  document.getElementById('btn-font-reset')?.addEventListener('click', () => updateFont(16));

  const slides = document.querySelectorAll('.carousel-slide');
  let slideIndex = 0;

  function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
  }

  document.getElementById('next-slide')?.addEventListener('click', () => showSlide(slideIndex + 1));
  document.getElementById('prev-slide')?.addEventListener('click', () => showSlide(slideIndex - 1));

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(`tab-${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('#filter-list .info-card');
      cards.forEach(card => {
        const keywords = (card.dataset.search + ' ' + card.textContent).toLowerCase();
        card.style.display = keywords.includes(term) ? 'block' : 'none';
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      feedback.textContent = 'Mensagem provisória';
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('login-feedback');
      const perfil = document.getElementById('perfil').value;
      feedback.textContent = `[Em construção] Autenticação para perfil "${perfil}" aguardando integração com o back-end.`;
    });
  }
});