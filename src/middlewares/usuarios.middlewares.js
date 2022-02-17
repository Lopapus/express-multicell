const Usuarios = require('../models').usuarios;
const catchHandler = require('../helpers/catchHandler');
const middleware = {};

middleware.validateLogin = async (req, res, next) => {
  try {
    const token = req.header('auth-token');
    const usuario = await Usuarios.findByPk(token);
    if (usuario) {
      req.userrol = usuario.rol;
      return next();
    }
    return res.status(401).json({ msg: 'Debe loguearse para acceder' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json({ msg: alert.msg });
  }
};

middleware.validateAdmin = (req, res, next) => {
  if (req.userrol === 'admin') {
    return next();
  }
  return res.status(401).json({ msg: 'Debes tener acceso de administrador para realizar esta acción' });
};

module.exports = middleware;
