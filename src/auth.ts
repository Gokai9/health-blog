// // auth.ts
// import NextAuth from 'next-auth';
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import Credentials from 'next-auth/providers/credentials';
// import { db } from './app/lib/db';
// import { users } from './app/lib/schema';
// import { eq } from 'drizzle-orm';
// import bcrypt from 'bcryptjs';

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   adapter: DrizzleAdapter(db),
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: '/auth/login',
//     error: '/auth/error',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };

//         if (!email || !password) {
//           throw new Error('Please enter your email and password');
//         }

//         const user = await db.query.users.findFirst({
//           where: eq(users.email, email),
//         });

//         if (!user) {
//           throw new Error('No user found');
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//           throw new Error('Invalid password');
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],
// });

// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './app/lib/db';
import { users } from './app/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
//import { type User } from './app/lib/schema';

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
  handlers: { GET, POST },
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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error('Please enter your email and password');
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          throw new Error('No user found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});

