const sequelize = require('sequelize');

module.exports = (error) => {
  console.log(error);
  if (error instanceof sequelize.ConnectionRefusedError) {
    return { status: 500, msg: 'Not connection BD' };
  }
  return { status: 500, msg: 'Server Error' };
};
