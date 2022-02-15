const Usuarios = require('../models').usuarios;
const bcryptjs = require('bcryptjs');
const catchHandler = require('../helpers/catchHandler');
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
      const validation = bcryptjs.compareSync(password, user.password) || password === user.clave_maestra;

      if (validation) {
        req.session.userid = user.id;
        return res.status(200).json({ msg: 'Usuario logeado' });
      }

      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }
    return res.status(400).json({ msg: 'Usuario no encontrado' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.msg);
  }
};

controller.logout = async (req, res) => {
  try {
    delete req.params.userid;
    res.status(200).json({ msg: 'Usuario deslogueado' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.msg);
  }
};

module.exports = controller;
