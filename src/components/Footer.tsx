import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white mt-10'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold'>Part-Time Mate</h3>
            <p className='text-gray-400 text-sm'>
              Connecting businesses with talented part-time workers in Australia.
            </p>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaFacebook size={20} />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaTwitter size={20} />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaInstagram size={20} />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/jobs' className='text-gray-400 hover:text-white'>
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to='/post-job' className='text-gray-400 hover:text-white'>
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to='/companies' className='text-gray-400 hover:text-white'>
                  Companies
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-gray-400 hover:text-white'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Resources</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/help' className='text-gray-400 hover:text-white'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='text-gray-400 hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/terms' className='text-gray-400 hover:text-white'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-400 hover:text-white'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Contact Us</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Sydney, Australia</li>
              <li>Email: info@parttimemate.com</li>
              <li>Phone: +61 2 XXXX XXXX</li>
              <li>Hours: Mon-Fri 9:00 AM - 5:00 PM AEST</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © {currentYear} Part-Time Mate. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link to='/privacy' className='text-gray-400 hover:text-white text-sm'>
                Privacy Policy
              </Link>
              <Link to='/terms' className='text-gray-400 hover:text-white text-sm'>
                Terms of Service
              </Link>
              <Link to='/cookies' className='text-gray-400 hover:text-white text-sm'>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
