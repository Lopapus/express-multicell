const Marcas = require('../models').marcas;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getMarcas = async (req, res) => {
  try {
    const marcas = await Marcas.findAll({});
    if (marcas) {
      return res.status(200).json(marcas);
    } else {
      return res.status(400).json({ message: 'No se encontró ninguna marca en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.getMarca = async (req, res) => {
  try {
    const marcas = await Marcas.findByPk(req.params.id);

    if (marcas) {
      return res.status(200).json(marcas);
    } else {
      return res.status(400).json({ message: 'La marca que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postMarca = async (req, res) => {
  try {
    const marcas = await Marcas.create({
      nombre: req.body.nombre
    });
    return res.status(201).json({ message: `La marca ${marcas.nombre} se agregó correctamente` });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.putMarca = async (req, res) => {
  try {
    const marcas = await Marcas.findByPk(req.body.id);

    if (marcas) {
      await marcas.update(req.body);
      return res.status(200).json({ message: 'La marca se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ message: 'Ocurrió un error al actualizar la marca' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteMarca = async (req, res) => {
  try {
    const marcas = await Marcas.findByPk(req.body.id);

    if (marcas) {
      await marcas.destroy();
      return res.status(200).json({ message: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'La marca que desea eliminar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
