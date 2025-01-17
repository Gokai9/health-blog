// scripts/setup-admin.ts
import { db } from '../src/app/lib/db';
import { users } from '../src/app/lib/schema';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function setupAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, process.env.ADMIN_EMAIL!),
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);

    await db.insert(users).values({
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
}

setupAdmin();