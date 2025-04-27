const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key]; // eslint-disable-line no-param-reassign
      }
      return obj;
    }, {});
  };
  
  export default pick;
  