import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Twitter, Linkedin, MapPin, Phone, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing! You'll receive a 10% discount code at ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#121212] text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-4">AURA TEA</h3>
          <p className="mb-4">Experience the authentic taste of India's finest teas, sustainably sourced and lovingly handcrafted.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
            <li><a href="/products" className="hover:text-[#D4AF37] transition-colors">Shop Teas</a></li>
            <li><a href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</a></li>
            <li><a href="/track-order" className="hover:text-[#D4AF37] transition-colors">Track Order</a></li>
            <li><a href="/admin" className="hover:text-[#D4AF37] transition-colors">Admin Login</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-4">Contact Info</h3>
          <p className="mb-2 flex items-center"><MapPin className="w-5 h-5 mr-2 text-[#D4AF37]" /> Tea Gardens, Mumbai 400001, India</p>
          <p className="mb-2 flex items-center"><Phone className="w-5 h-5 mr-2 text-[#D4AF37]" /> +91 123 456 7890</p>
          <p className="mb-2 flex items-center"><Mail className="w-5 h-5 mr-2 text-[#D4AF37]" /> info@aura.com</p>
          <p className="flex items-center"><Clock className="w-5 h-5 mr-2 text-[#D4AF37]" /> Mon - Sat: 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Aura Tea. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;