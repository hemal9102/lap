const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLaptops = async (req, res) => {
  try {
    const { brand } = req.query;
    let whereClause = {};
    if (brand) {
      whereClause.brand = { name: { equals: brand } };
    }

    const laptops = await prisma.laptop.findMany({
      where: whereClause,
      include: { brand: true, category: true }
    });

    res.status(200).json({ success: true, count: laptops.length, data: laptops });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getLaptopById = async (req, res) => {
  try {
    const laptopId = parseInt(req.params.id);
    if (isNaN(laptopId)) return res.status(400).json({ success: false, message: 'Invalid ID' });
    
    const laptop = await prisma.laptop.findUnique({
      where: { id: laptopId },
      include: { brand: true, category: true }
    });

    if (!laptop) return res.status(404).json({ success: false, message: 'Laptop not found' });
    res.status(200).json({ success: true, data: laptop });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
