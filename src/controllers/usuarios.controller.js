const Usuarios = require('../models').usuarios;
const bcryptjs = require('bcryptjs');
const catchHandler = require('../helpers/catchHandler');
const existsUsuario = require('../helpers/existsUsuario');
const { Op } = require('sequelize');
const filterObjectAttributes = require('../helpers/filterObjectAttributes');
const makeRandomString = require('../helpers/makeRandomString');

const controller = {};

// LIST/SELECT
controller.findUsuarios = async (req, res) => {
  try {
    const attributes = ['usuario', 'nombre', 'rol', 'estado'];
    const query = filterObjectAttributes(req.query, attributes);

    if (Object.values(query).length > 0) {
      if (query.usuario) {
        query.usuario = { [Op.like]: `%${query.usuario}%` };
      }

      if (query.nombre) {
        query.nombre = { [Op.like]: `%${query.nombre}%` };
      }

      const usuarios = await Usuarios.findAll({
        where: { ...query }
      });
      if (usuarios) {
        return res.status(200).json(usuarios);
      } else {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
    } else {
      const usuarios = await Usuarios.findAll({});
      return res.status(200).json(usuarios);
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// GET/SELECT ID
controller.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);

    if (usuario) {
      return res.status(200).json(usuario.toJSON());
    } else {
      return res.status(400).json({ message: 'El usuario no existe' });
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// GET /NOMBRE USUARIO
controller.findNomUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findAll({
      where: {
        usuario: req.params.user
      }
    });

    if (usuario) {
      return res.status(200).json(usuario);
    } else {
      return res.status(400).json({ message: 'El usuario no existe' });
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// CREATE/INSERT
controller.createUsuario = async (req, res) => {
  try {
    const existence = await existsUsuario(req.body.usuario);

    if (!existence) {
      const salt = bcryptjs.genSaltSync(10);
      const hash_password = bcryptjs.hashSync(req.body.password, salt);

      const usuario = await Usuarios.create({
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        password: hash_password,
        clave_maestra: makeRandomString(8),
        rol: req.body.rol
      });

      return res.status(200).json(usuario.toJSON());
    } else {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// UPDATE
controller.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.body.id);

    if (usuario) {
      // El modelo de sequelize ignora atributos que no esten dentro del modelo
      // Tampoco actualiza los atributos con valores existentes en la bd
      // Tampoco modifica el id del registro
      const { password, ...body } = req.body;
      const update = body;

      if (update.usuario) {
        const existence = await existsUsuario(req.body.usuario);
        if (existence) {
          return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        }
      }

      await usuario.update(update);
      return res.status(200).json(usuario.toJSON());
    } else {
      return res.status(400).json({ message: 'El usuario no existe' });
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// clave maestra
controller.updateClaveMaestra = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.body.id);
    if (usuario) {
      await usuario.update({
        clave_maestra: makeRandomString(8),
        where: {
          id: req.body.id
        }
      });
      return res.status(200).json({ clave_maestra: usuario.clave_maestra });
    }
    return res.status(400).json({ message: 'El usuario no existe' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// UPDATE PASSWORD
controller.updatePassword = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.body.id);

    if (usuario) {
      const { password, old_password } = req.body;

      const validation = bcryptjs.compareSync(old_password, usuario.password) || old_password === usuario.clave_maestra;

      if (validation) {
        const salt = bcryptjs.genSaltSync(10);
        const hash_password = bcryptjs.hashSync(password, salt);
        usuario.update({ password: hash_password });
        return res.status(200).json(usuario.toJSON());
      } else {
        return res.status(400).json({ message: 'La contraseña o clave_maestra es incorrecta' });
      }
    } else {
      return res.status(400).json({ message: 'El usuario no existe' });
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

// DELETE
controller.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.body.id);
    if (usuario) {
      await usuario.destroy();
      return res.status(200).json({ message: 'Usuario eliminado' });
    } else {
      return res.status(400).json({ message: 'El usuario no existe' });
    }
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json(alert.json);
  }
};

module.exports = controller;
