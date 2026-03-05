-- Création de la base de données trouve_ton_artisan
-- Script de création des tables

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories d'artisanat
CREATE TABLE categorie (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Table des spécialités (rattachées à une catégorie)
CREATE TABLE specialite (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    id_categorie INT UNSIGNED NOT NULL,
    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (id_categorie) REFERENCES categorie(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table des artisans
CREATE TABLE artisan (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    email VARCHAR(150) NOT NULL,
    site_web VARCHAR(255) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    top TINYINT(1) NOT NULL DEFAULT 0,
    id_specialite INT UNSIGNED NOT NULL,
    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (id_specialite) REFERENCES specialite(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;
