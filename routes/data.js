const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const dataController = require('../controllers/dataController');

router.get('/', authMiddleware.verifyToken, dataController.getData);

module.exports = router;
