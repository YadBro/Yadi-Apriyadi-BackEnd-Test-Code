const { singupSchema, loginSchema } = require('../utils/schemas');
const { user } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.singup = async (req, res) => {
  try {
    const body = req.body;

    const validateData = singupSchema.validate(body);

    if (validateData.error) {
      const validateDataErrorMessage = validateData.error.message;
      return res.status(400).send({
        status: 'failed',
        message: validateDataErrorMessage,
      });
    }

    let { value: validatedData } = validateData;
    const userExist = await user.findOne({
      where: { username: validatedData.username },
    });

    if (userExist) {
      return res.status(409).send({
        status: 'failed',
        message: 'User already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);
    validatedData = { ...validatedData, password: hashedPassword };

    const newUser = await user.create(validatedData);

    // Secara default di express js untuk setiap response success adalah 200, jadi tidak perlu menambahkan opsi status kembali.
    return res.send({
      status: 'success',
      message: 'Signup successful',
      user: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: 'failed',
      message: error?.message || 'Something went wrong!',
      trace: error?.stack,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const validateData = loginSchema.validate(body);

    if (validateData.error) {
      const validateDataErrorMessage = validateData.error.message;
      return res.status(400).send({
        status: 'failed',
        message: validateDataErrorMessage,
      });
    }

    let { value: validatedData } = validateData;
    const userExist = await user.findOne({
      where: { username: validatedData.username },
      attributes: ['id', 'username', 'password'],
    });

    if (!userExist) {
      return res.status(404).send({
        status: 'failed',
        message: 'The user is not registered',
      });
    }

    const passwordMatched = bcrypt.compareSync(
      validatedData.password,
      userExist.password
    );

    if (passwordMatched === false) {
      return res.status(400).send({
        status: 'failed',
        message: 'There was problem with your login. Please try again!',
      });
    }

    const payload = {
      id: userExist.id,
      password: userExist.password,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.send({
      status: 'success',
      message: 'Login successful',
      user: userExist,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      status: 'failed',
      message: error?.message || 'Something went wrong!',
      trace: error?.stack,
    });
  }
};
