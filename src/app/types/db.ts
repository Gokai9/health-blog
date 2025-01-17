// types/db.ts
export type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'admin';
    createdAt: Date;
    updatedAt: Date;
  };