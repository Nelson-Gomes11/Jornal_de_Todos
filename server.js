const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: 1,
        title: "Primeiro Post",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "2023-05-01"
    },
    {
        id: 2,
        title: "Segundo Post",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "2023-05-02"
    },
    {
        id: 3,
        title: "Terceiro Post",
        img: "/public/Deficiencia_Visual.png", // Nome do arquivo apenas (deve estar na pasta public)
        content: "When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        date: "2023-05-03"
    }
];

// Rota para obter todos os posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Rota para adicionar um novo post (via Postman)
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString().split('T')[0],
        img: req.body.img || null // Adiciona a imagem se existir no body
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/posts`);
});