const jwt = require('jsonwebtoken');

const createJwt = (id) => {
  if (!id) {
    return null;
  } else {
    const payload = { id };
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.SECRET, (err, token) => {
        if (err) {
          console.log('Error al crear token: ', err);
          reject(new Error('Error al crear token'));
        }
        resolve(token);
      });
    });
  }
};

module.exports = createJwt;
