const Marcas = require('../models').marcas;
const controller = {};

controller.getMarcas = async (req, res) => {
  try {
    const marcas = await Marcas.findAll({});
    if (marcas) {
      return res.status(200).json(marcas);
    } else {
      return res.status(400).json({ msg: 'No se encontró ninguna marca en la base de datos' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

controller.getMarca = async (req, res) => {
  try {
    const marcas = await Marcas.findByPk(req.params.id);

    if (marcas) {
      return res.status(200).json(marcas);
    } else {
      return res.status(400).json({ msg: 'La marca que está buscando no existe' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

controller.postMarca = async (req, res) => {
  try {
    const marcas = await Marcas.create({
      nombre: req.body.nombre
    });
    return res.status(201).json(marcas.toJSON());
  } catch (error) {
    res.status(500).json(error?.errors || { msg: 'Server Error' });
  }
};

controller.putMarca = async (req, res) => {
  try {
    const marcas = await Marcas.findByPk(req.body.id);

    if (marcas) {
      await marcas.update(req.body);
      return res.status(200).json({ msg: 'La marca se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ msg: 'Ocurrió un error al actualizar la marca' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

controller.deleteMarca = async (req, res) => {
  try {
    const marcas = await Marcas.findByPk(req.body.id);

    if (marcas) {
      await marcas.destroy();
      return res.status(200).json({ msg: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ msg: 'La marca que desea eliminar no existe' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = controller;
