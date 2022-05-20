const Modelos = require('../models').modelos;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getModelos = async (req, res) => {
  try {
    const modelos = await Modelos.findAll({});
    if (modelos) {
      return res.status(200).json(modelos);
    } else {
      return res.status(400).json({ message: 'No se encontró ningun modelo en la base de datos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

controller.getModelo = async (req, res) => {
  try {
    const modelos = await Modelos.findByPk(req.params.id);

    if (modelos) {
      return res.status(200).json(modelos);
    } else {
      return res.status(400).json({ message: 'El modelo que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postModelo = async (req, res) => {
  try {
    const modelos = await Modelos.create({
      nombre: req.body.nombre
    });
    return res.status(201).json(modelos.toJSON());
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.putModelo = async (req, res) => {
  try {
    const modelos = await Modelos.findByPk(req.body.id);

    if (modelos) {
      await modelos.update(req.body);
      return res.status(200).json({ message: 'El modelo se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ message: 'Ocurrió un error al actualizar el modelo' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteModelo = async (req, res) => {
  try {
    const modelos = await Modelos.findByPk(req.body.id);

    if (modelos) {
      await modelos.destroy();
      return res.status(200).json({ message: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'El modelo que desea eliminar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
