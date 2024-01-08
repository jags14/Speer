const express = require('express');
const router = express.Router();
const userController = require('./auth.controllers');

router.get('/users', userController.getUsers);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;