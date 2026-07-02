import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Image } from 'lucide-react';

// ─── Carousel slides ───────────────────────────────────────────────────────────
const CAROUSEL_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1541625602330-2277a1c4b6c3?auto=format&fit=crop&w=1920&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1920&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1476055439777-977cdf3a5699?auto=format&fit=crop&w=1920&q=80',
  },
];

const SLIDE_INTERVAL = 4500;

// Slide animation variants
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -100 : 100 }),
};

const Hero = () => {
  // Default to 'carousel' as requested
  const [mode, setMode] = useState('carousel');
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setDirection((prev) => (index > prev ? 1 : -1));
    setActiveSlide(index);
  }, []);

  // Auto-advance — restart timer whenever slide changes
  useEffect(() => {
    if (mode !== 'carousel') return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [mode, nextSlide, activeSlide]);

  return (
    <div className="hero-section">

      {/* ── Background layer: Video ── z-index 0 */}
      <AnimatePresence>
        {mode === 'video' && (
          <motion.div
            key="video-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <video
              className="hero-video"
              autoPlay muted loop playsInline preload="auto"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Background layer: Carousel images only ── z-index 0 */}
      <AnimatePresence>
        {mode === 'carousel' && (
          <motion.div
            key="carousel-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
          >
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.img
                key={activeSlide}
                src={CAROUSEL_SLIDES[activeSlide].url}
                alt={CAROUSEL_SLIDES[activeSlide].caption}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Overlay — sits above bg (z-index 1) but below controls ── */}
      <div className="hero-video-overlay" />

      {/* ── Ambient glows — z-index 2 via CSS ── */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* ── Carousel controls — pulled OUT of the bg div so they're ABOVE the overlay ── */}
      {mode === 'carousel' && (
        <>
          {/* Prev arrow */}
          <button
            onClick={prevSlide}
            className="hero-carousel-arrow hero-carousel-arrow--prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next arrow */}
          <button
            onClick={nextSlide}
            className="hero-carousel-arrow hero-carousel-arrow--next"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dot indicators */}
          <div className="hero-carousel-dots">
            {CAROUSEL_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`hero-dot ${i === activeSlide ? 'hero-dot--active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Slide caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${activeSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="hero-slide-caption"
            >
              <p className="hero-slide-caption__title">{CAROUSEL_SLIDES[activeSlide].caption}</p>
              <p className="hero-slide-caption__sub">{CAROUSEL_SLIDES[activeSlide].sub}</p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="hero-carousel-progress">
            <motion.div
              key={`prog-${activeSlide}`}
              className="hero-carousel-progress__fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
            />
          </div>
        </>
      )}

      {/* ── Content grid — z-index 2 via CSS ── */}
      <div className="container hero-grid">
        {/* Left — Content */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-eyebrow"
          >
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Shift your boundaries</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading"
          >
            Engineering <br />
            <span className="text-primary italic">Absolute</span> <br />
            Performance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-desc"
          >
            Experience the pinnacle of cycling technology. High-performance racing machines and elite gear, redefined for the bold.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hero-ctas"
          >
            <a href="/marketplace" className="btn-primary hero-btn-explorer">
              Launch Explorer <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right — Visual placeholder */}
        <div className="hero-visual">
          <div className="hero-visual-glow" />
          <span className="hero-ghost-text">Carbon</span>
        </div>
      </div>

      {/* ── Mode toggle pill ── z-index 10 */}
      <div className="hero-mode-toggle">
        <button
          onClick={() => setMode('video')}
          className={`hero-mode-btn ${mode === 'video' ? 'hero-mode-btn--active' : ''}`}
          title="Video background"
        >
          <Play size={13} />
          <span>Video</span>
        </button>
        <button
          onClick={() => setMode('carousel')}
          className={`hero-mode-btn ${mode === 'carousel' ? 'hero-mode-btn--active' : ''}`}
          title="Image carousel"
        >
          <Image size={13} />
          <span>Carousel</span>
        </button>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">Scroll to Explore</span>
        <div className="scroll-line-container">
          <motion.div
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="scroll-line-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;