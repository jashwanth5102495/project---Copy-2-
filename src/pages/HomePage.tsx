import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Truck, Leaf, Shield, Star, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroElement = heroRef.current;
        const opacity = 1 - Math.min(scrollY / 500, 0.7);
        heroElement.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#18181b] text-gray-100">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1030941/pexels-photo-1030941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-4 animate-fade-in-down">
            Experience the Aura of Fine Indian Tea
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
            Discover handcrafted blends for every moment.
          </p>
          <a 
            href="/products"
            className="inline-block px-8 py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-full shadow-lg hover:bg-[#c4a030] transition-colors duration-300 transform hover:scale-105 animate-zoom-in"
          >
            Shop Our Collection
          </a>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img 
              src="https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="About Aura Tea"
              className="rounded-lg shadow-lg w-full h-auto object-cover border border-gray-700"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg text-gray-300 mb-4">
              Aura Tea was founded with a passion for bringing the authentic taste of India's finest teas to your cup. We meticulously source our leaves from sustainable gardens across Darjeeling, Assam, and Nilgiri, ensuring purity and exceptional flavor in every blend.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Our commitment extends beyond taste; we believe in fostering fair practices and supporting the communities that cultivate these remarkable teas. Join us on a journey to explore the rich heritage and diverse aromas of Indian tea.
            </p>
            <a 
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
            >
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-[#23232a] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Our Featured Teas</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Replace with actual ProductCard components once data is integrated */}
            <div className="bg-[#121212] rounded-lg shadow-md overflow-hidden text-left border border-gray-700">
              <img 
                src="https://images.pexels.com/photos/9786013/pexels-photo-9786013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Product 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-100">Darjeeling First Flush</h3>
                <p className="text-gray-300 text-sm mb-2">Delicate & Aromatic</p>
                <p className="font-bold text-[#D4AF37]">₹999.00</p>
                <button className="mt-4 w-full bg-[#D4AF37] text-black font-bold py-2 rounded-md hover:bg-[#c4a030] transition-colors">
                  View Product
                </button>
              </div>
            </div>
            <div className="bg-[#121212] rounded-lg shadow-md overflow-hidden text-left border border-gray-700">
              <img 
                src="https://images.pexels.com/photos/9786025/pexels-photo-9786025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Product 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-100">Assam Black Tea</h3>
                <p className="text-gray-300 text-sm mb-2">Bold & Malty</p>
                <p className="font-bold text-[#D4AF37]">₹799.00</p>
                <button className="mt-4 w-full bg-[#D4AF37] text-black font-bold py-2 rounded-md hover:bg-[#c4a030] transition-colors">
                  View Product
                </button>
              </div>
            </div>
            <div className="bg-[#121212] rounded-lg shadow-md overflow-hidden text-left border border-gray-700">
              <img 
                src="https://images.pexels.com/photos/1036069/pexels-photo-1036069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Product 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-100">Nilgiri Green Tea</h3>
                <p className="text-gray-300 text-sm mb-2">Fresh & Grassy</p>
                <p className="font-bold text-[#D4AF37]">₹649.00</p>
                <button className="mt-4 w-full bg-[#D4AF37] text-black font-bold py-2 rounded-md hover:bg-[#c4a030] transition-colors">
                  View Product
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a 
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
            >
              View All Teas <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-serif font-bold mb-4 text-center">What Our Customers Say</h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#23232a] p-6 rounded-lg shadow-md border border-gray-700">
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <p className="text-gray-300 italic mb-4">"Aura Tea has transformed my morning ritual. The Darjeeling First Flush is simply exquisite!"</p>
            <p className="font-bold text-gray-100">- Anjali S.</p>
          </div>
          <div className="bg-[#23232a] p-6 rounded-lg shadow-md border border-gray-700">
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <p className="text-gray-300 italic mb-4">"The Assam Black Tea is my go-to for a strong, refreshing cup. Excellent quality!"</p>
            <p className="font-bold text-gray-100">- Rahul K.</p>
          </div>
          <div className="bg-[#23232a] p-6 rounded-lg shadow-md border border-gray-700">
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <Star className="w-5 h-5 text-yellow-500 mb-2" />
            <p className="text-gray-300 italic mb-4">"I appreciate Aura Tea's commitment to sustainability. And the teas are delicious!"</p>
            <p className="font-bold text-gray-100">- Priya M.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#121212] py-16 text-center text-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Discover Your Aura?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Browse our full collection of premium Indian teas and find your perfect brew.
          </p>
          <a 
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full shadow-lg hover:bg-[#c4a030] transition-colors"
          >
            <ShoppingBag className="mr-2 w-5 h-5" /> Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;