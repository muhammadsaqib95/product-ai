import db from '../db.js';
import { productsTable } from '../schemas/products.js';

const products = [
  {
    title: 'Classic White Tee',
    description: 'A timeless white cotton t-shirt for everyday wear.',
    images: ['https://example.com/images/white-tee-1.jpg', 'https://example.com/images/white-tee-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'classic-white-tee',
    tags: ['t-shirt', 'casual', 'cotton'],
    colors: ['white'],
    inventory_quantity: 120,
    price: 1999,
    price_currency: 'USD',
  },
  {
    title: 'Slim Fit Chinos',
    description: 'Modern slim fit chinos perfect for casual and semi-formal occasions.',
    images: ['https://example.com/images/chinos-1.jpg'],
    sizes: ['S', 'M', 'L'],
    slug: 'slim-fit-chinos',
    tags: ['pants', 'chinos', 'slim-fit'],
    colors: ['beige', 'navy'],
    inventory_quantity: 60,
    price: 4999,
    price_currency: 'USD',
  },
  {
    title: 'Leather Sneakers',
    description: 'Premium leather sneakers with a minimalist design.',
    images: ['https://example.com/images/sneakers-1.jpg', 'https://example.com/images/sneakers-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'leather-sneakers',
    tags: ['shoes', 'sneakers', 'leather'],
    colors: ['white', 'black'],
    inventory_quantity: 45,
    price: 8999,
    price_currency: 'USD',
  },
  {
    title: 'Wool Blend Hoodie',
    description: 'Cozy wool blend hoodie for cold days.',
    images: ['https://example.com/images/hoodie-1.jpg'],
    sizes: ['M', 'L', 'XL'],
    slug: 'wool-blend-hoodie',
    tags: ['hoodie', 'winter', 'wool'],
    colors: ['grey', 'black'],
    inventory_quantity: 80,
    price: 6499,
    price_currency: 'USD',
  },
  {
    title: 'Denim Jacket',
    description: 'Classic denim jacket with a relaxed fit.',
    images: ['https://example.com/images/denim-jacket-1.jpg'],
    sizes: ['S', 'M', 'L'],
    slug: 'denim-jacket',
    tags: ['jacket', 'denim', 'outerwear'],
    colors: ['blue'],
    inventory_quantity: 35,
    price: 7999,
    price_currency: 'USD',
  },
];

await db.insert(productsTable).values(products);
console.log(`Seeded ${products.length} products.`);
