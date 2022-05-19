module.exports = (error) => {
  return error.map(element => {
    const { message, path, value } = element;
    return { message, path, value };
  });
};
