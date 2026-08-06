import React from 'react';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white text-center border-t border-[#E4E3DE] text-xs font-mono text-[#6B6D76]">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>PropPulse Rental Operations System © 2026</span>
        <span>Quiet Confidence Design System</span>
      </Container>
    </footer>
  );
};
