module.exports = (object, list) => {
  const new_object = {};
  Object.entries(object).forEach((key, value) => {
    if (list.includes(key)) {
      new_object[key] = value;
    }
  });
  return new_object;
};
