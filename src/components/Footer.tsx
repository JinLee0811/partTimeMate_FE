import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white hidden md:block'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-12 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start'>
          {/* Company Info */}
          <div className='space-y-2 md:space-y-4'>
            <h3 className='text-base md:text-lg font-bold'>Part-Time Mate</h3>
            <p className='text-gray-400 text-xs md:text-sm'>
              Connecting businesses with talented part-time workers in Australia.
            </p>
            <div className='flex space-x-3 md:space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaFacebook size={16} className='md:w-5 md:h-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaTwitter size={16} className='md:w-5 md:h-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaInstagram size={16} className='md:w-5 md:h-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <FaLinkedin size={16} className='md:w-5 md:h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links - 모바일에서는 숨김 */}
          <div className='hidden md:block'>
            <h3 className='text-base md:text-lg font-bold mb-2 md:mb-4'>Quick Links</h3>
            <ul className='space-y-1 md:space-y-2'>
              <li>
                <Link to='/jobs' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to='/post-job' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to='/companies' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Companies
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources - 모바일에서는 숨김 */}
          <div className='hidden md:block'>
            <h3 className='text-base md:text-lg font-bold mb-2 md:mb-4'>Resources</h3>
            <ul className='space-y-1 md:space-y-2'>
              <li>
                <Link to='/help' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/terms' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-2 md:space-y-4'>
            <h3 className='text-base md:text-lg font-bold mb-2 md:mb-4'>Contact Us</h3>
            <ul className='space-y-1 md:space-y-2 text-gray-400 text-xs md:text-sm'>
              <li>Sydney, Australia</li>
              <li>Email: info@parttimemate.com</li>
              <li className='hidden md:block'>Phone: +61 2 XXXX XXXX</li>
              <li className='hidden md:block'>Hours: Mon-Fri 9:00 AM - 5:00 PM AEST</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-3 py-2 md:px-6 md:py-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-xs md:text-sm'>
              © {currentYear} Part-Time Mate. All rights reserved.
            </p>
            <div className='flex space-x-4 md:space-x-6 mt-2 md:mt-0'>
              <Link to='/privacy' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                Privacy
              </Link>
              <Link to='/terms' className='text-gray-400 hover:text-white text-xs md:text-sm'>
                Terms
              </Link>
              <Link
                to='/cookies'
                className='text-gray-400 hover:text-white text-xs md:text-sm hidden md:block'>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
