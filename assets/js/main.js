// main.js
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
    
    // Simular carregamento de notícias
    const newsContainer = document.getElementById('news-container');
    const newsData = [
      {
        title: "Primeiro Post",
        excerpt: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
        date: "30/04/2023",
        category: "Geral",
        image: "https://source.unsplash.com/random/600x400/?news,1"
      },
      {
        title: "Segundo Post",
        excerpt: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "01/05/2023",
        category: "Cultura",
        image: "https://source.unsplash.com/random/600x400/?news,2"
      },
      {
        title: "Terceiro Post",
        excerpt: "When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        date: "02/05/2023",
        category: "Tecnologia",
        image: "https://source.unsplash.com/random/600x400/?news,3"
      },
      {
        title: "Novo Projeto Social",
        excerpt: "Iniciativa promove inclusão digital em comunidades carentes da região.",
        date: "03/05/2023",
        category: "Social",
        image: "https://source.unsplash.com/random/600x400/?community"
      }
    ];
    
    function renderNews() {
      newsContainer.innerHTML = newsData.map(news => `
        <article class="news-card" aria-labelledby="news-${newsData.indexOf(news)}">
          <div class="card-image">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
          </div>
          <div class="card-content">
            <span class="card-category">${news.category}</span>
            <h3 class="card-title" id="news-${newsData.indexOf(news)}">${news.title}</h3>
            <p class="card-excerpt">${news.excerpt}</p>
            <div class="card-meta">
              <span>${news.date}</span>
              <a href="#" class="read-more" aria-label="Ler mais sobre ${news.title}">Ler mais</a>
            </div>
          </div>
        </article>
      `).join('');
    }
    
    renderNews();
  });