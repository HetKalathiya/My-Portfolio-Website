import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'large';
}

export const LogoMark: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <div
    style={{
      width: size,
      height: size,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}
  >
    {/* Outer Glowing Border Ring */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: size * 0.28,
        background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.15) 100%)',
        padding: '1.5px',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.25)'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#050505',
          borderRadius: size * 0.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Geometric HK Monogram SVG with visible H & K */}
        <svg
          width={size * 0.65}
          height={size * 0.65}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Letter H */}
          <path
            d="M6 8V24"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M6 16H14"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M14 8V24"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Letter K */}
          <path
            d="M19 8V24"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M19 16L26 8"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M19 16L26 24"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Glowing Accent Dots */}
          <circle cx="6" cy="8" r="1.3" fill="#FFFFFF" />
          <circle cx="6" cy="24" r="1.3" fill="#FFFFFF" />
          <circle cx="26" cy="8" r="1.3" fill="#FFFFFF" />
          <circle cx="26" cy="24" r="1.3" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  </div>
);

export const Logo: React.FC<LogoProps> = ({ size = 38, showText = true, variant = 'default' }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        userSelect: 'none'
      }}
    >
      <LogoMark size={size} />

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: variant === 'large' ? '1.8rem' : '1.25rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            HET KALATHIYA
          </span>
          <span
            style={{
              fontSize: variant === 'large' ? '0.75rem' : '0.65rem',
              fontWeight: 700,
              color: '#a1a1aa',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              marginTop: '4px'
            }}
          >
            FULL STACK DEVELOPER
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
