const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../middlewares/upload');
const { validate, laptopSchema, categorySchema } = require('../middlewares/validate');

router.get('/stats', adminController.getStats);
router.post('/laptops', upload.single('image'), validate(laptopSchema), adminController.createLaptop);
router.put('/laptops/:id', upload.single('image'), adminController.updateLaptop);
router.delete('/laptops/:id', adminController.deleteLaptop);

router.get('/categories', adminController.getCategories);
router.post('/categories', validate(categorySchema), adminController.createCategory);
router.delete('/categories/:id', adminController.deleteCategory);

module.exports = router;
