import React from 'react';

const RogerLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
    <path
      d="M30 70V30h40c5.523 0 10 4.477 10 10v10c0 5.523-4.477 10-10 10H45l20 20"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="50"
      cy="40"
      r="5"
      fill="currentColor"
    />
  </svg>
);

export default RogerLogo;