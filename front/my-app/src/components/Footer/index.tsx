// components/Footer.tsx
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              About us
            </h4>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Shortcuts
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-500 hover:text-cyan-700 text-sm transition-colors hover:underline">
                Home
              </Link>
              <Link href="/products" className="text-gray-500 hover:text-cyan-700 text-sm transition-colors hover:underline">
                Products
              </Link>
              <Link href="/support" className="text-gray-500 hover:text-cyan-700 text-sm transition-colors hover:underline">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Contact Info
            </h4>
            <div className="text-gray-500 text-sm space-y-2">
              <p>Address: Schellingstr. 12, 12345 Berlin, Germany</p>
              <p>Phone: +123 456 789</p>
              <p>Email: info@example.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Follow Us!
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cyan-700 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-700 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-700 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-700 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Hi-Tec. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};