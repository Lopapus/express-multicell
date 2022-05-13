const Modelos = require('../models').modelos;
const controller = {};

controller.getModelos = async (req, res) => {
  try {
    const modelos = await Modelos.findAll({});
    if (modelos) {
      return res.status(200).json(modelos);
    } else {
      return res.status(400).json({ msg: 'No se encontró ningun modelo en la base de datos' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

controller.getModelo = async (req, res) => {
  try {
    const modelos = await Modelos.findByPk(req.params.id);

    if (modelos) {
      return res.status(200).json(modelos);
    } else {
      return res.status(400).json({ msg: 'El modelo que está buscando no existe' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

controller.postModelo = async (req, res) => {
  try {
    const modelos = await Modelos.create({
      nombre: req.body.nombre
    });
    return res.status(201).json(modelos.toJSON());
  } catch (error) {
    res.status(500).json(error.errors || { msg: 'Server Error' });
  }
};

controller.putModelo = async (req, res) => {
  try {
    const modelos = await Modelos.findByPk(req.body.id);

    if (modelos) {
      await modelos.update(req.body);
      return res.status(200).json({ msg: 'El modelo se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ msg: 'Ocurrió un error al actualizar el modelo' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

controller.deleteModelo = async (req, res) => {
  try {
    const modelos = await Modelos.findByPk(req.body.id);

    if (modelos) {
      await modelos.destroy();
      return res.status(200).json({ msg: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ msg: 'El modelo que desea eliminar no existe' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = controller;
