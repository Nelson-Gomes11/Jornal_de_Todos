document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    this.innerHTML = isExpanded ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
  });
  
  // Container de notícias
  const newsContainer = document.getElementById('news-container');
  
  // Dados das notícias (aumentado para 6)
  const newsData = [
    {
      title: "O que é Acessibilidade?",
      excerpt: "Promover acessibilidade é dar às pessoas com deficiência condições de uso dos espaços urbanos, dos serviços de transporte, dos meios de comunicação e informação, do sistema de educação, eliminando barreiras e garantindo a inclusão social daqueles que apresentam alguma condição de deficiência.",
      date: "30/04/2025",
      category: "Geral",
      image: "./assets/images/Deficiencia_Visual.png",
    },
    {
      title: "MPDFT promove debate sobre estratégias de inclusão nas escolas",
      excerpt: "Evento reuniu profissionais da área de educação com o objetivo de debater a implementação de práticas inclusivas nas escolas",
      date: "01/05/2025",
      category: "Cultura",
      image: "./assets/images/cultura.jpg"
    },
    {
      title: "Tecnologia e Acessibilidade",
      excerpt: "Os programadores Lucas Gabriel e Nelson Gomes, desenvolvem um site para deficientes visuais.",
      date: "02/05/2025",
      category: "Tecnologia",
      image: "./assets/images/tecnologia.jpg"
    },
    {
      title: "Novo Projeto Social",
      excerpt: "Iniciativa promove inclusão digital em comunidades carentes da região.",
      date: "03/05/2025",
      category: "Social",
      image: "./assets/images/social.jpg"
    },
    {
      title: "Evento Cultural Inclusivo",
      excerpt: "Festival de arte contemporânea terá recursos de acessibilidade para todos os públicos.",
      date: "04/05/2025",
      category: "Cultura",
      image: "./assets/images/evento-cultural.jpg"
    },
    {
      title: "Avancos na Educação Especial",
      excerpt: "Novas tecnologias assistivas estão revolucionando o aprendizado para estudantes com deficiência.",
      date: "05/05/2025",
      category: "Educação",
      image: "./assets/images/images.jpeg"
    }
  ];
  
  // Função para renderizar notícias (com limite opcional)
  function renderNews(container, newsArray, limit = null) {
    const newsToRender = limit ? newsArray.slice(0, limit) : newsArray;
    
    container.innerHTML = newsToRender.map(news => `
      <article class="news-card">
        <div class="card-image">
          <img src="${news.image}" alt="${news.title}" loading="lazy">
        </div>
        <div class="card-content">
          <span class="card-category">${news.category}</span>
          <h3 class="card-title">${news.title}</h3>
          <p class="card-excerpt">${news.excerpt}</p>
          <div class="card-meta">
            <span>${news.date}</span>
         
          </div>
        </div>
      </article>
    `).join('');
  }
  
  // Renderiza apenas 4 notícias na home
  if (newsContainer) {
    renderNews(newsContainer, newsData, 4);
  }
  
  // Configura o link "Ver todas"
  const seeAllLink = document.querySelector('.see-all');
  if (seeAllLink) {
    seeAllLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Armazena os dados das notícias para usar na outra página
      localStorage.setItem('newsData', JSON.stringify(newsData));
      window.location.href = 'assets/html/todas-noticias.html';
    });
  }


});