import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#030303',
        padding: '80px 0 40px',
        marginTop: '100px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            marginBottom: '60px'
          }}
        >
          {/* Column 1: Brand & Tagline */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Logo size={36} />
            </div>
            <p style={{ fontSize: '0.95rem', color: '#a1a1aa', maxWidth: '300px', marginBottom: '24px' }}>
              Crafting high-impact digital experiences, minimalist user interfaces, and scalable full-stack web applications.
            </p>
            {/* Live Clock Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: '#e4e4e7'
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 8px #ffffff'
                }}
              />
              <span>{time || '12:00:00 PM UTC'}</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NavLink to="/" style={{ color: '#a1a1aa', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                Home
              </NavLink>
              <NavLink to="/projects" style={{ color: '#a1a1aa', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                Featured Projects
              </NavLink>
              <NavLink to="/about" style={{ color: '#a1a1aa', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                About & Experience
              </NavLink>
              <NavLink to="/contact" style={{ color: '#a1a1aa', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                Get In Touch
              </NavLink>
            </div>
          </div>

          {/* Column 3: Social & Contact */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
              <a
                href="https://github.com/HetKalathiya"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
                className="interactive"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/het-kalathiya-576aa5297/"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
                className="interactive"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://x.com/HetKalathiya007"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
                className="interactive"
                aria-label="Twitter"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="mailto:hetkalathiya007@gmail.com"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
                className="interactive"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#71717a' }}>
              Direct Email: hetkalathiya007@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <p style={{ fontSize: '0.85rem', color: '#71717a' }}>
            © {new Date().getFullYear()} Het Kalathiya. All rights reserved. Designed with Monochrome Precision.
          </p>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s, border-color 0.2s'
            }}
            className="interactive"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
