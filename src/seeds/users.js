import db from '../db.js';
import { usersTable } from '../schemas/users.js';

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com' },
  { name: 'Bob Smith',     email: 'bob@example.com' },
  { name: 'Carol White',   email: 'carol@example.com' },
  { name: 'David Lee',     email: 'david@example.com' },
  { name: 'Eva Martinez',  email: 'eva@example.com' },
];

await db.insert(usersTable).values(users);
console.log(`Seeded ${users.length} users.`);
