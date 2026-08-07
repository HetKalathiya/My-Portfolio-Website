import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Copy, Check, Send, MapPin, Clock, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons';

// ─── EmailJS Configuration ──────────────────────────────────────────────────
// Values are loaded from .env (VITE_ prefix required for Vite to expose them)
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

// ─── EmailJS Template variable mapping ──────────────────────────────────────
// Your EmailJS template must use these variable names:
//   {{from_name}}    → sender's name
//   {{from_email}}   → sender's email
//   {{subject}}      → selected subject
//   {{message}}      → message body
//   {{to_name}}      → your name (auto-filled as "Het Kalathiya")

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  subject: 'Project Inquiry',
  message: ''
};

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData]   = useState<FormData>(INITIAL_FORM);
  const [copied, setCopied]       = useState(false);
  const [status, setStatus]       = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg]   = useState<string>('');

  // ── Copy email to clipboard ──────────────────────────────────────────────
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hetkalathiya007@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Form submission via EmailJS ──────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    // Check credentials are configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY ||
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      setErrorMsg(
        'EmailJS is not configured yet. Add your credentials to the .env file ' +
        '(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY).'
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      // Template params map to your EmailJS template variables
      const templateParams = {
        to_name:    'Het Kalathiya',
        from_name:  formData.name.trim(),
        from_email: formData.email.trim(),
        subject:    formData.subject,
        message:    formData.message.trim()
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData(INITIAL_FORM);
    } catch (err: unknown) {
      console.error('[EmailJS Error]', err);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(
        msg.includes('412')
          ? 'EmailJS credentials are invalid. Check your Service ID, Template ID, and Public Key.'
          : `Failed to send message. Please try again or email directly at hetkalathiya007@gmail.com.`
      );
      setStatus('error');
    }
  };

  // ── Shared input style ───────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <SectionHeader
            badge="Get In Touch"
            title="START A CONVERSATION"
            description="Available for full-time engineering roles, high-impact consulting, and custom full-stack web applications."
          />
        </div>
      </section>

      <section style={{ marginBottom: '100px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '40px'
            }}
          >
            {/* ── Left column: contact info ─────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {/* Quick Copy Email Box */}
              <div
                className="glass-panel"
                style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div style={{ fontSize: '0.85rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Direct Email Contact
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', wordBreak: 'break-all' }}>
                  hetkalathiya007@gmail.com
                </div>

                <button
                  onClick={handleCopyEmail}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    backgroundColor: copied ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginTop: '8px'
                  }}
                  className="interactive"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>
              </div>

              {/* Location & Response Time */}
              <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: 42, height: 42, borderRadius: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#71717a', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Surat, Gujarat (Open to Remote)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: 42, height: 42, borderRadius: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#71717a', textTransform: 'uppercase' }}>Response Time</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Within 12 Hours</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ fontSize: '0.85rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                  Social Platforms
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { icon: <GithubIcon size={20} />,   label: 'GitHub',   url: 'https://github.com/HetKalathiya' },
                    { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/het-kalathiya-576aa5297/' },
                    { icon: <TwitterIcon size={20} />,  label: 'Twitter',  url: 'https://x.com/HetKalathiya007' }
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'background-color 0.2s'
                      }}
                      className="interactive"
                    >
                      {soc.icon}
                      <span>{soc.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right column: contact form ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel"
              style={{ padding: '40px' }}
            >
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '8px', fontWeight: 800 }}>
                Send a Direct Message
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '32px' }}>
                Fill out the fields below to send a message directly to my inbox.
              </p>

              <AnimatePresence mode="wait">

                {/* ── SUCCESS STATE ── */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      padding: '40px 24px',
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div
                      style={{
                        width: 54, height: 54, borderRadius: '50%',
                        backgroundColor: '#ffffff', color: '#000000',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}
                    >
                      <Check size={28} />
                    </div>
                    <h4 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800, marginBottom: '8px' }}>
                      Message Sent!
                    </h4>
                    <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '24px' }}>
                      Thank you for reaching out. I'll get back to you within 12 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem'
                      }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}

                {/* ── FORM (idle + submitting + error) ── */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    noValidate
                  >
                    {/* Error Banner */}
                    {status === 'error' && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '16px',
                          backgroundColor: 'rgba(239, 68, 68, 0.12)',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          borderRadius: '12px',
                          color: '#fca5a5',
                          fontSize: '0.88rem',
                          lineHeight: '1.5'
                        }}
                      >
                        <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    {/* Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        style={inputStyle}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        style={inputStyle}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                        Inquiry Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        style={{
                          ...inputStyle,
                          backgroundColor: 'rgba(15, 15, 15, 0.95)'
                        }}
                        disabled={status === 'submitting'}
                      >
                        <option value="Project Inquiry">New Project Development</option>
                        <option value="Full-Time Hiring">Full-Time Career Opportunity</option>
                        <option value="Consulting">Architecture &amp; Code Review</option>
                        <option value="General">Other Inquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)' }}>
                          Message Details *
                        </label>
                        <span style={{ fontSize: '0.78rem', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                          {formData.message.length} chars
                        </span>
                      </div>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide details about your project scope, timeline, or requirements..."
                        style={{
                          ...inputStyle,
                          resize: 'vertical'
                        }}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: '12px' }}>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        style={{
                          width: '100%',
                          padding: '16px',
                          backgroundColor: status === 'submitting' ? 'rgba(255,255,255,0.7)' : '#ffffff',
                          color: '#050505',
                          border: 'none',
                          borderRadius: '30px',
                          fontSize: '1rem',
                          fontWeight: 700,
                          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease',
                          fontFamily: 'var(--font-body)'
                        }}
                        className="interactive"
                      >
                        {status === 'submitting' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              style={{
                                width: 18, height: 18,
                                border: '2px solid rgba(0,0,0,0.25)',
                                borderTopColor: '#050505',
                                borderRadius: '50%'
                              }}
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}

              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
