const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    note: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    a_propos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    site_web: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    top: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    id_specialite: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'artisan',
    timestamps: false,
});

module.exports = Artisan;
