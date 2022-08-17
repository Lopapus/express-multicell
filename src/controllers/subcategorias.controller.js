const Subcategorias = require('../models').subcategorias;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategorias.findAll({});
    if (subcategorias) {
      return res.status(200).json(subcategorias);
    } else {
      return res.status(400).json({ message: 'No se encontró ninguna subcategoria en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.getSubcategoria = async (req, res) => {
  try {
    const subcategorias = await Subcategorias.findByPk(req.params.id);

    if (subcategorias) {
      return res.status(200).json(subcategorias);
    } else {
      return res.status(400).json({ message: 'La subcategoria que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postSubcategoria = async (req, res) => {
  try {
    const subcategorias = await Subcategorias.create({
      nombre: req.body.nombre
    });
    return res.status(201).json({ message: `La subcategoría ${subcategorias.nombre} se agregó correctamente` });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.putSubcategoria = async (req, res) => {
  try {
    const subcategorias = await Subcategorias.findByPk(req.body.id);

    if (subcategorias) {
      await subcategorias.update(req.body);
      return res.status(200).json({ message: 'La subcategoria se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ message: 'Ocurrió un error al actualizar la subcategoria' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteSubcategoria = async (req, res) => {
  try {
    const subcategorias = await Subcategorias.findByPk(req.body.id);

    if (subcategorias) {
      await subcategorias.destroy();
      return res.status(200).json({ message: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'La subcategoria que desea eliminar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
