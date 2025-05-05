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
  
  // Configuração do container de notícias para acessibilidade
  const newsContainer = document.getElementById('news-container');
  newsContainer.setAttribute('aria-live', 'polite');
  newsContainer.setAttribute('aria-atomic', 'false');
  newsContainer.setAttribute('role', 'region');
  newsContainer.setAttribute('aria-label', 'Últimas notícias');
  
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
    const statusEl = document.createElement('div');
    statusEl.className = 'sr-only';
    statusEl.setAttribute('aria-live', 'polite');
    statusEl.setAttribute('aria-atomic', 'true');
    statusEl.textContent = `Carregadas ${newsData.length} notícias`;
    
    newsContainer.innerHTML = '';
    newsContainer.appendChild(statusEl);
    
    newsContainer.innerHTML += newsData.map(news => `
      <article class="news-card" role="article" aria-labelledby="news-${newsData.indexOf(news)}">
        <div class="card-image" role="img" aria-label="Imagem ilustrativa para ${news.title}">
          <img src="${news.image}" alt="${news.title}" loading="lazy">
        </div>
        <div class="card-content">
          <span class="card-category" aria-label="Categoria: ${news.category}">${news.category}</span>
          <h3 class="card-title" id="news-${newsData.indexOf(news)}">${news.title}</h3>
          <p class="card-excerpt">${news.excerpt}</p>
          <div class="card-meta">
            <span aria-label="Postado em ${news.date}">${news.date}</span>
            <a href="#" class="read-more" aria-label="Ler mais sobre ${news.title}">Ler mais</a>
          </div>
        </div>
      </article>
    `).join('');
    
    // Anuncia para leitores de tela que o conteúdo foi carregado
    setTimeout(() => {
      statusEl.textContent = `Conteúdo de notícias carregado com ${newsData.length} itens`;
    }, 100);
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
    
    // Adiciona acessibilidade ao menu de categorias
    categoriasMenu.setAttribute('role', 'menu');
    categoriasMenu.querySelectorAll('a').forEach(item => {
      item.setAttribute('role', 'menuitem');
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!categoriasBtn.contains(e.target) && !categoriasMenu.contains(e.target)) {
      categoriasMenu.style.display = 'none';
      categoriasBtn.setAttribute('aria-expanded', false);
    }
  });
});