import db from '../db.js';
import { ordersTable } from '../schemas/orders.js';
import { orderItemsTable } from '../schemas/orderItems.js';

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
const paymentMethods = ['cod', 'card', 'bank_transfer'];
const paymentStatuses = { cod: 'pending', card: 'paid', bank_transfer: 'paid' };
const cities = [
  { city: 'New York', state: 'NY', zip: '10001' },
  { city: 'Los Angeles', state: 'CA', zip: '90001' },
  { city: 'Chicago', state: 'IL', zip: '60601' },
  { city: 'Houston', state: 'TX', zip: '77001' },
  { city: 'Phoenix', state: 'AZ', zip: '85001' },
  { city: 'Philadelphia', state: 'PA', zip: '19101' },
  { city: 'San Antonio', state: 'TX', zip: '78201' },
  { city: 'San Diego', state: 'CA', zip: '92101' },
];
const names = ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Lee', 'Eva Martinez'];

// product_id → { price, colors, sizes }
const products = {
  1: { price: 1999, colors: ['white'], sizes: ['S', 'M', 'L', 'XL'] },
  2: { price: 4999, colors: ['beige', 'navy'], sizes: ['S', 'M', 'L'] },
  3: { price: 8999, colors: ['white', 'black'], sizes: ['S', 'M', 'L', 'XL'] },
  4: { price: 6499, colors: ['grey', 'black'], sizes: ['M', 'L', 'XL'] },
  5: { price: 7999, colors: ['blue'], sizes: ['S', 'M', 'L'] },
};
const productIds = Object.keys(products).map(Number);

for (let i = 0; i < 100; i++) {
  const user_id = randInt(1, 5);
  const payment_method = rand(paymentMethods);
  const location = rand(cities);
  const order_status = rand(statuses);

  const itemCount = randInt(1, 4);
  const selectedProductIds = [...new Set(Array.from({ length: itemCount }, () => rand(productIds)))];

  const items = selectedProductIds.map((product_id) => {
    const p = products[product_id];
    return {
      product_id,
      quantity: randInt(1, 3),
      unit_price: p.price,
      selected_color: rand(p.colors),
      selected_size: rand(p.sizes),
    };
  });

  const total = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  const [inserted] = await db.insert(ordersTable).values({
    user_id,
    order_status,
    total,
    payment_method,
    payment_status: order_status === 'cancelled' ? 'failed' : paymentStatuses[payment_method],
    shipping_name: names[user_id - 1],
    shipping_phone: `+1-555-${String(1000 + i).padStart(4, '0')}`,
    shipping_address: `${randInt(100, 999)} ${rand(['Maple St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Cedar Blvd'])}`,
    shipping_city: location.city,
    shipping_state: location.state,
    shipping_zip: location.zip,
    shipping_country: 'US',
  }).returning({ id: ordersTable.id });

  await db.insert(orderItemsTable).values(items.map(item => ({ ...item, order_id: inserted.id })));
}

console.log('Seeded 100 orders with their items.');
process.exit(0);
