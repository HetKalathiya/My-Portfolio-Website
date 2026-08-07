import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../ui/Logo';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' }
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: isScrolled ? '12px 0' : '24px 0',
        transition: 'padding var(--transition-normal)'
      }}
    >
      <div className="container">
        <nav
          className="glass-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(15, 15, 15, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.8)' : 'none'
          }}
        >
          {/* Brand Logo */}
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </NavLink>

          {/* Desktop Nav Items */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px'
            }}
            className="desktop-nav"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 6px',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={{
                      position: 'relative',
                      padding: '8px 16px',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: isActive ? '#ffffff' : '#a1a1aa',
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          borderRadius: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Quick Status Pill */}
            <NavLink
              to="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#ffffff',
                color: '#050505',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'transform var(--transition-fast), background-color var(--transition-fast)'
              }}
              className="interactive"
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
              />
              <span>Available</span>
              <ArrowUpRight size={16} />
            </NavLink>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '8px',
              display: 'none'
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '16px',
              right: '16px',
              backgroundColor: 'rgba(12, 12, 12, 0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 99
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: location.pathname === item.path ? '#ffffff' : '#a1a1aa',
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                backgroundColor: '#ffffff',
                color: '#050505',
                borderRadius: '12px',
                fontWeight: 700,
                marginTop: '8px'
              }}
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={18} />
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 868px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
