const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, budget, useCase, message } = req.body;
    const newLead = await prisma.lead.create({
      data: {
        name,
        email: email || '',
        phone,
        message: `Budget: ${budget} | Use: ${useCase} | Notes: ${message}`,
      }
    });
    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
