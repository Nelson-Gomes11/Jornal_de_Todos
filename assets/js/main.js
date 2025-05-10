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
      title: "Primeiro Post",
      excerpt: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      date: "30/04/2023",
      category: "Geral",
      image: "/assets/images/Deficiencia_Visual.png"
    },
    {
      title: "Segundo Post",
      excerpt: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "01/05/2023",
      category: "Cultura",
      image: "/assets/images/cultura.jpg"
    },
    {
      title: "Terceiro Post",
      excerpt: "When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      date: "02/05/2023",
      category: "Tecnologia",
      image: "/assets/images/tecnologia.jpg"
    },
    {
      title: "Novo Projeto Social",
      excerpt: "Iniciativa promove inclusão digital em comunidades carentes da região.",
      date: "03/05/2023",
      category: "Social",
      image: "/assets/images/social.jpg"
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
  
  // Categorias menu
  const categoriasBtn = document.getElementById('categoriasBtn');
  const categoriasMenu = document.getElementById('categoriasMenu');

  categoriasBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isVisible = categoriasMenu.style.display === 'block';
    categoriasMenu.style.display = isVisible ? 'none' : 'block';
    categoriasBtn.setAttribute('aria-expanded', !isVisible);
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!categoriasBtn.contains(e.target) && !categoriasMenu.contains(e.target)) {
      categoriasMenu.style.display = 'none';
      categoriasBtn.setAttribute('aria-expanded', false);
    }
  });
});
