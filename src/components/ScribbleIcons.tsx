import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PropPulseLogo: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    width={size || 32}
    height={size || 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Architectural Building Structure */}
    <path
      d="M5 28V9C5 7.89543 5.89543 7 7 7H25C26.1046 7 27 7.89543 27 9V28"
      stroke="#003087"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M12 7V4C12 3.44772 12.4477 3 13 3H19C19.5523 3 20 3.44772 20 4V7"
      stroke="#003087"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    {/* Windows grid */}
    <rect x="9" y="11" width="3" height="3" rx="0.8" fill="#003087" opacity="0.85" />
    <rect x="20" y="11" width="3" height="3" rx="0.8" fill="#003087" opacity="0.85" />
    <rect x="9" y="16" width="3" height="3" rx="0.8" fill="#003087" opacity="0.85" />
    <rect x="20" y="16" width="3" height="3" rx="0.8" fill="#003087" opacity="0.85" />

    {/* Pulse Telemetry Wave - Bright Cerulean Blue */}
    <path
      d="M2 22H9L11.5 17L15.5 27L19.5 19L22 22H30"
      stroke="#009cde"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ScribbleBuilding: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 21V5c0-1 1-2 2-2h12c1 0 2 1 2 2v16M3 21h18" />
    <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" strokeDasharray="0.5 1.5" />
    <path d="M10 21v-3c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v3" />
  </svg>
);

export const ScribbleMoney: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
    <circle cx="12" cy="12" r="3" strokeDasharray="1 1" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

export const ScribbleComplaint: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
    <path d="M12 8v4M12 16h.01" strokeWidth="3" />
  </svg>
);

export const ScribbleChart: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3v18h18" />
    <path d="M7 16l4-8 4 5 5-9" />
    <circle cx="20" cy="4" r="1.5" fill="currentColor" />
  </svg>
);

export const ScribbleQR: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="3" width="6" height="6" rx="1.5" />
    <rect x="3" y="15" width="6" height="6" rx="1.5" />
    <path d="M15 15h3v3h-3zM18 18h3v3h-3zM15 18h.01M18 15h.01" />
  </svg>
);

export const ScribbleSparkle: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
  </svg>
);

export const ScribbleSync: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.5 2v6h-6M2.5 22v-6h6" />
    <path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16" />
  </svg>
);

export const ScribbleBell: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const ScribblePlus: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ScribbleSearch: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeWidth="3" />
  </svg>
);

export const ScribbleWallet: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
  </svg>
);

export const ScribbleClock: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" strokeWidth="2.5" />
  </svg>
);

export const ScribbleCheck: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const ScribbleAlert: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4M12 17h.01" strokeWidth="3" />
  </svg>
);

export const ScribbleHome: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

export const ScribbleUsers: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const ScribblePie: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

export const ScribbleShield: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const ScribbleMessage: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const ScribbleChevron: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);
