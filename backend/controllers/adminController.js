const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStats = async (req, res) => {
  try {
    const totalLaptops = await prisma.laptop.count();
    const totalBrands = await prisma.brand.count();
    const totalCategories = await prisma.category.count();
    const totalLeads = await prisma.lead.count();

    res.status(200).json({
      success: true,
      data: {
        totalSales: 45231.00, 
        laptopsSold: 124,
        totalLaptopsInCatalog: totalLaptops,
        totalBrands,
        totalCategories,
        totalLeads
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
};

exports.createLaptop = async (req, res) => {
  try {
    const { name, brandName, categoryName, price, description, images, specifications } = req.body;
    
    if (!name || !price || !brandName || !categoryName) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const brand = await prisma.brand.upsert({
      where: { name: brandName },
      update: {},
      create: { name: brandName, slug: brandName.toLowerCase().replace(/ /g, '-') }
    });

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName, slug: categoryName.toLowerCase().replace(/ /g, '-') }
    });

    const newLaptop = await prisma.laptop.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
        description: description || '',
        price: Number(price),
        brandId: brand.id,
        categoryId: category.id,
        images: images ? JSON.stringify(images) : null,
        specifications: specifications ? JSON.stringify(specifications) : null,
        publishStatus: 'published'
      }
    });

    res.status(201).json({ success: true, data: newLaptop });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating laptop', error: error.message });
  }
};

exports.updateLaptop = async (req, res) => {
  try {
    const laptopId = parseInt(req.params.id);
    const updatedLaptop = await prisma.laptop.update({
      where: { id: laptopId },
      data: req.body
    });
    res.status(200).json({ success: true, data: updatedLaptop });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Laptop not found' });
  }
};

exports.deleteLaptop = async (req, res) => {
  try {
    await prisma.laptop.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ success: true, message: 'Laptop deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Laptop not found' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ include: { _count: { select: { laptops: true } } } });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    const newCat = await prisma.category.create({
      data: { name, slug: name.toLowerCase().replace(/ /g, '-'), description: description || '' }
    });
    res.status(201).json({ success: true, data: newCat });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Category not found' });
  }
};
