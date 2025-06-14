import React from 'react';
import { Leaf, Award, Heart, ShoppingBag } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-[#23232a] text-gray-100 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg mb-6">
              Discover the passion and philosophy behind Aura Tea.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img 
              src="https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Tea Plantation"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-3xl font-serif font-bold mb-4">The Journey Begins</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg text-gray-300 mb-4">
              Aura Tea was born from a simple desire: to share the profound beauty and rich heritage of Indian teas with the world. Our founders, passionate tea connoisseurs, embarked on a journey across India's diverse tea regions, from the misty hills of Darjeeling to the lush plains of Assam and the serene Nilgiris.
            </p>
            <p className="text-lg text-gray-300">
              We meticulously select only the finest leaves, ensuring each cup tells a story of tradition, craftsmanship, and unparalleled flavor. Our commitment extends beyond taste; we believe in sustainable practices and supporting the communities that bring these exquisite teas to life.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#23232a] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Our Philosophy</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            At Aura Tea, we believe tea is more than just a beverage; it's an experience, a ritual, and a connection to nature. Our philosophy is rooted in purity, authenticity, and respect for the environment and the people involved in every step of the tea-making process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-[#121212] p-6 rounded-lg shadow-md">
              <Leaf className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sustainable Sourcing</h3>
              <p className="text-gray-300">We partner with ethical farms that prioritize ecological balance and fair labor practices.</p>
            </div>
            <div className="bg-[#121212] p-6 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Uncompromised Quality</h3>
              <p className="text-gray-300">Every batch is rigorously tested to ensure it meets our high standards of taste and purity.</p>
            </div>
            <div className="bg-[#121212] p-6 rounded-lg shadow-md">
              <Heart className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Community & Care</h3>
              <p className="text-gray-300">We invest in the well-being of our tea growers and their families, fostering a thriving ecosystem.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Meet the Team</h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#23232a] rounded-lg shadow-md p-6">
            <img 
              src="https://via.placeholder.com/150/d4af37/000000?text=JD"
              alt="John Doe"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#D4AF37]"
            />
            <h3 className="text-xl font-bold text-gray-100">John Doe</h3>
            <p className="text-gray-300 text-sm">Founder & Master Blender</p>
            <p className="text-gray-300 mt-4">John's lifelong passion for tea led him to explore India's tea gardens, bringing his expertise to Aura Tea.</p>
          </div>
          
          <div className="bg-[#23232a] rounded-lg shadow-md p-6">
            <img 
              src="https://via.placeholder.com/150/d4af37/000000?text=JS"
              alt="Jane Smith"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#D4AF37]"
            />
            <h3 className="text-xl font-bold text-gray-100">Jane Smith</h3>
            <p className="text-gray-300 text-sm">Head of Sourcing</p>
            <p className="text-gray-300 mt-4">Jane ensures our teas are sourced ethically and sustainably, building strong relationships with growers.</p>
          </div>
          
          <div className="bg-[#23232a] rounded-lg shadow-md p-6">
            <img 
              src="https://via.placeholder.com/150/d4af37/000000?text=AM"
              alt="Alex Martin"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#D4AF37]"
            />
            <h3 className="text-xl font-bold text-gray-100">Alex Martin</h3>
            <p className="text-gray-300 text-sm">Customer Experience Lead</p>
            <p className="text-gray-300 mt-4">Alex is dedicated to ensuring every Aura Tea customer has a delightful and seamless experience.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#121212] py-16 text-center text-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">Join the Aura Tea Family</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Explore our exquisite collection of teas and embark on your own journey of flavor and aroma.
          </p>
          <a 
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
          >
            <ShoppingBag className="mr-2 w-5 h-5" /> Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;