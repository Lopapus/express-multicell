module.exports = (error) => {
  console.log(error);
  return { status: 500, msg: 'Server Error' };
};
