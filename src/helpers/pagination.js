const paginate = ({ page, list_size = 10 }) => {
  const offset = page ? (page - 1) * list_size : 0;
  const limit = +list_size;

  return {
    offset,
    limit,
  };
};

module.exports = {
  paginate,
};
