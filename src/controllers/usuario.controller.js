// const Sequelize     = require('sequelize');
const usuario = require('../models').usuario;

const controller = {};

controller.create = (req, res) => {
  return usuario
    .create({
      username: req.body.username,
      status: req.body.status
    })
    .then(usuario => res.status(200).send(usuario.toJSON()))
    .catch(error => res.status(400).send(error));
};

controller.update = (req, res) => {
  return usuario
    .findByPk(req.body.id)
    .then(usuario => {
      usuario.update({
        username: req.body.username
      });
      res.status(200).send(usuario.toJSON());
    })
    .catch(error => res.status(400).send(error));
};

controller.delete = (req, res) => {
  return usuario
    .findByPk(req.params.id)
    .then(usuario =>
      usuario.destroy()
        .then(_ => res.status(200).send('usuario eliminado'))
        .catch(error => res.status(400).send(error))
    )
    .catch(error => res.status(400).send(error));
};

controller.list = (_, res) => {
  return usuario
    .findAll({})
    .then(usuario => res.status(200).send(usuario.toJSON()))
    .catch(error => res.status(400).send(error));
};

controller.find = (req, res) => {
  return usuario
    .findAll({
      where: {
        username: req.params.username
      }
    })
    .then(usuario => res.status(200).send(usuario.toJSON()))
    .catch(error => res.status(400).send(error));
};

module.exports = controller;
