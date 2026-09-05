import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PropPulseLogo: React.FC<IconProps & { isDarkBg?: boolean }> = ({ 
  className = "w-8 h-8", 
  size,
  isDarkBg = false 
}) => (
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
      stroke={isDarkBg ? "#FFFFFF" : "#003087"}
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M12 7V4C12 3.44772 12.4477 3 13 3H19C19.5523 3 20 3.44772 20 4V7"
      stroke={isDarkBg ? "#FFFFFF" : "#003087"}
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    {/* Windows grid */}
    <rect x="9" y="11" width="3" height="3" rx="0.8" fill={isDarkBg ? "#7DD3FC" : "#003087"} opacity={isDarkBg ? 0.95 : 0.85} />
    <rect x="20" y="11" width="3" height="3" rx="0.8" fill={isDarkBg ? "#7DD3FC" : "#003087"} opacity={isDarkBg ? 0.95 : 0.85} />
    <rect x="9" y="16" width="3" height="3" rx="0.8" fill={isDarkBg ? "#7DD3FC" : "#003087"} opacity={isDarkBg ? 0.95 : 0.85} />
    <rect x="20" y="16" width="3" height="3" rx="0.8" fill={isDarkBg ? "#7DD3FC" : "#003087"} opacity={isDarkBg ? 0.95 : 0.85} />

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

/* ==========================================================================
   Bespoke Hand-Drawn Sketch Character Illustrations for Each Page
   - Style: Minimal, organic, scribbled character art
   - Scalable, compact, dual-tone (#009cde accents + currentColor stroke)
   ========================================================================== */

/** 1. Properties & Units Character: Cute architect with blueprint & building sketch */
export const ScribblePropertyIllustration: React.FC<IconProps> = ({ className = "w-9 h-9", size }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sketch Building Backdrop */}
    <path d="M6 42V14C6 12.8 7 12 8.2 12H24V42" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 6H38C39.2 6 40.2 7 40.2 8.2V42" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 42H44" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    {/* Scribbled windows */}
    <rect x="11" y="17" width="4" height="4" rx="1" stroke="#009cde" strokeWidth="2" />
    <rect x="11" y="25" width="4" height="4" rx="1" stroke="#009cde" strokeWidth="2" />
    <rect x="29" y="12" width="5" height="5" rx="1" stroke="#009cde" strokeWidth="2" />
    <rect x="29" y="21" width="5" height="5" rx="1" stroke="#009cde" strokeWidth="2" />
    {/* Cute Scribbled Inspector Character */}
    <circle cx="34" cy="34" r="5" stroke="currentColor" strokeWidth="2.4" />
    <path d="M32 33.5C32.5 33 33.5 33 34 33.5M36 33.5C36.5 33 37.5 33 38 33.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M33 36C34 37 35.5 37 36.5 36" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    {/* Little Hard Hat */}
    <path d="M29 32C29.5 28 38.5 28 39 32H29Z" fill="#009cde" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Blueprint Scroll in hand */}
    <path d="M25 38L21 41M21 41L23 37M21 41H27" stroke="#009cde" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** 2. Complaints & Tickets Character: Friendly repair droid / fixer with wrench */
export const ScribbleTicketIllustration: React.FC<IconProps> = ({ className = "w-9 h-9", size }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Chat Bubble Base */}
    <path d="M8 10C8 7.8 9.8 6 12 6H36C38.2 6 40 7.8 40 10V28C40 30.2 38.2 32 36 32H20L12 38V32H12C9.8 32 8 30.2 8 28V10Z" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    {/* Scribbled Fixer Character Head inside bubble */}
    <circle cx="21" cy="18" r="6" stroke="currentColor" strokeWidth="2.4" />
    <path d="M19 17C19.5 16.5 20.5 16.5 21 17M23 17C23.5 16.5 24.5 16.5 25 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 20.5C21 21.5 22.5 21.5 23.5 20.5" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    {/* Antenna sparkle */}
    <path d="M21 12V9M21 9L23 7M21 9L19 7" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    {/* Hand-drawn Wrench Tool */}
    <path d="M30 14L35 19M34 13L32 15M36 17L38 19" stroke="#009cde" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    {/* Resolution checkmark spark */}
    <path d="M30 26L32.5 28.5L37 23" stroke="#009cde" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 3. Financials & Accounting Character: Little ledger & coin wealth character */
export const ScribbleFinanceIllustration: React.FC<IconProps> = ({ className = "w-9 h-9", size }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Ledger Book */}
    <rect x="7" y="10" width="22" height="30" rx="3" stroke="currentColor" strokeWidth="2.6" />
    <path d="M12 17H23M12 23H23M12 29H18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M7 14H29" stroke="#009cde" strokeWidth="2" />
    {/* Cute Scribbled Coin Stack Character */}
    <ellipse cx="36" cy="36" rx="7" ry="3.5" stroke="currentColor" strokeWidth="2.4" />
    <ellipse cx="36" cy="30" rx="7" ry="3.5" stroke="currentColor" strokeWidth="2.4" />
    <ellipse cx="36" cy="24" rx="7" ry="3.5" stroke="currentColor" strokeWidth="2.4" />
    {/* Face on top coin */}
    <path d="M33 23C33.5 22.5 34.2 22.5 34.7 23M37 23C37.5 22.5 38.2 22.5 38.7 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M34.5 25.5C35.5 26.5 36.8 26.5 37.8 25.5" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" />
    {/* Sparkle Growth Arrow */}
    <path d="M26 12L34 5M34 5H29M34 5V10" stroke="#009cde" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M41 12L43 14M43 12L41 14" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** 4. Tenant Portal Character: Cozy resident with key and home coffee */
export const ScribbleTenantIllustration: React.FC<IconProps> = ({ className = "w-9 h-9", size }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Cottage Roof Outline */}
    <path d="M6 22L24 7L42 22" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 20V40C11 41.1 11.9 42 13 42H35C36.1 42 37 41.1 37 40V20" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    {/* Cozy Resident Character */}
    <circle cx="24" cy="27" r="5.5" stroke="currentColor" strokeWidth="2.4" />
    <path d="M22 26C22.4 25.5 23 25.5 23.4 26M25 26C25.4 25.5 26 25.5 26.4 26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M23 29C23.8 30 24.8 30 25.5 29" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" />
    {/* Digital Key */}
    <circle cx="16" cy="35" r="2.5" stroke="#009cde" strokeWidth="2" />
    <path d="M18.5 35H23M21 35V37" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
    {/* Chimney smoke curl */}
    <path d="M34 13V10H31V15M33 7C34 5.5 33 4 35 3" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** 5. Settings & Config Character: Quirky wrench & switch character */
export const ScribbleSettingsIllustration: React.FC<IconProps> = ({ className = "w-9 h-9", size }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Gear Character */}
    <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.6" />
    <circle cx="24" cy="24" r="4.5" stroke="#009cde" strokeWidth="2" />
    {/* Gear teeth */}
    <path d="M24 10V6M24 42V38M10 24H6M42 24H38M14 14L11 11M37 37L34 34M14 34L11 37M37 11L34 14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    {/* Friendly Eyes on Gear */}
    <path d="M22 22C22.3 21.5 22.8 21.5 23.1 22M25 22C25.3 21.5 25.8 21.5 26.1 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M23 25C23.6 25.8 24.4 25.8 25 25" stroke="#009cde" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** 6. Help Center Character: Friendly rescue bot with lifebuoy */
export const ScribbleHelpIllustration: React.FC<IconProps> = ({ className = "w-9 h-9", size }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Lifebuoy Ring */}
    <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2.6" />
    <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2.4" />
    <path d="M19 14L15 19M29 14L33 19M19 34L15 29M29 34L33 29" stroke="#009cde" strokeWidth="2.6" strokeLinecap="round" />
    {/* Friendly Face inside center */}
    <path d="M22 22C22.4 21.6 22.8 21.6 23.2 22M25 22C25.4 21.6 25.8 21.6 26.2 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M23 25C23.8 26 24.8 26 25.5 25" stroke="#009cde" strokeWidth="1.8" strokeLinecap="round" />
    {/* Sparkles */}
    <path d="M38 10L41 7M41 10L38 7" stroke="#009cde" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
