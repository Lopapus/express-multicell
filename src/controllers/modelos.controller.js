const Modelos = require('../models').modelos;
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
    res.status(500).json({ message: 'Server Error' });
  }
};

controller.postModelo = async (req, res) => {
  try {
    const modelos = await Modelos.create({
      nombre: req.body.nombre
    });
    return res.status(201).json(modelos.toJSON());
  } catch (error) {
    res.status(500).json(error.errors || { message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = controller;
