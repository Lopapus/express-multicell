const Ofertas = require('../models').ofertas;
const Detalles_ofertas = require('../models').detalles_ofertas;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getOfertas = async (req, res) => {
  try {
    const ofertas = await Ofertas.findAll({});
    if (ofertas) {
      return res.status(200).json(ofertas);
    } else {
      return res.status(400).json({ message: 'No se encontró ninguna oferta en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.getOferta = async (req, res) => {
  try {
    const ofertas = await Ofertas.findByPk(req.params.id);

    if (ofertas) {
      return res.status(200).json(ofertas);
    } else {
      return res.status(400).json({ message: 'La oferta que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postOferta = async (req, res) => {
  try {
    const { oferta } = req.body;
    const { precio_oferta, descripcion } = oferta;
    const { productos } = req.body;

    const ofertas = await Ofertas.create({
      precio_oferta,
      descripcion
    });

    productos.map(async (element) => {
      await Detalles_ofertas.create({
        id_producto: element.id_producto,
        descuento: element.descuento,
        id_oferta: ofertas.id
      });
    });

    return res.status(201).json({ message: 'La oferta fue creada correctamente' });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.putOferta = async (req, res) => {
  try {
    const ofertas = await Ofertas.findByPk(req.body.id);

    if (ofertas) {
      await ofertas.update(req.body);
      return res.status(200).json({ message: 'La oferta se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ message: 'Ocurrió un error al actualizar la marca' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteOferta = async (req, res) => {
  try {
    const ofertas = await Ofertas.findByPk(req.body.id);

    if (ofertas) {
      await ofertas.destroy();
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
