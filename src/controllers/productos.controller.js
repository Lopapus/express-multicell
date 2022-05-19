const Productos = require('../models').productos;
const controller = {};

controller.getProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({});
    if (productos) {
      return res.status(200).json(productos);
    } else {
      return res.status(400).json({ message: 'No se encontró ninguna marca en la base de datos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

controller.getProducto = async (req, res) => {
  try {
    const productos = await Productos.findByPk(req.params.id);

    if (productos) {
      return res.status(200).json(productos);
    } else {
      return res.status(400).json({ message: 'El producto que está buscando no existe' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

controller.postProducto = async (req, res) => {
  try {
    const productos = await Productos.create({
      precio: req.body.precio,
      facturado: req.body.facturado,
      observaciones: req.body.observaciones,
      stock: req.body.stock,
      stock_min: req.body.stock_min,
      imei: req.body.imei,
      estado: req.body.estado,
      fecha_ingreso: req.body.fecha_ingreso,
      codigo_barras: req.body.codigo_barras,
      id_categoria: req.body.id_categoria,
      id_subcategoria: req.body.id_subcategoria,
      id_marca: req.body.id_marca,
      id_modelo: req.body.id_modelo
    });
    return res.status(201).json(productos.toJSON());
  } catch (error) {
    res.status(500).json(error?.errors || { message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = controller;
