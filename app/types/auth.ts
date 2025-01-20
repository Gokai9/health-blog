/**
 * This module defines TypeScript interfaces and module augmentations for handling authentication and session management
 * in a Next.js application using `next-auth`.
 * 
 * The `AdminUser` interface represents an admin user with properties such as `_id`, `email`, `name`, `password`, `role`, 
 * `createdAt`, and `updatedAt`.
 * 
 * The `SessionUser` interface extends the `DefaultSession` interface from `next-auth` to include a `user` object that 
 * optionally has a `role` property set to 'admin'.
 * 
 * The module augmentation for `next-auth` adds a `user` property of type `SessionUser` to the `Session` interface, and 
 * a `role` property to the `User` interface.
 * 
 * The module augmentation for `next-auth/jwt` adds a `role` property to the `JWT` interface.
 */
// types/auth.ts
//import { DefaultSession } from 'next-auth';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// export interface SessionUser extends DefaultSession['user'] {
//     role?: 'admin';
//   }
  

// export interface SessionUser extends DefaultSession {
//   user: {
//     role?: 'admin';
//   } & DefaultSession['user'];
// }

// declare module 'next-auth' {
//   interface Session {
//     user: SessionUser;
//   }

//   interface User {
//     role?: 'admin';
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     role?: 'admin';
//   }
// }