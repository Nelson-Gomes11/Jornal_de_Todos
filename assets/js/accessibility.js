document.addEventListener('DOMContentLoaded', function() {
  // ============ CONFIGURAÇÕES DE ACESSIBILIDADE ============

  // 1. Configuração do modo alto contraste
  const highContrastBtn = document.getElementById('highContrast');
  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', function () {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      localStorage.setItem('highContrast', isHighContrast);
    });

    if (localStorage.getItem('highContrast') === 'true') {
      document.body.classList.add('high-contrast');
    }
  }

  // 2. Configuração do aumento de fonte
  const increaseFontBtn = document.getElementById('increaseFont');
  const fontSizes = [1, 1.1, 1.2, 1.3];
  let fontSizeLevel = parseInt(localStorage.getItem('fontSizeLevel')) || 0;

  if (increaseFontBtn) {
    increaseFontBtn.addEventListener('click', function () {
      fontSizeLevel = (fontSizeLevel + 1) % fontSizes.length;
      document.body.style.fontSize = `${fontSizes[fontSizeLevel]}rem`;
      localStorage.setItem('fontSizeLevel', fontSizeLevel);
    });

    if (localStorage.getItem('fontSizeLevel')) {
      document.body.style.fontSize = `${fontSizes[fontSizeLevel]}rem`;
    }
  }

  // ============ CÓDIGO EXISTENTE ============

  // Menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      this.innerHTML = isExpanded ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });
  }

  // Configuração do container de notícias
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    newsContainer.setAttribute('aria-live', 'polite');
    newsContainer.setAttribute('aria-atomic', 'false');
    newsContainer.setAttribute('role', 'region');
    newsContainer.setAttribute('aria-label', 'Últimas notícias');

    // Dados e renderização das notícias
    const newsData = [
      // ... seus dados de notícias ...
    ];

    function renderNews() {
      // ... sua função renderNews existente ...
    }

    renderNews();
  }

  // Menu de categorias
  const categoriasBtn = document.getElementById('categoriasBtn');
  const categoriasMenu = document.getElementById('categoriasMenu');

  if (categoriasBtn && categoriasMenu) {
    categoriasBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isVisible = categoriasMenu.style.display === 'block';
      categoriasMenu.style.display = isVisible ? 'none' : 'block';
      categoriasBtn.setAttribute('aria-expanded', !isVisible);

      categoriasMenu.setAttribute('role', 'menu');
      categoriasMenu.querySelectorAll('a').forEach(item => {
        item.setAttribute('role', 'menuitem');
      });
    });

    document.addEventListener('click', (e) => {
      if (!categoriasBtn.contains(e.target) && !categoriasMenu.contains(e.target)) {
        categoriasMenu.style.display = 'none';
        categoriasBtn.setAttribute('aria-expanded', false);
      }
    });
  }
});
