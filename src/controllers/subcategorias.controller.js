const Subcategorias = require('../models').subcategorias;
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
    res.status(500).json({ message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
  }
};

controller.postSubcategoria = async (req, res) => {
  try {
    const subcategorias = await Subcategorias.create({
      nombre: req.body.nombre
    });
    return res.status(201).json(subcategorias.toJSON());
  } catch (error) {
    res.status(500).json(error.errors || { message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = controller;
