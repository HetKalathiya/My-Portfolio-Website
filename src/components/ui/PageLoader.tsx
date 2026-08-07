import React, { useState, useEffect, useRef } from 'react';
import './PageLoader.css';
import { LogoMark } from './Logo';

export interface PageLoaderProps {
  onLoadComplete?: () => void;
  subtitleText?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  onLoadComplete,
  subtitleText = 'HET KALATHIYA'
}) => {
  const [showLoadingBar, setShowLoadingBar] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showEnterButton, setShowEnterButton] = useState<boolean>(false);
  const [slideOut, setSlideOut] = useState<boolean>(false);

  const progressIntervalRef = useRef<number | null>(null);

  // Stage 1 & 2: Show loading bar after 1s, then increment progress
  useEffect(() => {
    const barTimer = window.setTimeout(() => {
      setShowLoadingBar(true);

      // Smooth random progress increments
      progressIntervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return 100;
          }
          // Random increment between 15% and 35%
          const increment = Math.floor(Math.random() * 20) + 15;
          const next = prev + increment;
          return next >= 100 ? 100 : next;
        });
      }, 300);
    }, 1000);

    return () => {
      clearTimeout(barTimer);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Stage 3: Show Enter button when progress hits 100%
  useEffect(() => {
    if (progress === 100) {
      const buttonTimer = window.setTimeout(() => {
        setShowEnterButton(true);
      }, 300);
      return () => clearTimeout(buttonTimer);
    }
  }, [progress]);

  // Stage 4: On click handle slide out and callback
  const handleEnter = () => {
    setSlideOut(true);
    window.setTimeout(() => {
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 800);
  };

  return (
    <div className={`loader-overlay ${slideOut ? 'slide-out' : ''}`}>
      {/* Logo Section */}
      <div className="loader-logo-wrapper">
        <div className="loader-logo-glow" />
        <LogoMark size={76} />
        <div className="loader-logo-subtitle">{subtitleText}</div>
      </div>

      {/* Loading Bar Section */}
      {!showEnterButton && (
        <div className={`loader-loading-section ${showLoadingBar ? 'visible' : ''}`}>
          <div className="loader-bar-container">
            <div
              className="loader-bar-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loader-text">Loading your experience ({progress}%)...</span>
        </div>
      )}

      {/* Enter Button Section */}
      <div className={`loader-enter-section ${showEnterButton ? 'visible' : ''}`}>
        {showEnterButton && (
          <button
            onClick={handleEnter}
            className="loader-enter-btn"
            aria-label="Enter Portfolio Website"
          >
            <span>Enter</span>
            <svg
              className="loader-arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PageLoader;
