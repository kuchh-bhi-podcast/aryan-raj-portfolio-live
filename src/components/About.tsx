import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Typography & Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              The <span className="text-gradient-accent">Journey.</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              <p>
                I am an enthusiastic Computer Science student driven by the desire to build 
                impactful digital experiences. My journey started with C and Java, evolving 
                into full-stack web and mobile development.
              </p>
              <p>
                I don't just write code; I craft solutions. Whether it's architecting a 
                scalable backend with Node.js and Supabase, or designing fluid interfaces 
                with React and Tailwind, I focus on the intersection of performance and aesthetics.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-4xl font-display font-bold text-white">2+</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Years Coding</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-display font-bold text-white">10+</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Floating Cards */}
          <div className="relative h-[600px] w-full hidden lg:block">
            <motion.div
              style={{ y: y1 }}
              className="absolute top-10 right-10 w-64 p-6 rounded-3xl glass-dark border-white/10 shadow-2xl z-20"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Frontend</h3>
              <p className="text-sm text-gray-400">React, TypeScript, Redux Toolkit, Tailwind CSS</p>
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-20 left-10 w-64 p-6 rounded-3xl glass-dark border-white/10 shadow-2xl z-10"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Backend</h3>
              <p className="text-sm text-gray-400">Node.js, MongoDB, Supabase, SQL</p>
            </motion.div>

            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
