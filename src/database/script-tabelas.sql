CREATE DATABASE projetoindividual;
USE projetoindividual;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resposta_quiz (
    id_resposta INT PRIMARY KEY AUTO_INCREMENT,
    pergunta VARCHAR(255) NOT NULL,
    resposta_usuario VARCHAR(255) NOT NULL,
    resposta_correta VARCHAR(255) NOT NULL,
    pontuacao INT DEFAULT 0
);

CREATE TABLE usuario_resposta (
    id_usuario INT,
    id_resposta INT,
    dt_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_resposta),
    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_resposta)
        REFERENCES resposta_quiz(id_resposta)
);

CREATE TABLE elenco (
    id_jogador INT PRIMARY KEY AUTO_INCREMENT,
    nome_jogador VARCHAR(100) NOT NULL,
    posicao VARCHAR(50),
    numero_camisa INT,
    nacionalidade VARCHAR(50)
    );