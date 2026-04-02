import React, { useState } from 'react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section className="relative min-h-screen py-32 overflow-hidden flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-glow/20 rounded-full blur-[120px] pointer-events-none gpu-accelerate" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Let's <span className="text-gradient-accent">Talk.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Got a project in mind? Or just want to say hi? 
            Drop me a message and let's build something extraordinary.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-dark p-8 md:p-12 rounded-[2rem] border-white/10 shadow-2xl relative overflow-hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
            {/* Name Field */}
            <div className="group relative">
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <label
                htmlFor="name"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  formData.name
                    ? '-top-4 text-xs text-accent'
                    : 'top-4 text-base text-gray-500'
                }`}
                style={{
                  transform: formData.name ? 'translateY(0)' : undefined,
                }}
              >
                What's your name?
              </label>
            </div>

            {/* Email Field */}
            <div className="group relative">
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <label
                htmlFor="email"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  formData.email
                    ? '-top-4 text-xs text-accent'
                    : 'top-4 text-base text-gray-500'
                }`}
              >
                Your email address
              </label>
            </div>
          </div>

          {/* Message Field */}
          <div className="group relative mb-12 z-10">
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
            />
            <label
              htmlFor="message"
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                formData.message
                  ? '-top-4 text-xs text-accent'
                  : 'top-4 text-base text-gray-500'
              }`}
            >
              Tell me about your project
            </label>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-gray-400 text-sm space-y-1">
              <p>aryan.23cse360@citranchi.ac.in</p>
              <p>+91-8409561879</p>
            </div>
            
            <MagneticButton type="submit" className="w-full md:w-auto bg-white text-black hover:bg-gray-200">
              Send Message
            </MagneticButton>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
