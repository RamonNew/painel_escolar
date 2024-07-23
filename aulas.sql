CREATE DATABASE painel_db;

USE painel_db;

CREATE TABLE aulas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_fim DATETIME NOT NULL,
    turma VARCHAR(255) NOT NULL,
    instrutor VARCHAR(255) NOT NULL,
    unidade_curricular VARCHAR(255) NOT NULL,
    ambiente VARCHAR(255) NOT NULL
);