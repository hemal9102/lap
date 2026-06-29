const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController');

router.get('/', laptopController.getLaptops);
router.get('/:id', laptopController.getLaptopById);

module.exports = router;
