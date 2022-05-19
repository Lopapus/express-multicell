const sequelizeCatchHandler = require('./sequelizeCatchHandler');

module.exports = (error) => {
  console.log(error);
  if (error?.errors) {
    return { status: 400, json: sequelizeCatchHandler(error.errors) };
  }
  return { status: 500, json: { message: 'Server Error' } };
};
