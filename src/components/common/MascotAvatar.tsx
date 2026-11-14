import React, { useId } from 'react';

export const MascotAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const headClipId = `cat-head-clip-${uid}`;
  const furGradId = `cat-fur-${uid}`;
  const chinGradId = `cat-chin-${uid}`;
  const blushLeftId = `cat-blush-l-${uid}`;
  const blushRightId = `cat-blush-r-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="MeowLanguage Cat Mascot"
    >
      <defs>
        <linearGradient id={furGradId} x1="32" y1="8" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF65" />
          <stop offset="65%" stopColor="#F29E3E" />
          <stop offset="100%" stopColor="#E68A2E" />
        </linearGradient>

        <linearGradient id={chinGradId} x1="32" y1="29" x2="32" y2="57" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="72%" stopColor="#FAF5ED" />
          <stop offset="100%" stopColor="#EAE0D2" />
        </linearGradient>

        <radialGradient id={blushLeftId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FA858B" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#FA858B" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={blushRightId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FA858B" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#FA858B" stopOpacity="0" />
        </radialGradient>

        <clipPath id={headClipId}>
          <path d="M10.5 28C7 32 5.5 36.5 5.8 41.2C6.2 50.8 17.5 56.5 32 56.5C46.5 56.5 57.8 50.8 58.2 41.2C58.5 36.5 57 32 53.5 28C50.5 21.5 42.5 16 32 16C21.5 16 13.5 21.5 10.5 28Z" />
        </clipPath>
      </defs>

      {/* Left & Right Cat Ears */}
      <path
        d="M10.2 30.5L11.4 13.5C11.6 10.2 14.9 8.8 17.4 10.9L26.5 18.8Z"
        fill={`url(#${furGradId})`}
      />
      <path
        d="M53.8 30.5L52.6 13.5C52.4 10.2 49.1 8.8 46.6 10.9L37.5 18.8Z"
        fill={`url(#${furGradId})`}
      />

      {/* Soft Pink Inner Ears */}
      <path
        d="M13.5 26.8L14.2 15.6C14.3 13.8 16.2 13 17.6 14.1L23.5 19.2Z"
        fill="#F4AAB8"
      />
      <path
        d="M50.5 26.8L49.8 15.6C49.7 13.8 47.8 13 46.4 14.1L40.5 19.2Z"
        fill="#F4AAB8"
      />

      {/* Chubby Mochi Head Base */}
      <path
        d="M10.5 28C7 32 5.5 36.5 5.8 41.2C6.2 50.8 17.5 56.5 32 56.5C46.5 56.5 57.8 50.8 58.2 41.2C58.5 36.5 57 32 53.5 28C50.5 21.5 42.5 16 32 16C21.5 16 13.5 21.5 10.5 28Z"
        fill={`url(#${furGradId})`}
      />

      {/* Clipped Fur Markings & Creamy White Lower Face */}
      <g clipPath={`url(#${headClipId})`}>
        {/* White lower face with pointed peak between the eyes */}
        <path
          d="M4 39.5C11 40.5 17 39.2 21.5 36L32 28.5L42.5 36C47 39.2 53 40.5 60 39.5V59H4V39.5Z"
          fill={`url(#${chinGradId})`}
        />

        {/* Forehead Tabby Stripes */}
        <rect x="30.6" y="14.5" width="2.8" height="7.5" rx="1.4" fill="#D57D27" />
        <rect
          x="25.2"
          y="15.4"
          width="2.6"
          height="6.2"
          rx="1.3"
          transform="rotate(-10 26.5 18.5)"
          fill="#D57D27"
        />
        <rect
          x="36.2"
          y="15.4"
          width="2.6"
          height="6.2"
          rx="1.3"
          transform="rotate(10 37.5 18.5)"
          fill="#D57D27"
        />

        {/* Little Brow Dots */}
        <ellipse cx="26.2" cy="26.8" rx="1.6" ry="2.2" transform="rotate(-12 26.2 26.8)" fill="#D57D27" />
        <ellipse cx="37.8" cy="26.8" rx="1.6" ry="2.2" transform="rotate(12 37.8 26.8)" fill="#D57D27" />

        {/* Side Cheek Tabby Stripes */}
        <path
          d="M4.5 32.5L13.2 34.4C14.1 34.6 14.1 36.2 13.1 36.4L4.5 37.4Z"
          fill="#D57D27"
          opacity="0.88"
        />
        <path
          d="M4.5 39.2L11.6 39.8C12.4 39.9 12.4 41.2 11.6 41.5L4.5 42.6Z"
          fill="#D57D27"
          opacity="0.82"
        />
        <path
          d="M59.5 32.5L50.8 34.4C49.9 34.6 49.9 36.2 50.9 36.4L59.5 37.4Z"
          fill="#D57D27"
          opacity="0.88"
        />
        <path
          d="M59.5 39.2L52.4 39.8C51.6 39.9 51.6 41.2 52.4 41.5L59.5 42.6Z"
          fill="#D57D27"
          opacity="0.82"
        />

        {/* Rosy Cheek Blush */}
        <ellipse cx="14.2" cy="43.2" rx="6.2" ry="4.4" fill={`url(#${blushLeftId})`} />
        <ellipse cx="49.8" cy="43.2" rx="6.2" ry="4.4" fill={`url(#${blushRightId})`} />
      </g>

      {/* Big Round Glossy Eyes */}
      <circle cx="21.6" cy="36.2" r="5.3" fill="#321A0E" />
      <circle cx="42.4" cy="36.2" r="5.3" fill="#321A0E" />
      <circle cx="19.8" cy="34.2" r="1.65" fill="#FFFFFF" />
      <circle cx="40.6" cy="34.2" r="1.65" fill="#FFFFFF" />
      <circle cx="23.4" cy="38.2" r="0.8" fill="#FFFFFF" opacity="0.45" />
      <circle cx="44.2" cy="38.2" r="0.8" fill="#FFFFFF" opacity="0.45" />

      {/* Cute Tiny Nose */}
      <path d="M30.5 39.3C30.5 38.7 33.5 38.7 33.5 39.3L32 41.1Z" fill="#EC8F9A" />

      {/* Gentle ":3" Mouth */}
      <path
        d="M28.8 41.8C29.7 42.9 31.3 42.6 32 41.2C32.7 42.6 34.3 42.9 35.2 41.8"
        stroke="#D49585"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
