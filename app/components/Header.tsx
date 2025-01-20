'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

//interface HeaderProps {}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-emerald-600">
              HealthBlog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600">
              Home
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-emerald-600">
              Articles
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600">
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            >
              About
            </Link>
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


// {/* <header className="sticky top-0 z-50 bg-white shadow-sm">
// <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//   <div className="flex justify-between items-center h-16">
//     {/* Logo */}
//     <div className="flex-shrink-0">
//       <Link href="/" className="text-xl font-bold text-emerald-600">
//         HealthBlog
//       </Link>
//     </div>

//     {/* Desktop Navigation */}
//     <nav className="hidden md:flex space-x-8">
//       <Link href="/" className="text-gray-700 hover:text-emerald-600">
//         Home
//       </Link>
//       <Link href="/articles" className="text-gray-700 hover:text-emerald-600">
//         Articles
//       </Link>
//       <Link href="/about" className="text-gray-700 hover:text-emerald-600">
//         About
//       </Link>
//     </nav>

//     {/* Search Bar */}
//     <div className="hidden md:flex items-center">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search articles..."
//           className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500"
//         />
//         <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//       </div>
//     </div>

//     {/* Mobile Menu Button */}
//     <div className="md:hidden">
//       <button
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         className="text-gray-600 hover:text-gray-900 focus:outline-none"
//       >
//         {isMenuOpen ? (
//           <X className="h-6 w-6" />
//         ) : (
//           <Menu className="h-6 w-6" />
//         )}
//       </button>
//     </div>
//   </div>
// </div>

// {/* Mobile Menu */}
// {isMenuOpen && (
//   <div className="md:hidden">
//     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//       <Link
//         href="/"
//         className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
//       >
//         Home
//       </Link>
//       <Link
//         href="/articles"
//         className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
//       >
//         Articles
//       </Link>
//       <Link
//         href="/about"
//         className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
//       >
//         About
//       </Link>
//       <div className="px-3 py-2">
//         <input
//           type="text"
//           placeholder="Search articles..."
//           className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500"
//         />
//       </div>
//     </div>
//   </div>
// )}
// </header>  */}