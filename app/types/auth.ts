
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}
