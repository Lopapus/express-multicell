const { proveedores: Proveedores, proveedores_productos: ProveedoresProductos } = require('../models');
const { sequelize } = require('../connections/sequelize');
const SchemaProveedores = require('../schemas/proveedores.schema');
const catchHandler = require('../helpers/catchHandler');
const filterObjectList = require('../helpers/filterObjectList');
const { Op } = require('sequelize');
const controller = {};

// query attributes: {
//   cuit,nombre,search_nombre : string
//   page,limit : integer
//   estado,productos : boolean (1:true,0:false)
// }

// obtiene todos los proveedores
controller.getProveedores = async (req, res) => {
  const { cuit, nombre, estado, search_nombre, page, productos } = req.query;
  let { limit } = req.query;

  // condiciones de busqueda
  const where = {};
  if (nombre) { where.nombre = nombre; }
  if (cuit) { where.cuit = cuit; }
  if (estado) { where.estado = estado; }
  if (search_nombre) {
    where.nombre = {
      [Op.like]: `%${search_nombre}%`
    };
  }

  // paginación
  // en caso que el limite de registros sea mayor a 0 se agregará a la consulta
  limit = limit > 0 ? parseInt(limit) : null;
  // si el numero de pagina es mayor a 0 se agregará a la consulta
  const offset = parseInt((page > 0 ? page - 1 : 0) * (limit || 1)) || null;

  // verifica si se debe agregar los productos del proveedor
  const { attributes, include } = SchemaProveedores;
  const schema = { attributes };
  // si existe el atributo productos existe en el request.query
  if (parseInt(productos) === 1) {
    schema.include = include;
  }

  try {
    const proveedores = await Proveedores.findAll({ ...schema, where, order: ['nombre'], offset, limit });
    if (proveedores) {
      return res.status(200).json(proveedores);
    } else {
      return res.status(400).json({ message: 'No se encontró ningun proveedor en la base de datos' });
    }
  } catch (error) {
    const { status, json } = catchHandler(error);
    return res.status(status).json(json);
  }
};

controller.getProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { productos } = req.query;

    // verifica si se debe agregar los productos del proveedor
    const { attributes, include } = SchemaProveedores;
    const schema = { attributes };
    // si existe el atributo productos existe en el request.query
    if (parseInt(productos) === 1) {
      schema.include = include;
    }

    const proveedor = await Proveedores.findByPk(id, { ...schema });
    if (proveedor) {
      return res.status(200).json(proveedor.toPublicJson());
    } else {
      return res.status(400).json({ message: 'El proveedor no existe' });
    }
  } catch (error) {
    const { status, json } = catchHandler(error);
    return res.status(status).json(json);
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
      created: proveedor.toPublicJson()
    });
  } catch (error) {
    const { status, json } = catchHandler(error);
    return res.status(status).json(json);
  }
};

controller.updateProveedor = async (req, res) => {
  try {
    const { id, ...update } = req.body;
    const proveedor = await Proveedores.findByPk(id);
    if (proveedor) {
      const updates = filterObjectList(update, proveedor.attributes);
      await proveedor.update(update);
      return res.status(200).json({
        message: 'Los datos del proveedor se actualizaron correctamente',
        updates
      });
    }
  } catch (error) {
    const { status, json } = catchHandler(error);
    return res.status(status).json(json);
  }
};

controller.deleteProveedor = async (req, res) => {
  try {
    const { id } = req.body;
    const proveedor = await Proveedores.findByPk(id);
    if (proveedor) {
      // const count = await proveedor.countProductos();
      const deleted = await proveedor.delete();
      // en caso de que el proveedor no tenga registros cargados
      if (deleted) {
        return res.status(200).json({ message: 'El proveedor se eliminó correctamente', type: 'delete' });
      } else {
        return res.status(200).json({ message: 'El proveedor fué desactivado correctamente', type: 'disabled' });
      }
    }
  } catch (error) {
    const { status, json } = catchHandler(error);
    return res.status(status).json(json);
  }
};

controller.updateProveedorProducto = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const updates = req.body;
    console.log(updates);

    for (const update of updates) {
      const { proveedor, id, aggregate } = update;

      if (aggregate) { // si se debe agregar el producto
        await ProveedoresProductos.create({ id_proveedor: proveedor, id_producto: id }, { transaction });
      } else { // si se debe eliminar el producto
        const prov_product = await ProveedoresProductos.findOne({
          where: {
            id_producto: id,
            id_proveedor: proveedor
          }
        });
        if (prov_product) {
          await prov_product.destroy({ transaction });
        }
      }
    }

    await transaction.commit();
    return res.status(200).json({ message: 'Los productos se actualizaron correctamente' });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    const { status, json } = catchHandler(error);
    return res.status(status).json(json);
  }
};

module.exports = controller;
