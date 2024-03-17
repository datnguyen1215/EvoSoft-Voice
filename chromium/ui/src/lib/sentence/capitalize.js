const capitalize = str => {
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;
