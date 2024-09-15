const Productos = require('../models').productos;
const catchHandler = require('../helpers/catchHandler');
const controller = {};

controller.postPrecios = async (req, res) => {
  try {
    const { productos, monto, op } = req.body;

    productos.map(async (element) => {
      const prod = await Productos.findByPk(element);
      const precioProd = prod.precio;

      if (op === 1) {
        const valor = precioProd;
        const porcentaje = monto;
        const resultado = (valor * porcentaje) / 100;
        const total1 = parseFloat(precioProd) + parseFloat(resultado);
        await prod.update({ precio: total1 });
      } else if (op === 2) {
        const total2 = parseFloat(precioProd) + parseFloat(monto);
        await prod.update({ precio: total2 });
      }
      return res.status(200).json({ message: 'Precios actualizados correctamente' });
    });
  } catch (error) {
    const err = catchHandler(error);
    return res.status(err.status).json(err.json);
  }
};

module.exports = controller;
