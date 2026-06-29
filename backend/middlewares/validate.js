const { z } = require('zod');

// Middleware to validate Zod schemas
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors
    });
  }
};

// Validation Schemas
const laptopSchema = z.object({
  name: z.string().min(3).max(100),
  brandName: z.string().min(2).max(50),
  categoryName: z.string().min(2).max(50),
  price: z.preprocess((a) => parseFloat(z.string().parse(a)), z.number().positive()),
  description: z.string().min(10).max(5000),
  specifications: z.string().optional().nullable(),
});

const categorySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(500).optional().nullable()
});

module.exports = { validate, laptopSchema, categorySchema };
