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

  document.addEventListener('DOMContentLoaded', function() {
    const categoryItem = document.querySelector('.has-submenu');
    const submenu = document.querySelector('.submenu');
    const categoryLink = document.querySelector('.has-submenu > a');
    
    // Toggle submenu on click (mobile)
    categoryLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) { // Adjust breakpoint as needed
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            submenu.style.opacity = isExpanded ? '0' : '1';
            submenu.style.visibility = isExpanded ? 'hidden' : 'visible';
            submenu.style.transform = isExpanded ? 'translateY(-10px)' : 'translateY(0)';
        }
    });
    
    // Close submenu when clicking outside
    document.addEventListener('click', function(e) {
        if (!categoryItem.contains(e.target)) {
            categoryLink.setAttribute('aria-expanded', 'false');
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
            submenu.style.transform = 'translateY(-10px)';
        }
    });
    
    // Keyboard navigation
    categoryItem.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            categoryLink.setAttribute('aria-expanded', 'false');
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
            submenu.style.transform = 'translateY(-10px)';
            categoryLink.focus();
        }
    });
});
});
