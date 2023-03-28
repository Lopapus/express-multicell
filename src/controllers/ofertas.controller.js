const {
  productos: Productos,
  ofertas: Ofertas,
  detalle_ofertas: DetalleOfertas
} = require('../models');
const { sequelize } = require('../connections/sequelize');
const catchHandler = require('../helpers/catchHandler');
const ProductosSchema = require('../schemas/productos.schema');
const controller = {};

controller.getOfertas = async (req, res) => {
  try {
    const ofertas = await Ofertas.findAll({
      attributes: ['id', 'descripcion', 'precio_oferta'],
      include: [
        {
          model: Productos,
          as: 'productos',
          ...ProductosSchema
        }
      ]
    });
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
    const oferta = await Ofertas.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'descripcion', 'precio_oferta'],
      include: [
        {
          model: Productos,
          as: 'productos',
          ...ProductosSchema
        }
      ]
    });
    if (oferta) {
      return res.status(200).json(oferta);
    } else {
      return res.status(400).json({ message: 'La oferta que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postOferta = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const oferta = await Ofertas.create({
      precio_oferta: req.body.precio_oferta,
      descripcion: req.body.descripcion
    }, { transaction });

    if (req.body?.detalle_ofertas.length > 0) {
      for (const detalle_oferta of req.body.detalle_ofertas) {
        await DetalleOfertas.create({
          id_oferta: oferta.dataValues.id,
          id_producto: detalle_oferta.id_producto,
          descuento: detalle_oferta.descuento
        });
      }
    }

    transaction.commit();
    return res.status(201).json({ message: 'La oferta se creó correctamente' });
  } catch (error) {
    await transaction.rollback();
    console.log(error);

    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
