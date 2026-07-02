import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import GoogleReviews from '../components/home/GoogleReviews';
import ProductGrid from '../components/marketplace/ProductGrid';
import { ArrowRight, Shield, Zap, Truck } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 2000, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out curve for a smooth stop
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
};

// Renders a brand's logo image; if the file is missing (404) it swaps to a
// plain text wordmark so the layout never shows a broken image icon.
const BrandLogo = ({ name, logo }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="brand-name">{name}</span>;
  }

  return (
    <img
      src={logo}
      alt={`${name} logo`}
      className="brand-logo-img"
      onError={() => setFailed(true)}
    />
  );
};

const statsData = [
  { target: 1000, suffix: '+', label: 'Cycles & Accessories' },
  { target: 4.9, suffix: '★', decimals: 1, label: 'Google Rating' },
  { target: 5000, suffix: '+', label: 'Happy Customers' },
  { target: 20, suffix: '+', label: 'Trusted Brands' },
];

// Drop each brand's logo file into /src/assets/brands/ using the filename
// referenced below (e.g. shimano.png) and it renders automatically.
// Until a file exists at that path, the brand name shows as text so the
// section never looks broken.
const partnerBrands = [
  { name: 'Shimano',     logo: '/assets/brands/shimano.png' },
  { name: 'Giant',       logo: '/assets/brands/Giant-Bicycles-Logo.png' },
  { name: 'Trek',        logo: '/assets/brands/trek.png' },
  { name: 'Cannondale',  logo: '/assets/brands/cannondale.png' },
  { name: 'Scott',       logo: '/assets/brands/scott.png' },
  { name: 'Merida',      logo: '/assets/brands/merida.png' },
  { name: 'SRAM',        logo: '/assets/brands/sram.png' },
  { name: 'Garmin',      logo: '/assets/brands/garmin-logo.png' },
  { name: 'Continental', logo: '/assets/brands/continental-logo.png' },
  { name: 'Fox',         logo: '/assets/brands/fox.png' },
  { name: 'Polygon',     logo: '/assets/brands/polygon.png' },
  { name: 'Firefox',     logo: '/assets/brands/firefox.png' },
  { name: 'Magene',      logo: '/assets/brands/magene.png' },
  { name: 'Zakpro',      logo: '/assets/brands/zakpro.png' },
  { name: 'Hero',       logo: '/assets/brands/hero-cycles.png' },
  { name: 'Cateye',      logo: '/assets/brands/Cateye.png' },
  { name: 'Topeak',      logo: '/assets/brands/topeak.png' },
  { name: 'Ralson',    logo: '/assets/brands/ralson.png' },
  { name: 'Magicshine',     logo: '/assets/brands/magicshine.png' },
  { name: 'Ravemen',       logo: '/assets/brands/ravemen.png' },
];

const blogPosts = [
  {
    tag: 'Feature',
    title: 'Shift High Altitude: The North East Challenge',
    date: 'March 24, 2026',
    image: 'https://images.unsplash.com/photo-1516741209949-469839d78f00?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: 'Technical',
    title: 'Carbon vs Aluminium: Which Frame Wins in 2026',
    date: 'March 12, 2026',
    image: 'https://images.unsplash.com/photo-1516686491778-e8842063c23c?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: 'Community',
    title: 'Riding the Brahmaputra Valley Trail with the Shift Crew',
    date: 'Feb 28, 2026',
    image: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?auto=format&fit=crop&q=80&w=800',
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <Hero />

      {/* Social proof bar between hero and products */}
      <div className="stats-bar grid-4">
        {statsData.map((s, i) => (
          <div key={i} className="stats-item">
            <p className="stats-num text-primary">
              <AnimatedCounter target={s.target} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="stats-label text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <section className="section-padding bg-black relative-section">
        <div className="featured-ambient-glow"></div>
        <div className="container relative-content">
          <div className="featured-header-row fade-in">
            <div className="featured-title-block">
              <span className="uppercase-wide mb-4 inline-flex items-center gap-4">
                <span className="h-px w-8 bg-primary inline-block"></span>
                Featured Collection
              </span>
              <h2 className="section-heading">
                Explore Our <span className="text-primary italic">Collection</span>.
              </h2>
            </div>
            <div className="featured-desc-block">
              <p className="featured-desc text-muted">
                Explore our collection of bicycles, cycling accessories, safety gear,
                and genuine spare parts from trusted brands. Whether you're commuting,
                training, or riding for adventure, we've got everything you need.
              </p>
              <a href="/marketplace" className="btn-outline featured-btn-all">
                View All <ArrowRight size={13} />
              </a>
            </div>
          </div>
          <ProductGrid limit={4} />
        </div>
      </section>

      {/* USP Section */}
      <section className="usp-section bg-dark border-y-muted">
        <div className="container">
          <div className="grid-3 no-gap">
            {[
              {
                icon: <Shield size={22} />,
                accent: true,
                title: 'A Bike for Every Rider',
                body: 'From a child\'s first bicycle to premium mountain, hybrid, road, and performance bikes, our carefully curated collection offers the perfect ride for every age, every purpose, and every budget.'
              },
              {
                icon: <Zap size={22} />,
                accent: false,
                title: 'Expert Service & Support',
                body: 'Our experienced technicians provide professional servicing, repairs, precision tuning, brake adjustments, and complete maintenance, ensuring your bicycle delivers reliable performance for every ride.'
              },
              {
                icon: <Truck size={22} />,
                accent: true,
                title: 'Complete Cycling Essentials',
                body: 'From helmets and apparel to lights, locks, pumps, nutrition, genuine spare parts, and accessories, you\'ll find everything you need for a safer, more comfortable, and enjoyable cycling experience.'
              },
            ].map((usp, i) => (
              <div
                key={i}
                className="usp-card-item"
              >
                <div className={`usp-icon-container ${usp.accent ? 'usp-icon-accent' : 'usp-icon-normal'}`}>
                  {usp.icon}
                </div>
                <h3 className="usp-card-title">{usp.title}</h3>
                <p className="usp-card-body text-muted">{usp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* Partner Brands */}
      <section className="brands-section">
        <div className="container">
          <div className="brands-header">
            <span className="uppercase-wide inline-flex items-center gap-4">
              <span className="h-px w-8 bg-primary inline-block"></span>
              Our Partners
            </span>
            <h2 className="section-heading brands-heading">
              Brands We <span className="text-primary italic">Trust</span>.
            </h2>
          </div>
          <div className="brands-grid">
            {partnerBrands.map((brand, i) => (
              <div key={i} className="brand-item" title={brand.name}>
                <BrandLogo name={brand.name} logo={brand.logo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-black">
        <div className="container">
          <div className="blog-section-header">
            <span className="uppercase-wide inline-flex items-center gap-4">
              <span className="h-px w-8 bg-primary inline-block"></span>
              Journal
            </span>
            <h2 className="section-heading">
              The <span className="text-primary italic">Sprint</span> Chronicles.
            </h2>
            <p className="blog-section-desc text-muted">
              Exploring the boundaries of cycling, culture, and community in the North East.
            </p>
          </div>

          <div className="grid-3 blog-posts-grid">
            {blogPosts.map((post, i) => {
              const slug = post.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

              return (
                <Link to={`/blog/${slug}`} key={i} className="blog-post-card" style={{ display: 'block' }}>
                  <div className="blog-image-zoom-container">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-post-img"
                    />
                    <div className="blog-post-tag">
                      {post.tag}
                    </div>
                  </div>
                  <h4 className="blog-post-title">
                    {post.title}
                  </h4>
                  <div className="blog-post-meta">
                    <span>{post.date}</span>
                    <span className="dot-separator"></span>
                    <span className="blog-read-more">
                      Read Full Story <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;