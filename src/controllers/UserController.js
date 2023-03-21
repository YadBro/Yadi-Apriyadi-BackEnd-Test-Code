const { user } = require('../../models');

const getPagination = (page, size) => {
  const sizeDefault = 3;
  const limit = size ? +size : sizeDefault;
  const offset = page ? (+page - 1) * limit : +page;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rows, totalPages, currentPage };
};

exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, size = 3 } = req.query;

    if (+page <= 0 && page) {
      return res.status(400).send({
        status: 'failed',
        message: 'Page must start from 1',
      });
    }

    const { limit, offset } = getPagination(page, size);
    const data = await user.findAndCountAll({ limit, offset });

    const {
      totalItems,
      totalPages,
      rows: users,
      currentPage,
    } = getPagingData(data, page, limit);

    return res.send({
      status: 'success',
      message: 'Success to get all users data with pagination',
      users,
      pagination: {
        totalItems,
        totalPages,
        currentPage,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: 'failed',
      message: error?.message || 'Something went wrong',
      trace: error?.stack,
    });
  }
};
