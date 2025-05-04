// accessibility.js
document.addEventListener('DOMContentLoaded', function() {
    // Contraste
    const highContrastBtn = document.getElementById('highContrast');
    highContrastBtn.addEventListener('click', function() {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      localStorage.setItem('highContrast', isHighContrast);
      this.setAttribute('aria-pressed', isHighContrast);
    });
    
    // Verificar preferência salva
    if (localStorage.getItem('highContrast') === 'true') {
      document.body.classList.add('high-contrast');
      highContrastBtn.setAttribute('aria-pressed', 'true');
    }
    
    // Aumentar fonte
    const increaseFontBtn = document.getElementById('increaseFont');
    let fontSize = 1;
    increaseFontBtn.addEventListener('click', function() {
      fontSize += 0.1;
      if (fontSize > 1.4) fontSize = 1;
      document.body.style.fontSize = `${fontSize}rem`;
    });
    
    // Ler página
    const readPageBtn = document.getElementById('readPage');
    readPageBtn.addEventListener('click', function() {
      const textToRead = document.body.innerText;
      lerPagina(textToRead);
    });
    
    // Função de síntese de voz
    function lerPagina(texto) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    }
    
    // Ler ao passar o mouse
    document.querySelectorAll('[data-ler]').forEach(el => {
      el.addEventListener('mouseover', () => {
        const texto = el.getAttribute('data-ler');
        lerPagina(texto);
      });
    });
  });