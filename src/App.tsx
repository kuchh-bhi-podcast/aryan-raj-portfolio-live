/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const poolIndexRef = useRef(0);

  useEffect(() => {
    // Pre-create a small pool of audio elements to avoid cloning on every click
    const POOL_SIZE = 5;
    const pool: HTMLAudioElement[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio('https://files.catbox.moe/z2ii9w.mp3');
      audio.preload = 'auto';
      audio.volume = 0.35;
      pool.push(audio);
    }
    audioPoolRef.current = pool;

    const playClickSound = () => {
      const audio = audioPoolRef.current[poolIndexRef.current];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
      poolIndexRef.current = (poolIndexRef.current + 1) % POOL_SIZE;
    };

    window.addEventListener('click', playClickSound);

    return () => {
      window.removeEventListener('click', playClickSound);
      // Cleanup audio pool
      audioPoolRef.current.forEach((a) => {
        a.pause();
        a.src = '';
      });
      audioPoolRef.current = [];
    };
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-white">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Contact /></div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Aryan Raj. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors duration-300 interactive">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors duration-300 interactive">GitHub</a>
            <a href="#" className="hover:text-white transition-colors duration-300 interactive">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
