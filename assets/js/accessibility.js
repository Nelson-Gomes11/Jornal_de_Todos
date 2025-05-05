document.addEventListener('DOMContentLoaded', function () {
  // Configuração inicial da síntese de voz
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function() {
      const voices = speechSynthesis.getVoices();
      // Verifica se há vozes em português disponíveis
      const portugueseVoice = voices.find(voice => voice.lang.includes('pt'));
      if (!portugueseVoice) {
        console.warn('Nenhuma voz em português encontrada');
      }
    };
  }

  // Função melhorada para ler texto
  function lerTexto(texto) {
    if ('speechSynthesis' in window) {
      // Cancela qualquer leitura anterior
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = texto;
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Tenta encontrar uma voz em português
      const voices = speechSynthesis.getVoices();
      const portugueseVoice = voices.find(voice => voice.lang.includes('pt'));
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }

  // Adiciona eventos de mouseover para elementos com a classe 'ler-ao-passar'
  function configurarLeituraMouseover() {
    // Seleciona todos os elementos que devem ser lidos ao passar o mouse
    const elementosParaLer = document.querySelectorAll('[data-ler], .ler-ao-passar, h1, h2, h3, h4, h5, h6, p, a, button, li');
    
    elementosParaLer.forEach(elemento => {
      // Remove event listeners antigos para evitar duplicação
      elemento.removeEventListener('mouseenter', handleMouseEnter);
      elemento.removeEventListener('mouseleave', handleMouseLeave);
      
      // Adiciona novos event listeners
      elemento.addEventListener('mouseenter', handleMouseEnter);
      elemento.addEventListener('mouseleave', handleMouseLeave);
      
      // Melhora a acessibilidade para teclado
      elemento.setAttribute('tabindex', '0');
      elemento.addEventListener('focus', handleMouseEnter);
      elemento.addEventListener('blur', handleMouseLeave);
    });
  }

  // Manipulador de evento para mouseenter/focus
  function handleMouseEnter(event) {
    const elemento = event.target;
    let textoParaLer = elemento.getAttribute('data-ler') || 
                      elemento.textContent.trim() || 
                      elemento.getAttribute('aria-label') || 
                      elemento.getAttribute('alt');
    
    // Remove espaços em branco extras e quebras de linha
    if (textoParaLer) {
      textoParaLer = textoParaLer.replace(/\s+/g, ' ').trim();
      lerTexto(textoParaLer);
    }
  }

  // Manipulador de evento para mouseleave/blur
  function handleMouseLeave() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Configura inicialmente
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

  // Função global para permitir leitura manual se necessário
  window.lerTexto = lerTexto;
});