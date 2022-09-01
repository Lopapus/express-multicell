const {
  productos: Productos,
  marcas: Marcas,
  categorias: Categorias,
  subcategorias: Subcategorias,
  proveedores: Proveedores
} = require('../models');
const { transaction: Transaction } = require('sequelize');
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
  try {
    const productos = await Productos.create({
      modelo: req.body.modelo,
      precio: req.body.precio,
      observaciones: req.body.observaciones,
      stock: req.body.stock,
      stock_min: req.body.stock_min,
      imei: req.body.imei,
      estado: 1,
      codigo_barras: req.body.codigo_barras,
      id_categoria: req.body.id_categoria,
      id_subcategoria: req.body.id_subcategoria,
      id_marca: req.body.id_marca
    });
    return res.status(201).json({ message: `El producto ${productos.modelo} se agregó correctamente` });
  } catch (error) {
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
  return res.status(200).json({ msg: 'la transcacion' });
  // const transaction = await Transaction();
  // try {
  //   const { productos } = req.body;
  //   const updates = await new Promise((resolve, reject) => {
  //     console.log('entrado');
  //     try {
  //       productos.map(
  //         async ({ id, entrada }) => {
  //           console.log('recorriendo');
  //           const producto = await Productos.findByPk(id);

  //           if (producto) {
  //             await producto.update({ stock: this.stock + entrada }, { transaction });
  //             return producto;
  //           }
  //         }
  //       );
  //       resolve(true);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  //   return res.status(400).json({ message: updates });
  // } catch (error) {
  //   await transaction.rollback();
  //   const err = catchHandler(error);
  //   return res.status(err.status).json(err.json);
  // }
};

module.exports = controller;
