// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './app/db';
import { users } from './app/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { signInSchema } from '@/lib/zod';

// Extend next-auth session type to include custom fields
declare module 'next-auth' {
  interface Session {
    user: User & {
      role: 'admin';
    };
  }
  interface User {
    role?: 'admin';
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      } 
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as 'admin';
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // const { email, password } = credentials as {
        //   email: string;
        //   password: string;
        // };
        const { email, password } = await signInSchema.parseAsync(credentials)
        // if (!email || !password) {
        //   throw new Error('Please enter your email and password');
        // }

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        // const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        // const user: AdminUser = result.rows[0];

        if (!user) {
          throw new Error('No user found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        console.log(user)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        };
      },
    }),
  ],
});


