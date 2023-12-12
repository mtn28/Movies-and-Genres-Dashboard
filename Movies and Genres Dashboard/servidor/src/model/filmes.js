var Sequelize = require('sequelize');
var sequelize = require('./database');
// importa o modelo – chave forasteira roleID
var generos = require('./generos');
var filmes = sequelize.define('filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: Sequelize.STRING,
    titulo: Sequelize.STRING,
    foto: Sequelize.STRING,
    generoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        referencess: {
            model: generos,
            key: 'id'
        }
    }
},
    {
        timestamps: false,
    });

filmes.belongsTo(generos);
generos.hasMany(filmes);
module.exports = filmes

