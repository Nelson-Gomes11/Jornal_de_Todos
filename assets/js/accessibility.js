document.addEventListener('DOMContentLoaded', function() {
  // ============ CONFIGURAÇÕES DE ACESSIBILIDADE ============
  let leituraTimeout;
  let utteranceAtual = null;

  // Função para ler texto com controle
  function lerTexto(texto) {
    if ('speechSynthesis' in window) {
      // Cancela qualquer leitura anterior
      window.speechSynthesis.cancel();
      
      // Cria nova utterance
      utteranceAtual = new SpeechSynthesisUtterance(texto);
      utteranceAtual.lang = 'pt-BR';
      utteranceAtual.rate = 1.0;
      
      // Configura eventos
      utteranceAtual.onend = function() {
        utteranceAtual = null;
      };
      
      utteranceAtual.onerror = function() {
        utteranceAtual = null;
      };
      
      window.speechSynthesis.speak(utteranceAtual);
    }
  }

  // Função para ler feedback (usada nos botões de acessibilidade)
  function lerFeedback(texto) {
    if ('speechSynthesis' in window) {
      const feedbackUtterance = new SpeechSynthesisUtterance(texto);
      feedbackUtterance.lang = 'pt-BR';
      feedbackUtterance.rate = 1.1;
      window.speechSynthesis.speak(feedbackUtterance);
    }
  }

  // Configura leitura ao passar o mouse
  function configurarLeituraMouseover() {
    const elementosParaLer = document.querySelectorAll('[data-ler], .ler-ao-passar, h1, h2, h3, h4, h5, h6, p, a, button, li');
    
    elementosParaLer.forEach(elemento => {
      // Remove listeners antigos para evitar duplicação
      elemento.removeEventListener('mouseenter', handleMouseEnter);
      elemento.removeEventListener('mouseleave', handleMouseLeave);
      elemento.removeEventListener('focus', handleMouseEnter);
      elemento.removeEventListener('blur', handleMouseLeave);
      
      // Adiciona novos listeners
      elemento.addEventListener('mouseenter', handleMouseEnter);
      elemento.addEventListener('mouseleave', handleMouseLeave);
      elemento.addEventListener('focus', handleMouseEnter);
      elemento.addEventListener('blur', handleMouseLeave);
      
      // Melhora acessibilidade para teclado
      if (!elemento.hasAttribute('tabindex')) {
        elemento.setAttribute('tabindex', '0');
      }
    });
  }

  // Manipulador de mouseenter/focus
  function handleMouseEnter(event) {
    clearTimeout(leituraTimeout);
    const elemento = event.target;
    
    leituraTimeout = setTimeout(() => {
      const texto = elemento.getAttribute('data-ler') || 
                   elemento.textContent.trim() || 
                   elemento.getAttribute('aria-label') || 
                   elemento.getAttribute('alt');
      
      if (texto) {
        lerTexto(texto.replace(/\s+/g, ' ').trim());
      }
    }, 300);
  }

  // Manipulador de mouseleave/blur
  function handleMouseLeave() {
    clearTimeout(leituraTimeout);
    if (window.speechSynthesis && utteranceAtual) {
      window.speechSynthesis.cancel();
    }
  }

  // 1. Configuração do modo alto contraste
  const highContrastBtn = document.getElementById('highContrast');
  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', function() {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      localStorage.setItem('highContrast', isHighContrast);
      lerFeedback(isHighContrast ? 'Modo escuro ativado' : 'Modo escuro desativado');
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
    increaseFontBtn.addEventListener('click', function() {
      fontSizeLevel = (fontSizeLevel + 1) % fontSizes.length;
      document.body.style.fontSize = `${fontSizes[fontSizeLevel]}rem`;
      localStorage.setItem('fontSizeLevel', fontSizeLevel);
      lerFeedback(`Tamanho da fonte ajustado para ${Math.round(fontSizes[fontSizeLevel] * 100)}%`);
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
    menuToggle.addEventListener('click', function() {
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

  // Configura leitura ao passar o mouse após carregamento
  configurarLeituraMouseover();

  // Observa mudanças no DOM para aplicar em elementos dinâmicos
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        configurarLeituraMouseover();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});