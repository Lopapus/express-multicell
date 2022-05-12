const Usuario = require('../models').usuarios;
module.exports = async (usuario) => {
  const count = await Usuario.count({
    where: {
      usuario
    }
  });
  console.log(count);
  return count > 0;
};
