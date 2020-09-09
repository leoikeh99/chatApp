const truncate = (value, length) => {
  return value.length < length ? value : value.substr(0, length - 1) + "...";
};

export { truncate };
