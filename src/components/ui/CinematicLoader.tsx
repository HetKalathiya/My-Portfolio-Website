import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

const LOADING_STEPS = [
  'Loading Assets...',
  'Loading Projects...',
  'Loading Experience...',
  'Loading Skills...',
  'Loading Contact...'
];

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [scene, setScene] = useState<number>(1);
  const [logoFilled, setLogoFilled] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [isSlidingOut, setIsSlidingOut] = useState<boolean>(false);

  // Motion value for drag slider (0px to 195px)
  const dragX = useMotionValue(0);
  const sliderFillWidth = useTransform(dragX, [0, 195], ['0%', '100%']);
  const sliderTextOpacity = useTransform(dragX, [0, 120], [1, 0]);

  // Check reduced motion & session storage
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenCinematicLoader');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // SCENE 1: Logo Draw -> Fill -> Transition to Scene 2
  useEffect(() => {
    // Logo fills at 1.8s
    const fillTimer = setTimeout(() => {
      setLogoFilled(true);
    }, 1800);

    // Transition to Scene 2 at 2.4s
    const scene2Timer = setTimeout(() => {
      setScene(2);
    }, 2400);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(scene2Timer);
    };
  }, []);

  // SCENE 2: Typing Animation & Progress Bar
  useEffect(() => {
    if (scene !== 2) return;

    const fullText = 'INITIALIZING FULL STACK PORTFOLIO...';
    let charIdx = 0;

    // Typing effect
    const typingInterval = setInterval(() => {
      if (charIdx <= fullText.length) {
        setTypedText(fullText.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typingInterval);
      }
    }, 45);

    // Progress bar 0 to 100% over 2000ms
    const startTime = Date.now();
    const duration = 2000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      // Update loading steps
      const stepIndex = Math.min(Math.floor((pct / 100) * LOADING_STEPS.length), LOADING_STEPS.length - 1);
      setCurrentStepIdx(stepIndex);

      if (stepIndex > 0) {
        setCompletedSteps((prev) => {
          const set = new Set(prev);
          for (let i = 0; i < stepIndex; i++) set.add(i);
          return Array.from(set);
        });
      }

      if (pct >= 100) {
        clearInterval(progressInterval);
        setCompletedSteps([0, 1, 2, 3, 4]);
        // Transition to Scene 3 (Slide button scene)
        setTimeout(() => setScene(3), 300);
      }
    }, 40);

    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, [scene]);

  // SCENE 3 & 4: Trigger Slide Enter Action
  const handleEnterTrigger = () => {
    if (accessGranted || isSlidingOut) return;

    setAccessGranted(true);

    setTimeout(() => {
      setIsSlidingOut(true);
    }, 400);

    setTimeout(() => {
      sessionStorage.setItem('hasSeenCinematicLoader', 'true');
      onComplete();
    }, 1200); // 400ms access granted + 800ms slide out
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#050505',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Animated Dotted Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: isSlidingOut ? 0 : 0.4,
          scale: scene === 3 ? 1.1 : 1
        }}
        transition={{ duration: 1.2, ease: EASE_APPLE }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none'
        }}
      />

      {/* Main Center Container */}
      <motion.div
        animate={{
          y: isSlidingOut ? -30 : 0,
          opacity: isSlidingOut ? 0 : 1
        }}
        transition={{ duration: 0.8, ease: EASE_APPLE }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          padding: '24px',
          textAlign: 'center'
        }}
      >
        {/* SVG Drawing HK Logo */}
        <motion.div
          style={{
            position: 'relative',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px'
          }}
        >
          {/* Soft White Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: logoFilled ? 0.6 : 0,
              scale: logoFilled ? 1.2 : 0.8
            }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            style={{
              position: 'absolute',
              inset: -10,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(12px)',
              pointerEvents: 'none'
            }}
          />

          <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
            {/* H Left Column */}
            <motion.path
              d="M6 6V26"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: EASE_APPLE, delay: 0.5 }}
            />
            {/* H Middle Bridge */}
            <motion.path
              d="M6 16H16"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: EASE_APPLE, delay: 0.9 }}
            />
            {/* Shared H/K Column */}
            <motion.path
              d="M16 6V26"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: EASE_APPLE, delay: 0.7 }}
            />
            {/* K Top Branch */}
            <motion.path
              d="M16 16L26 6"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: EASE_APPLE, delay: 1.1 }}
            />
            {/* K Bottom Branch */}
            <motion.path
              d="M16 16L26 26"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: EASE_APPLE, delay: 1.3 }}
            />

            {/* Glowing Accent Node Dots */}
            <motion.circle
              cx="26"
              cy="6"
              r="2"
              fill="#FFFFFF"
              initial={{ opacity: 0 }}
              animate={{ opacity: logoFilled ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.circle
              cx="26"
              cy="26"
              r="2"
              fill="#FFFFFF"
              initial={{ opacity: 0 }}
              animate={{ opacity: logoFilled ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_APPLE, delay: 1.2 }}
        >
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '4px'
            }}
          >
            HET KALATHIYA
          </h1>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: '#a1a1aa',
              textTransform: 'uppercase'
            }}
          >
            FULL STACK WEB DEVELOPER
          </div>
        </motion.div>

        {/* SCENE 2: Progress Bar */}
        <AnimatePresence>
          {scene === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_APPLE }}
              style={{
                marginTop: '36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Typing Header */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  color: '#e4e4e7',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                  height: '20px'
                }}
              >
                {typedText}
              </div>

              {/* Thin Loading Bar */}
              <div
                style={{
                  width: '220px',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '16px'
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    width: `${progress}%`
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Step Status Message */}
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem',
                  color: '#a1a1aa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {completedSteps.includes(currentStepIdx) ? (
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                ) : (
                  <span style={{ color: '#ffffff', opacity: 0.4 }}>•</span>
                )}
                <span>{LOADING_STEPS[currentStepIdx]}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 3: SLIDE TO ENTER BUTTON / ACCESS GRANTED */}
        <AnimatePresence>
          {scene === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.6, ease: EASE_APPLE }}
              style={{
                marginTop: '36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {!accessGranted ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  {/* Draggable Slide-to-Enter Track */}
                  <div
                    style={{
                      position: 'relative',
                      width: '260px',
                      height: '52px',
                      borderRadius: '30px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 0 25px rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={handleEnterTrigger}
                  >
                    {/* Active Drag Fill */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '30px',
                        width: sliderFillWidth,
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Background Shimmer Text */}
                    <motion.span
                      style={{
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#ffffff',
                        opacity: sliderTextOpacity,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        paddingLeft: '32px'
                      }}
                    >
                      SLIDE TO ENTER →
                    </motion.span>

                    {/* Draggable Handle */}
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: 0, right: 195 }}
                      dragElastic={0.05}
                      dragMomentum={false}
                      style={{
                        x: dragX,
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        color: '#050505',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        cursor: 'grab',
                        zIndex: 3,
                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
                      }}
                      onDrag={(_, info) => {
                        if (info.offset.x >= 160) {
                          handleEnterTrigger();
                        }
                      }}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < 160) {
                          dragX.set(0);
                        }
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                    Drag slider or click to unlock portfolio
                  </span>
                </div>
              ) : (
                /* ACCESS GRANTED CONFIRMATION */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE_APPLE }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.25em',
                    padding: '12px 28px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '25px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)'
                  }}
                >
                  ACCESS GRANTED
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reveal Curtain Slide Up */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isSlidingOut ? '-100%' : '100%' }}
        transition={{ duration: 0.85, ease: EASE_APPLE }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#050505',
          borderTop: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 -20px 50px rgba(255, 255, 255, 0.1)',
          zIndex: 9999999,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default CinematicLoader;
