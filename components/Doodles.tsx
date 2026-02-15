import React from 'react';

export const FrustratedPerson = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full doodle-style" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 150 Q75 120 100 150 T150 150" stroke="#94A3B8" />
    <circle cx="100" cy="80" r="30" fill="white" />
    <path d="M85 75 Q90 70 95 75" />
    <path d="M105 75 Q110 70 115 75" />
    <path d="M90 100 Q100 90 110 100" />
    <path d="M100 110 L100 160" />
    <path d="M100 130 L70 140" />
    <path d="M100 130 L130 140" />
    <path d="M100 160 L80 190" />
    <path d="M100 160 L120 190" />
    <path d="M40 80 L30 70 M160 80 L170 70" stroke="#E2E8F0" />
    <text x="50" y="40" fontSize="10" fill="#94A3B8" fontWeight="bold" stroke="none" font-family="Inter, system-ui, sans-serif">Waiting forever...</text>
  </svg>
);

export const HappyScanner = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full doodle-style" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="100" cy="80" r="30" fill="white" />
    <circle cx="90" cy="75" r="2" fill="currentColor" />
    <circle cx="110" cy="75" r="2" fill="currentColor" />
    <path d="M85 95 Q100 110 115 95" stroke="#1E3A8A" strokeWidth="3" />
    <path d="M85 80 Q90 75 95 80" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M105 80 Q110 75 115 80" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M100 110 L100 160" />
    <path d="M100 130 L70 110" />
    <path d="M100 130 L130 110" />
    <path d="M100 160 L80 190" />
    <path d="M100 160 L120 190" />
    <rect x="130" y="90" width="30" height="50" rx="4" fill="white" stroke="#1E3A8A" />
    <path d="M135 105 L155 105 M135 115 L155 115 M135 125 L155 125" stroke="#B6E3F4" strokeWidth="4" />
    <path d="M165 80 L180 60" stroke="#FBBF24" strokeWidth="2" />
    <text x="140" y="40" fontSize="10" fill="#FFFF" fontWeight="bold" stroke="none" font-family="Inter, system-ui, sans-serif">Scan & Go!</text>
  </svg>
);

export const FloatingItem = ({ type }: { type: 'milk' | 'shirt' | 'qr' }) => {
  if (type === 'milk') return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40">
      <path d="M30 40 L70 40 L75 90 L25 90 Z" fill="#B6E3F4" stroke="#1E3A8A" strokeWidth="2" />
      <path d="M30 40 L50 20 L70 40" fill="white" stroke="#1E3A8A" strokeWidth="2" />
      <text x="40" y="70" fontSize="12" fill="#1E3A8A">MILK</text>
    </svg>
  );
  if (type === 'shirt') return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40">
      <path d="M20 30 L40 20 L60 20 L80 30 L80 50 L70 50 L70 90 L30 90 L30 50 L20 50 Z" fill="#E0F2FE" stroke="#1E3A8A" strokeWidth="2" />
      <path d="M40 20 Q50 30 60 20" stroke="#1E3A8A" fill="none" />
    </svg>
  );
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40">
      <rect x="25" y="25" width="50" height="50" rx="4" fill="white" stroke="#1E3A8A" strokeWidth="2" />
      <rect x="35" y="35" width="10" height="10" fill="#1E3A8A" />
      <rect x="55" y="35" width="10" height="10" fill="#1E3A8A" />
      <rect x="35" y="55" width="10" height="10" fill="#1E3A8A" />
      <path d="M55 55 L65 55 L65 65 L55 65 Z" fill="#1E3A8A" />
    </svg>
  );
};
