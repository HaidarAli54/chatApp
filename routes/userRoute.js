const express = require('express');
const UserController = require('../controller/userController');

const userController =  new UserController();

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
