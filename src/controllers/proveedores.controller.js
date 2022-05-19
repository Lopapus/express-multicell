const Proveedor = require('../models').proveedores;
// const Producto = require('../models').productos;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.createProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.create({
      nombre: req.body.nombre,
      cuit: req.body.cuit,
      lugar: req.body.lugar,
      telefono: req.body.telefono,
      correo: req.body.correo,
      inscripto: req.body.inscripto
    });
    return res.status(201).json(proveedor.toJSON());
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.updateProveedor = async (req, res) => {
  try {
    const { id, ...update } = req.body;
    const proveedor = await Proveedor.findByPk(id);
    if (proveedor) {
      await proveedor.update(update);
      return res.status(200).json({
        message: 'Los datos del proveedor se actualizaron correctamente',
        updates: update
      });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteProveedor = async (req, res) => {
  try {
    const { id } = req.body;
    const proveedor = await Proveedor.findByPk(id);
    if (proveedor) {
      // en caso de que el proveedor no tenga registros cargados (validacion futura)
      await proveedor.destroy();
      return res.status(200).json({
        message: 'El proveedor fue eliminado',
        deleted: {
          nombre: proveedor.nombre,
          cuit: proveedor.cuit
        }
      });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
