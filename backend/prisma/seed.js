const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with 10 laptops...");

  const brands = ['Apple', 'Dell', 'Asus', 'Lenovo', 'HP', 'Acer'];
  const categories = ['Ultrabook', 'Gaming', 'Business', 'Workstation', 'Budget'];

  // Seed brands
  const brandMap = {};
  for (const b of brands) {
    brandMap[b] = await prisma.brand.upsert({
      where: { name: b },
      update: {},
      create: { name: b, slug: b.toLowerCase() },
    });
  }

  // Seed categories
  const catMap = {};
  for (const c of categories) {
    catMap[c] = await prisma.category.upsert({
      where: { name: c },
      update: {},
      create: { name: c, slug: c.toLowerCase() },
    });
  }

  const laptops = [
    {
      name: 'MacBook Pro 16" M3 Max',
      slug: 'macbook-pro-16-m3-max',
      description: 'The ultimate pro laptop with M3 Max chip for extreme workflows.',
      price: 349900,
      brandId: brandMap['Apple'].id,
      categoryId: catMap['Workstation'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '36GB', Storage: '1TB SSD', Processor: 'M3 Max' })
    },
    {
      name: 'Dell XPS 15 OLED',
      slug: 'dell-xps-15-oled',
      description: 'Stunning 3.5K OLED display and Intel Core i9 performance.',
      price: 189900,
      brandId: brandMap['Dell'].id,
      categoryId: catMap['Business'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '32GB', Storage: '1TB SSD', Processor: 'Intel Core i9' })
    },
    {
      name: 'ASUS ROG Zephyrus G16',
      slug: 'asus-rog-zephyrus-g16',
      description: 'Thin, light, and packed with an RTX 4090 for ultimate gaming.',
      price: 259900,
      brandId: brandMap['Asus'].id,
      categoryId: catMap['Gaming'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '32GB', Storage: '2TB SSD', Processor: 'Intel Core i9', GPU: 'RTX 4090' })
    },
    {
      name: 'Lenovo ThinkPad X1 Carbon Gen 11',
      slug: 'lenovo-thinkpad-x1-carbon-gen-11',
      description: 'The legendary business laptop. Feather-light, ultra-tough.',
      price: 169990,
      brandId: brandMap['Lenovo'].id,
      categoryId: catMap['Business'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '16GB', Storage: '512GB SSD', Processor: 'Intel Core i7' })
    },
    {
      name: 'HP Spectre x360 14',
      slug: 'hp-spectre-x360-14',
      description: 'A masterpiece of design. 2-in-1 flexibility with OLED screen.',
      price: 149990,
      brandId: brandMap['HP'].id,
      categoryId: catMap['Ultrabook'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '16GB', Storage: '1TB SSD', Processor: 'Intel Core i7' })
    },
    {
      name: 'Acer Predator Helios 16',
      slug: 'acer-predator-helios-16',
      description: 'Unleash your gaming potential with extreme cooling and RTX 4080.',
      price: 189990,
      brandId: brandMap['Acer'].id,
      categoryId: catMap['Gaming'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '16GB', Storage: '1TB SSD', Processor: 'Intel Core i7', GPU: 'RTX 4080' })
    },
    {
      name: 'MacBook Air 15" M3',
      slug: 'macbook-air-15-m3',
      description: 'Impossibly thin, incredibly fast. The perfect everyday laptop.',
      price: 134900,
      brandId: brandMap['Apple'].id,
      categoryId: catMap['Ultrabook'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1611186871525-a7abcd2a8c2d?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '16GB', Storage: '512GB SSD', Processor: 'M3' })
    },
    {
      name: 'Dell Alienware m18',
      slug: 'dell-alienware-m18',
      description: 'Desktop replacement with massive 18-inch display and dual storage.',
      price: 299990,
      brandId: brandMap['Dell'].id,
      categoryId: catMap['Gaming'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '64GB', Storage: '4TB SSD', Processor: 'Intel Core i9', GPU: 'RTX 4090' })
    },
    {
      name: 'Asus Zenbook 14 OLED',
      slug: 'asus-zenbook-14-oled',
      description: 'Elegance meets power. Ultra-portable with long battery life.',
      price: 99990,
      brandId: brandMap['Asus'].id,
      categoryId: catMap['Ultrabook'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '16GB', Storage: '512GB SSD', Processor: 'AMD Ryzen 7' })
    },
    {
      name: 'Lenovo IdeaPad Slim 3',
      slug: 'lenovo-ideapad-slim-3',
      description: 'Affordable, reliable, and perfect for students.',
      price: 45990,
      brandId: brandMap['Lenovo'].id,
      categoryId: catMap['Budget'].id,
      publishStatus: 'published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1588702547923-7183e0f82a34?w=800&auto=format&fit=crop']),
      specifications: JSON.stringify({ RAM: '8GB', Storage: '512GB SSD', Processor: 'Intel Core i3' })
    }
  ];

  for (const laptop of laptops) {
    await prisma.laptop.upsert({
      where: { slug: laptop.slug },
      update: laptop,
      create: laptop
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
