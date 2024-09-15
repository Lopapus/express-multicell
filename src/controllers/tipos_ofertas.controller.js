const Tipos_Ofertas = require('../models').tipos_ofertas;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getTiposOfertas = async (req, res) => {
  try {
    const tipos_ofertas = await Tipos_Ofertas.findAll({});
    if (tipos_ofertas) {
      return res.status(200).json(tipos_ofertas);
    } else {
      return res.status(400).json({ message: 'No se encontró ningun tipo de oferta en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.getTipoOferta = async (req, res) => {
  try {
    const tipos_ofertas = await Tipos_Ofertas.findByPk(req.params.id);

    if (tipos_ofertas) {
      return res.status(200).json(tipos_ofertas);
    } else {
      return res.status(400).json({ message: 'El tipo de oferta que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postTipoOferta = async (req, res) => {
  try {
    const tipos_ofertas = await Tipos_Ofertas.create({
      nombre: req.body.nombre
    });
    return res.status(201).json({ message: `El tipo de oferta ${tipos_ofertas.nombre} se agregó correctamente` });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.putTipoOferta = async (req, res) => {
  try {
    const tipos_ofertas = await Tipos_Ofertas.findByPk(req.body.id);

    if (tipos_ofertas) {
      await tipos_ofertas.update(req.body);
      return res.status(200).json({ message: 'El tipo de oferta se actualizó correctamente' });
    } else {
      return res.status(304).json({ message: 'Ocurrió un error al actualizar el tipo de oferta' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteTipoOferta = async (req, res) => {
  try {
    const tipos_ofertas = await Tipos_Ofertas.findByPk(req.body.id);

    if (tipos_ofertas) {
      await tipos_ofertas.destroy();
      return res.status(200).json({ message: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'El tipo de oferta que desea eliminar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
