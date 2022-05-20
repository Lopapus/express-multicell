const jwt = require('jsonwebtoken');
const Usuarios = require('../models').usuarios;
const catchHandler = require('../helpers/catchHandler');
const middleware = {};

middleware.validateLogin = async (req, res, next) => {
  try {
    const token = req.header('auth-token');

    // Verificar existencia del token
    if (!token) {
    // 'No existe el token
      return res.status(400).json({ message: 'Error de autenticacion' });
    }

    // Verificar token
    const { id } = jwt.verify(token, process.env.SECRET);

    if (id) {
      // verificar existencia del id en la base de datos
      const usuario = await Usuarios.findByPk(id);
      if (usuario) {
        if (usuario.estado) {
          req.userrol = usuario.rol;
          return next();
        }
        return res.status(401).json({ message: 'El usuario está inhabilitado' });
      }
    }
    return res.status(401).json({ message: 'Debe loguearse para acceder' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json({ message: alert.message });
  }
};

// middleware.validateLogin = async (req, res, next) => {
//   try {
//     const token = req.header('auth-token');
//     const usuario = await Usuarios.findByPk(token);
//     if (usuario) {
//       req.userrol = usuario.rol;
//       return next();
//     }
//     return res.status(401).json({ message: 'Debe loguearse para acceder' });
//   } catch (error) {
//     const alert = catchHandler(error);
//     res.status(alert.status).json({ message: alert.message });
//   }
// };

middleware.validateAdmin = (req, res, next) => {
  if (req.userrol === 'admin') {
    return next();
  }
  return res.status(401).json({ message: 'Debes tener acceso de administrador para realizar esta acción' });
};

module.exports = middleware;
