// script.js

// Seleciona os botões
const botaoEntrar = document.querySelector('.botao');
const botaoCadastrar = document.querySelector('.botao0');

// Adiciona os eventos de clique
botaoEntrar.addEventListener('click', function (e) {
    e.preventDefault(); // previne o comportamento padrão do botão
    window.location.href = 'telaentrar.html';
});

botaoCadastrar.addEventListener('click', function (e) {
    e.preventDefault(); // previne o envio do formulário
    window.location.href = 'telacadastrr.html'; // você pode trocar o nome do arquivo se for outro
});
