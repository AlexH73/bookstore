import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = {
    Shop: [
      { label: 'All Books', path: '/catalog' },
      { label: 'New Releases', path: '/new' },
      { label: 'Bestsellers', path: '/bestsellers' },
    ],
    Help: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Shipping', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
    ],
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  };

  return (
    <footer className='bg-gray-900 text-white mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='md:col-span-1'>
            <h2 className='text-2xl font-bold mb-4'>BookStore</h2>
            <p className='text-gray-400'>
              Your favorite online bookstore. Discover millions of books with
              free shipping worldwide.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className='font-semibold text-lg mb-4'>{category}</h3>
              <ul className='space-y-2'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>
            &copy; {new Date().getFullYear()} BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
