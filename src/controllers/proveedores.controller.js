const { proveedores: Proveedores, productos: Productos } = require('../models');
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedores.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: Productos,
          as: 'productos',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id_categoria', 'id_subcategoria', 'id_marca', 'id_modelo']
          },
          through: {
            attributes: []
          }
        }
      ]
    });
    if (proveedores) {
      return res.status(200).json(proveedores);
    } else {
      return res.status(400).json({ message: 'No se encontró ningun proveedor en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.createProveedor = async (req, res) => {
  try {
    const { nombre, cuit, lugar, telefono, correo, inscripto } = req.body;
    const proveedor = await Proveedores.create({
      nombre,
      cuit,
      lugar,
      telefono,
      correo,
      inscripto
    });
    return res.status(201).json({
      message: 'Los datos del proveedor fueron guardados correctamente',
      created: proveedor.toJSON()
    });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.updateProveedor = async (req, res) => {
  try {
    const { id, ...update } = req.body;
    const proveedor = await Proveedores.findByPk(id);
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
    const proveedor = await Proveedores.findByPk(id);
    if (proveedor) {
      const count = await proveedor.countProductos();
      // en caso de que el proveedor no tenga registros cargados (validacion futura)
      if (count === 0) {
        await proveedor.destroy();
      } else {
        await proveedor.update({ estado: false });
      }

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
