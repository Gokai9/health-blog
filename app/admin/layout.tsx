// app/admin/layout.tsx
//import { Inter } from 'next/font/google';
import Sidebar from '../components/admin/Sidebar';
import { redirect } from 'next/navigation';
import { auth } from '../../auth';

//const inter = Inter({ subsets: ['latin'] });

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth()
  
  if (!session || session.user.role !== "admin") {
    redirect('/api/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

