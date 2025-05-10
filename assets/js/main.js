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
  
  // Simular carregamento de notícias
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
    }
  ];
  
  function renderNews() {
    newsContainer.innerHTML = '';
    
    newsContainer.innerHTML += newsData.map(news => `
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
            <a href="#" class="read-more">Ler mais</a>
          </div>
        </div>
      </article>
    `).join('');
  }
  
  renderNews();
  



  
});
