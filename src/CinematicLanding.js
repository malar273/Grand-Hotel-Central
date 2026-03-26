import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Camera } from 'lucide-react';
import './CinematicLanding.css';

const CinematicLanding = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Fade up animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="cinematic-wrapper" ref={containerRef}>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.img
          style={{ y: y1 }}
          className="hero-bg"
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2940&auto=format&fit=crop"
          alt="Cinematic Landscape"
        />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="hero-title">Aesthetica</h1>
            <p className="hero-subtitle">Digital Experiences for the Modern Era</p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="intro-text">
            We craft digital landscapes that blur the line between utility and art.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
            Minimalist. Functional. Timeless.
          </motion.p>
        </motion.div>
      </section>

      {/* Selected Work Section */}
      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '2rem' }}>Selected Work</h3>
          <span style={{ fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>2023 — 2024</span>
        </div>

        <div className="card-grid">
          {[
            { title: "Lumina", cat: "Brand Identity", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2787&auto=format&fit=crop" },
            { title: "Vanguard", cat: "Web Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2800&auto=format&fit=crop" },
            { title: "Serenity", cat: "Art Direction", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2787&auto=format&fit=crop" },
            { title: "Echo", cat: "Development", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop" },
          ].map((item, index) => (
            <motion.div
              className="card"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div style={{ overflow: 'hidden', height: '80%' }}>
                <img src={item.img} alt={item.title} className="card-image" />
              </div>
              <div className="card-info">
                <h4 className="card-title">{item.title}</h4>
                <div className="card-cat">{item.cat}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Image Section */}
      <section className="section" style={{ padding: '0' }}>
        <div style={{ height: '80vh', overflow: 'hidden', position: 'relative' }}>
          <motion.img
            style={{
              y: y2,
              width: '100%',
              height: '115%', // taller to allow parallax movement
              objectFit: 'cover',
              position: 'absolute',
              top: '-15%'
            }}
            src="https://images.unsplash.com/photo-1481487484168-9b995ecc1679?q=80&w=2620&auto=format&fit=crop"
            alt="Full width"
          />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '5vw',
            color: 'white',
            mixBlendMode: 'difference'
          }}>
            <h2 style={{ fontSize: '5vw' }}>Silence is Luxury</h2>
          </div>
        </div>
      </section>

      {/* Spa & Massage Section */}
      <section className="spa-section container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1 }}
        >
          <div className="spa-header">
            <h2 className="spa-title">SPA & MASSAGE</h2>
          </div>

          <div className="spa-grid">
            <div className="spa-info">
              <div className="spa-text-block">
                <h3 className="spa-subtitle">WELLBEING</h3>
                <p className="spa-desc">
                  Our hotel spa in Barcelona offers a thermal area, massages and a wide catalogue of wellness treatments by Natura Bissé. Choose between a dry sauna, with minimum humidity and comfortable heat, or the Hamman's high temperatures and 95% humidity.
                </p>
              </div>

              <div className="spa-text-block">
                <h3 className="spa-subtitle">OPENING HOURS</h3>
                <p className="spa-desc">
                  From 12pm to 8pm<br />
                  Outside these hours, reservation required for treatments and Wellbeing
                </p>
              </div>
            </div>

            <div className="spa-image-container">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2940&auto=format&fit=crop"
                alt="Spa Treatment"
                className="spa-image"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer container">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Let's Create Together</h2>
        <nav className="footer-nav">
          <a href="#" className="footer-link">Instagram</a>
          <a href="#" className="footer-link">Twitter</a>
          <a href="#" className="footer-link">LinkedIn</a>
          <a href="#" className="footer-link">Email</a>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          <span>© 2024 Aesthetica Agency</span>
          <span>Designed with Purpose</span>
        </div>
      </footer>
    </div>
  );
};

export default CinematicLanding;
