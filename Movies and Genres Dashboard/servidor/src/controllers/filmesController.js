var filmes = require('../model/filmes');
var generos = require('../model/generos');
var sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

/* REGISTAR ---------------------- */
controllers.filmes_create = async (req, res) => {
    // data
    const { id, descricao, titulo, foto, generoId
    } = req.body;
    // create
    const data = await filmes.create({
        id: id,
        descricao: descricao,
        titulo: titulo,
        foto: foto,
        generoId: generoId
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        })
    // return res
    res.status(200).json({
        success: true,
        message: "Registado",
        data: data
    });
}

controllers.filmes_list = async (req, res) => {
    const data = await filmes.findAll({
        include: [generos]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.filmes_detail = async (req, res) => {
    const { id } = req.params;
    const data = await filmes.findAll({
        where: { id: id },
        include: [generos]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.filmes_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { descricao, titulo, foto, generoId } = req.body;
    // Update data
    const data = await filmes.update({

        descricao: descricao,
        titulo: titulo,
        foto: foto,
        generoId: generoId
    },
        {
            where: { id: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Atualizado com sucesso!" });
}

controllers.delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await filmes.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Apagado com sucesso!" });
}

module.exports = controllers;
