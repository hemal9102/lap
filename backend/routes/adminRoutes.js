const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stats', adminController.getStats);
router.post('/laptops', adminController.createLaptop);
router.put('/laptops/:id', adminController.updateLaptop);
router.delete('/laptops/:id', adminController.deleteLaptop);

router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.createCategory);
router.delete('/categories/:id', adminController.deleteCategory);

module.exports = router;
