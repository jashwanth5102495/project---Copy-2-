import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#121212] shadow-lg' : 'bg-transparent'
      } text-gray-100`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37]">
              <span className="text-[#D4AF37]">ROYAL</span> TEA
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-[#D4AF37] transition-colors">
              Shop
            </Link>
            <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
              Contact
            </Link>
            <Link to="/track-order" className="hover:text-[#D4AF37] transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Cart and Mobile Menu Toggle */}
          <div className="flex items-center">
            <Link to="/cart" className="relative p-2 text-gray-100 hover:text-[#D4AF37] transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleMenu}
              className="ml-4 p-2 text-gray-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1f1f23] shadow-lg">
          <nav className="flex flex-col py-4">
            <Link to="/" className="px-4 py-2 text-gray-100 hover:bg-[#2a2a2e]">
              Home
            </Link>
            <Link to="/products" className="px-4 py-2 text-gray-100 hover:bg-[#2a2a2e]">
              Shop
            </Link>
            <Link to="/about" className="px-4 py-2 text-gray-100 hover:bg-[#2a2a2e]">
              About Us
            </Link>
            <Link to="/contact" className="px-4 py-2 text-gray-100 hover:bg-[#2a2a2e]">
              Contact
            </Link>
            <Link to="/track-order" className="px-4 py-2 text-gray-100 hover:bg-[#2a2a2e]">
              Track Order
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;