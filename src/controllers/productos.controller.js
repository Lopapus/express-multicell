const {
  productos: Productos,
  marcas: Marcas,
  categorias: Categorias,
  subcategorias: Subcategorias,
  proveedores: Proveedores,
  proveedores_productos: ProveedoresProductos
} = require('../models');
const { sequelize } = require('../connections/sequelize');
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.getProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      attributes: ['id', 'modelo', 'precio', 'observaciones', 'stock', 'stock_min', 'imei', 'estado', 'fecha_ingreso', 'codigo_barras'],
      include: [
        // el as es el nombre del atributo y debe ser el mismo que en el as del assosiation del model
        {
          model: Marcas,
          as: 'marca',
          attributes: ['id', 'nombre']
        },
        {
          model: Categorias,
          as: 'categoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Subcategorias,
          as: 'subcategoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Proveedores,
          as: 'proveedores',
          attributes: ['cuit', 'nombre'],
          through: {
            attributes: []
          }
        }
      ]
    });
    if (productos) {
      return res.status(200).json(productos);
    } else {
      return res.status(400).json({ message: 'No se encontró ninguna marca en la base de datos' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.getProducto = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'modelo', 'precio', 'observaciones', 'stock', 'stock_min', 'imei', 'estado', 'fecha_ingreso', 'codigo_barras'],
      include: [
        // el as es el nombre del atributo y debe ser el mismo que en el as del assosiation del model
        {
          model: Marcas,
          as: 'marca',
          attributes: ['id', 'nombre']
        },
        {
          model: Categorias,
          as: 'categoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Subcategorias,
          as: 'subcategoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Proveedores,
          as: 'proveedores',
          attributes: ['cuit', 'nombre'],
          through: {
            attributes: []
          }
        },
        {
          model: ProveedoresProductos,
          as: 'ProveedoresProductos',
          attributes: ['id']
        }
      ]
    });

    if (productos) {
      return res.status(200).json(productos);
    } else {
      return res.status(400).json({ message: 'El producto que está buscando no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.postProducto = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const productos = await Productos.create({
      modelo: req.body.modelo,
      precio: req.body.precio,
      facturado: req.body.facturado,
      observaciones: req.body.observaciones,
      stock: req.body.stock,
      stock_min: req.body.stock_min,
      imei: req.body.imei,
      estado: 1,
      codigo_barras: req.body.codigo_barras,
      id_categoria: req.body.id_categoria,
      id_subcategoria: req.body.id_subcategoria,
      id_marca: req.body.id_marca
    }, { transaction });

    await ProveedoresProductos.create({ id_proveedor: req.body.id_proveedor, id_producto: productos.dataValues.id }, { transaction });
    await transaction.commit();

    return res.status(201).json({ message: `El producto ${productos.modelo} se agregó correctamente` });
  } catch (error) {
    await transaction.rollback();
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.putProducto = async (req, res) => {
  try {
    const productos = await Productos.findByPk(req.body.id);

    if (productos) {
      await productos.update(req.body);
      return res.status(200).json({ message: 'La marca se ha actualizado correctamente' });
    } else {
      return res.status(304).json({ message: 'Ocurrió un error al actualizar la marca' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.deleteProducto = async (req, res) => {
  try {
    const productos = await Productos.findByPk(req.body.id);

    if (productos) {
      await productos.destroy();
      return res.status(200).json({ message: 'Se ha eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'La marca que desea eliminar no existe' });
    }
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.updateProductosProveedor = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { productos } = req.body;
    const updates = [];

    for (const update of productos) {
      const { id, entrada } = update;
      const producto = await Productos.findByPk(id, { transaction });
      if (producto) {
        const { stock } = producto;
        const update = await producto.update({ stock: (stock + entrada) }, { transaction });
        updates.push(update);
      }
    }
    await transaction.commit();
    return res.status(200).json({ message: 'Los productos se actualizaron correctamente', updates });
  } catch (error) {
    await transaction.rollback();
    console.log(error);

    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

const filterProductosFromDB = async (typeOfFilter, typeId) => {
  try {
    const adapterTypeOfFilter = {
      marcas: 'id_marca',
      categorias: 'id_categoria',
      subcategorias: 'id_subcategoria'
    };

    const productos = await Productos.findAll({
      where: {
        [adapterTypeOfFilter[typeOfFilter]]: parseInt(typeId)
      },
      attributes: ['id', 'modelo', 'precio', 'stock', 'fecha_ingreso'],
      include: [
        {
          model: Marcas,
          as: 'marca',
          attributes: ['id', 'nombre']
        },
        {
          model: Categorias,
          as: 'categoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Subcategorias,
          as: 'subcategoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Proveedores,
          as: 'proveedores',
          attributes: ['cuit', 'nombre'],
          through: {
            attributes: []
          }
        }
      ]
    });

    return productos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

controller.filterProductos = async (req, res) => {
  try {
    const { typeOfFilter, typeId } = req.body;

    const productos = await filterProductosFromDB(typeOfFilter, typeId);

    res.status(200).json(productos);
  } catch (error) {
    console.log(error);

    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

controller.changePriceOfProductos = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { mode, typeOfFilter, typeId, mount } = req.body;

    let productos = [];
    const updates = [];

    if (!typeOfFilter || !typeId) {
      productos = await Productos.findAll({ transaction });
    } else {
      productos = await filterProductosFromDB(typeOfFilter, typeId);
    }

    for (const producto of productos) {
      const { precio } = producto;
      const newPrice = mode === 'porcentaje' ? precio + (precio * mount / 100) : precio + mount;
      const update = await producto.update({ precio: newPrice }, { transaction });
      updates.push(update);
    }

    await transaction.commit();

    return res.status(200).json({ message: 'Los precios se actualizaron correctamente', updates });
  } catch (error) {
    await transaction.rollback();
    console.log(error);

    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
