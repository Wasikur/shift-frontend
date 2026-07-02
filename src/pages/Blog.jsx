import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    tag: 'Feature',
    title: 'Shift High Altitude: The North East Challenge',
    date: 'March 24, 2026',
    img: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&q=80&w=800',
    desc: 'Tackling the steep gradients and winding passes of the North East trails. The crew puts our custom builds to the ultimate endurance test.'
  },
  {
    tag: 'Technical',
    title: 'Carbon vs Aluminium: Which Frame Wins in 2026',
    date: 'March 12, 2026',
    img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
    desc: 'A detailed breakdown of frame aerodynamics, weight metrics, structural resilience, and cost analysis for modern performance cyclists.'
  },
  {
    tag: 'Community',
    title: 'Riding the Brahmaputra Valley Trail with the Shift Crew',
    date: 'Feb 28, 2026',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
    desc: 'Exploring local riverbed trails, meeting passionate riders, and expanding the boundaries of active cycling communities in Assam.'
  },
  {
    tag: 'Guide',
    title: 'Spring Suspension Tunings: Mechanics Checklist',
    date: 'Feb 15, 2026',
    img: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&q=80&w=800',
    desc: 'How to calibrate your front fork and rear dampers for optimal sag, rebound speed, and absolute trail traction.'
  },
  {
    tag: 'Nutrition',
    title: 'Hydration Protocols for Long-Distance Audax Riding',
    date: 'Jan 28, 2026',
    img: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&q=80&w=800',
    desc: 'Effective electrolyte management and nutritional spacing for ultra-distance races exceeding 200 kilometers.'
  },
  {
    tag: 'Product',
    title: 'Unboxing the 2026 Shift Aerodynamic Carbon Series',
    date: 'Jan 10, 2026',
    img: 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?auto=format&fit=crop&q=80&w=800',
    desc: 'An in-depth look at our newest flagship racing bike, showing fully integrated handlebars, disc brakes, and smart carbon layouts.'
  }
];

const Blog = () => {
  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Category Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span>
            The Journal
          </div>
          <h1 className="marketplace-title">Blog</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', marginTop: '1rem' }}>
            Stay updated with structural engineering updates, mechanical checklists, trail diaries, and active community rides directly from the SHIFT performance crew.
          </p>
        </div>

        <div className="marketplace-layout" style={{ marginTop: '4rem' }}>
          <div className="marketplace-main">
            <div className="grid-3 blog-posts-grid">
              {blogPosts.map((post, i) => {
                const slug = post.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');

                return (
                  <Link to={`/blog/${slug}`} key={i} className="blog-post-card" style={{ marginBottom: '2rem', display: 'block' }}>
                    <div className="blog-image-zoom-container">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="blog-post-img"
                      />
                      <div className="blog-post-tag">
                        {post.tag}
                      </div>
                    </div>

                    <h4 className="blog-post-title" style={{ fontSize: '22px', marginTop: '1rem' }}>
                      {post.title}
                    </h4>

                    <p className="text-muted" style={{ fontSize: '13px', margin: '0.75rem 0 1.25rem', lineHeight: '1.6', fontWeight: 300 }}>
                      {post.desc}
                    </p>

                    <div className="blog-post-meta">
                      <span>{post.date}</span>
                      <span className="dot-separator"></span>
                      <span className="blog-read-more">
                        Read Story <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;