const Categorias = require('../models').categorias;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.findAll({});
    if (categorias) {
      return res.status(200).json(categorias);
    } else {
      return res.status(400).json({ message: 'No se encontró ninguna categoria en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.getCategoria = async (req, res) => {
  try {
    const categorias = await Categorias.findByPk(req.params.id);

    if (categorias) {
      return res.status(200).json(categorias);
    } else {
      return res.status(400).json({ message: 'La categoria que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postCategoria = async (req, res) => {
  try {
    const categorias = await Categorias.create({
      nombre: req.body.nombre
    });
    return res.status(200).json({ message: `La categoría ${categorias.nombre} se agregó correctamente` });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
  /* } catch (error) {
    res.status(500).json(error.errors || { message: 'Server Error' });
  } */
};

controller.putCategoria = async (req, res) => {
  try {
    const categoria = await Categorias.findByPk(req.body.id);

    if (categoria) {
      await categoria.update(req.body);
      return res.status(200).json({ message: 'La categoria se ha actualizado correctamente' });
    } else {
      return res.status(400).json({ message: 'La categoria que desea modificar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteCategoria = async (req, res) => {
  try {
    const categoria = await Categorias.findByPk(req.body.id);

    if (categoria) {
      await categoria.destroy();
      return res.status(200).json({ message: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'La categoria que desea eliminar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
