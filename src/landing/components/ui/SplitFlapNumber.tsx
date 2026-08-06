import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = '0123456789₹,.%/ '.split('');

function FlapDigit({ target, delay }: { target: string; delay: number }) {
  const [current, setCurrent] = useState(' ');

  useEffect(() => {
    const targetIndex = CHARS.indexOf(target);
    if (targetIndex === -1) { 
      setCurrent(target); 
      return; 
    }

    let frame = 0;
    const totalFrames = 10 + Math.floor(Math.random() * 6);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const idx = frame >= totalFrames
          ? targetIndex
          : Math.floor(Math.random() * CHARS.length);
        setCurrent(CHARS[idx]);
        if (frame >= totalFrames) clearInterval(interval);
      }, 45 + frame * 4);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <span className="relative inline-block w-[0.62em] text-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={current}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="block"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function SplitFlapNumber({ value, className = '' }: { value: string; className?: string }) {
  return (
    <span className={`font-mono tabular-nums inline-flex ${className}`}>
      {value.split('').map((char, i) => (
        <FlapDigit key={i} target={char} delay={i * 60} />
      ))}
    </span>
  );
}
