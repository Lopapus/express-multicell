module.exports = (object, list) => {
  const new_object = {};
  Object.keys(object).forEach(key => {
    if (list.includes(key)) {
      new_object[key] = object[key];
    }
  });
  return new_object;
};
