import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-[#23232a] text-gray-100 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg mb-6">
              We'd love to hear from you. Reach out to us with any questions, feedback, or inquiries about our teas.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mb-8"></div>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold mb-1">Phone</h3>
                  <p className="text-gray-300">+91 123 456 7890</p>
                  <p className="text-gray-300">Monday - Saturday, 9am - 6pm IST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <p className="text-gray-300">info@royaltea.com</p>
                  <p className="text-gray-300">We aim to respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold mb-1">Address</h3>
                  <p className="text-gray-300">Tea Gardens, High Street</p>
                  <p className="text-gray-300">Mumbai 400001, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold mb-1">WhatsApp</h3>
                  <p className="text-gray-300">+91 987 654 3210</p>
                  <p className="text-gray-300">For quick inquiries and support</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-serif font-bold mb-4">Business Hours</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2 mb-2">
                  <div className="font-semibold">Monday - Friday</div>
                  <div>9:00 AM - 6:00 PM</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2 mb-2">
                  <div className="font-semibold">Saturday</div>
                  <div>10:00 AM - 4:00 PM</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold">Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-[#23232a] rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-300">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 mb-1">Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Subject*</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Order Status">Order Status</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Wholesale Inquiries">Wholesale Inquiries</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-1">Message*</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="py-16 bg-[#23232a] text-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-4">Visit Our Store</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto text-gray-300">
              Experience our teas in person at our flagship store in Mumbai. Our tea experts will be happy to guide you through our collection.
            </p>
          </div>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {/* This would typically be an embedded map, but for this example we'll use a placeholder image */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <p className="text-gray-300 font-bold">Map Embed Would Appear Here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;