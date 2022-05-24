const Usuarios = require('../models').usuarios;
const bcryptjs = require('bcryptjs');
const catchHandler = require('../helpers/catchHandler');
const createJwt = require('../helpers/createToken');
const controller = {};

controller.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuarios.findOne({
      where: {
        usuario
      }
    });
    if (user) {
      if (user.estado) {
        const validation = bcryptjs.compareSync(password, user.password) || password === user.clave_maestra;

        if (validation) {
          const { nombre, usuario: username, rol, id } = user;
          const token = await createJwt(id);
          return res.status(200).json({ message: 'Bienvenido', user: { nombre, usuario: username, rol, token } });
        }

        return res.status(400).json({ message: 'Contraseña incorrectax' });
      }
      return res.status(400).json({ message: 'El usuario está inhabilitado' });
    }
    return res.status(400).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// controller.logout = async (req, res) => {
//   try {
//     res.status(200).json({ message: 'Usuario deslogueado' });
//   } catch (error) {
//     const alert = catchHandler(error);
//     res.status(alert.status).json({ message: alert.message });
//   }
// };

module.exports = controller;
