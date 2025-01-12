// app/admin/layout.js
import { Inter } from 'next/font/google';
import Sidebar from '../components/admin/Sidebar';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
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

// app/admin/components/Sidebar.js
