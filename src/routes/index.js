const express = require('express');
const { singup, login } = require('../controllers/AuthController');
const { getAllUsers } = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/auth/signup', singup);
router.post('/auth/login', login);

router.get('/userlist', auth, getAllUsers);

module.exports = router;
