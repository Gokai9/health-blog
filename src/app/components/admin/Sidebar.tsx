import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, PenTool, BarChart2 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart2 },
    { name: 'Manage Articles', href: '/admin/articles', icon: FileText },
    { name: 'Generate Content', href: '/admin/generate', icon: PenTool },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold">Health Blog Admin</h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                >
                  <Icon
                    className={`${
                      pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5 flex-shrink-0`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}