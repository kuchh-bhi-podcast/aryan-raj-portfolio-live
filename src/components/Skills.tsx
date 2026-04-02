import React, { useCallback, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

const skills = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#ED8B00' },
  { name: 'C', color: '#A8B9CC' },
  { name: 'Redux', color: '#764ABC' },
  { name: 'Android', color: '#3DDC84' },
  { name: 'SQL', color: '#CC2927' },
];

interface JellyPillProps {
  key?: React.Key;
  skill: { name: string; color: string };
  idx: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function JellyPill({ skill, idx, constraintsRef }: JellyPillProps) {
  const [jellyState, setJellyState] = useState<'idle' | 'attack' | 'wobble'>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Spring-based scale for smooth jelly deformation
  const scaleX = useSpring(1, { stiffness: 600, damping: 15, mass: 0.3 });
  const scaleY = useSpring(1, { stiffness: 600, damping: 15, mass: 0.3 });
  const rotate = useSpring(0, { stiffness: 400, damping: 12, mass: 0.2 });

  const triggerJellyAttack = useCallback(() => {
    // Quick squeeze then stretch — like a jelly being poked
    scaleX.set(1.3);
    scaleY.set(0.7);
    rotate.set(Math.random() > 0.5 ? 5 : -5);

    setTimeout(() => {
      scaleX.set(0.8);
      scaleY.set(1.2);
      rotate.set(Math.random() > 0.5 ? -3 : 3);
    }, 80);

    setTimeout(() => {
      scaleX.set(1.1);
      scaleY.set(0.9);
      rotate.set(0);
    }, 160);

    setTimeout(() => {
      scaleX.set(0.95);
      scaleY.set(1.05);
    }, 240);

    setTimeout(() => {
      scaleX.set(1);
      scaleY.set(1);
    }, 320);

    setJellyState('attack');
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJellyState('idle'), 600);
  }, [scaleX, scaleY, rotate]);

  const triggerJellyWobble = useCallback(() => {
    scaleX.set(1.15);
    scaleY.set(0.85);
    rotate.set(Math.random() > 0.5 ? 4 : -4);

    setTimeout(() => {
      scaleX.set(0.9);
      scaleY.set(1.1);
      rotate.set(Math.random() > 0.5 ? -2 : 2);
    }, 100);

    setTimeout(() => {
      scaleX.set(1.05);
      scaleY.set(0.95);
      rotate.set(0);
    }, 200);

    setTimeout(() => {
      scaleX.set(1);
      scaleY.set(1);
    }, 300);

    setJellyState('wobble');
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJellyState('idle'), 700);
  }, [scaleX, scaleY, rotate]);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
      initial={{ opacity: 0, scale: 0, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: idx * 0.06,
      }}
      onHoverStart={() => {
        if (!isDragging) triggerJellyAttack();
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        triggerJellyWobble();
      }}
      onTap={() => triggerJellyAttack()}
      whileDrag={{ 
        zIndex: 50,
        filter: 'brightness(1.2)',
      }}
      style={{
        scaleX,
        scaleY,
        rotate,
      }}
      className="relative z-10 px-8 py-4 rounded-full glass border-white/20 text-lg font-medium tracking-wide text-white shadow-2xl backdrop-blur-xl interactive select-none gpu-accelerate cursor-grab active:cursor-grabbing"
    >
      <span className="relative z-10 flex items-center gap-2">
        {/* Colored dot indicator */}
        <span 
          className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 transition-shadow duration-300"
          style={{ 
            backgroundColor: skill.color,
            boxShadow: jellyState !== 'idle' ? `0 0 12px ${skill.color}80` : 'none',
          }} 
        />
        {skill.name}
      </span>
      
      {/* Inner glow on interaction */}
      <motion.div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${skill.color}20 0%, transparent 70%)`,
          opacity: jellyState !== 'idle' ? 1 : 0,
        }}
        animate={{
          opacity: jellyState !== 'idle' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow on interaction */}
      <motion.div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: `0 0 20px ${skill.color}40, inset 0 0 20px ${skill.color}10`,
          opacity: jellyState !== 'idle' ? 1 : 0,
        }}
        animate={{
          opacity: jellyState !== 'idle' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen py-32 overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Tech <span className="text-gradient-accent">Arsenal.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Hover to poke, drag to play. These jelly pills represent the tools 
            I use to build digital experiences.
          </p>
        </motion.div>

        {/* Jelly Interaction Zone */}
        <div 
          ref={constraintsRef} 
          className="relative w-full max-w-5xl mx-auto min-h-[400px] md:h-[600px] border border-white/5 rounded-3xl glass-dark overflow-hidden flex flex-wrap content-center justify-center gap-4 md:gap-5 p-6 md:p-8"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9InNtYWxsR3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMEwwIDBMMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9InVybCgjc21hbGxHcmlkKSIvPjxwYXRoIGQ9Ik00MCAwTDAgMEwwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />

          {skills.map((skill, idx) => (
            <JellyPill
              key={skill.name}
              skill={skill}
              idx={idx}
              constraintsRef={constraintsRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
