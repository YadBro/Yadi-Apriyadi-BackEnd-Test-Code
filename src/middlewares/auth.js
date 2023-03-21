const jwt = require('jsonwebtoken');
const { user } = require('../../models');

const auth = async (req, res, next) => {
  try {
    const authorizationExist = req.header('Authorization');

    if (!authorizationExist) {
      return res.status(401).send({
        status: 'failed',
        message: 'Unauthorized',
      });
    }

    const token = authorizationExist.split(' ')[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      const userExist = await user.findOne({ where: { id: verified.id } });

      if (!userExist) {
        return res.status(403).send({
          status: 'failed',
          message: 'Access denied.',
        });
      }

      req.user = verified;
      return next();
    } else {
      return res.status(401).send({
        status: 'failed',
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 'failed',
      message: error?.message || 'Something went wrong',
      trace: error?.stack,
    });
  }
};

module.exports = auth;
