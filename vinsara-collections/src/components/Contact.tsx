import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Customer Care Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4 text-black mt-5 tracking-wide">
            CUSTOMER CARE
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-700 mb-4">
          We’re here to help! If you have questions about your order, size exchanges, or anything related to Vinsaraa, feel free to reach out.   </p>
          <div className="space-y-2 text-base font-light text-gray-700">
            <p>E-mail - customercare.vinsaraa@gmail.com</p>
            <p>Our team usually replies within 24-48 hours.</p>
            <p>Your experience matters to us!</p>
          </div>
        </div>

        {/* Corporate Office Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 text-gray-900">
            Office:
          </h2>
          
          <div className="space-y-1 text-base font-light text-gray-700">
            <p>Vinsaraa, Andhrapradesh</p>
            <p>India</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mb-12">
          <p className="text-center text-lg md:text-xl font-light text-gray-700 mb-12 leading-relaxed">
            Have A Question About An Order, Or About Getting In Touch? We're Always Happy To Hear From You.
          </p>

          <div className="space-y-8">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-light text-gray-700 mb-2 tracking-widest">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-light text-gray-700 mb-2 tracking-widest">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-xs font-light text-gray-700 mb-2 tracking-widest">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-[#440504] hover:bg-[#91959c] text-white font-light px-12 py-3 tracking-widest transition-colors duration-200"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}