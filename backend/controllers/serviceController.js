const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug }
    });

    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
