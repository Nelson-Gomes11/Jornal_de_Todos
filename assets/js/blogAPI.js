document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000/posts'; // Altere para sua API real
    const container = document.querySelector('.container');

    // Função para buscar posts da API
    async function fetchPosts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar posts');
            }
            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('Erro:', error);
            container.innerHTML = '<p>Não foi possível carregar os posts. Tente novamente mais tarde.</p>';
        }
    }

    // Função para exibir os posts no HTML
    function displayPosts(posts) {
        container.innerHTML = '';
        
        posts.forEach((post, index) => {
            const card = document.createElement('div');
            card.className = `card ${index === 0 ? 'blue' : ''}`;

            // Texto que será lido
            const textoParaLer = `${post.title || 'Sem título'}. ${post.content || 'Conteúdo não disponível'}. Postado em: ${new Date(post.date || Date.now()).toLocaleDateString()}`;

            // Adiciona atributo data-ler para leitura
            card.setAttribute('data-ler', textoParaLer);

            card.innerHTML = `
                <h2>${post.title || 'Sem título'}</h2>
                <p>${post.content || 'Conteúdo não disponível'}</p>
                <small>Postado em: ${new Date(post.date || Date.now()).toLocaleDateString()}</small>
            `;

            // Adiciona evento de leitura
            card.addEventListener('mouseover', () => {
                const texto = card.getAttribute('data-ler');
                lerPagina(texto); // Certifique-se que a função lerPagina esteja disponível no escopo
            });

            container.appendChild(card);
        });
    }

    // Chama a função para carregar os posts
    fetchPosts();
});
