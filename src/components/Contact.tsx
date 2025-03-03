
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-widest text-sm mb-3">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6">
              Let's Work Together
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              I'm currently available for new projects and collaborations. 
              If you'd like to work together, please reach out using the form below.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedSection delay={300}>
            <form className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-600">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full border-0 border-b border-gray-300 bg-transparent py-2 focus:ring-0 focus:border-gray-900 transition-colors duration-300 outline-none"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-600">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full border-0 border-b border-gray-300 bg-transparent py-2 focus:ring-0 focus:border-gray-900 transition-colors duration-300 outline-none"
                  placeholder="Your email"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-600">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full border-0 border-b border-gray-300 bg-transparent py-2 focus:ring-0 focus:border-gray-900 transition-colors duration-300 outline-none resize-none"
                  placeholder="Tell me about your project"
                />
              </div>
              
              <div className="pt-6">
                <button 
                  type="submit" 
                  className="px-8 py-3 border border-gray-900 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </AnimatedSection>
          
          <AnimatedSection delay={500}>
            <div className="h-full flex flex-col justify-center">
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-serif font-medium mb-4">Contact Details</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="font-medium w-24">Email:</span>
                      <a href="mailto:hello@example.com" className="text-gray-700 hover:text-gray-900">hello@example.com</a>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-24">Phone:</span>
                      <a href="tel:+1234567890" className="text-gray-700 hover:text-gray-900">+1 (234) 567-890</a>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-24">Based in:</span>
                      <span className="text-gray-700">New York, USA</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-medium mb-4">Follow Me</h3>
                  <div className="flex space-x-6">
                    {['Instagram', 'Dribbble', 'Behance', 'LinkedIn'].map((social) => (
                      <a 
                        key={social} 
                        href="#" 
                        className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
