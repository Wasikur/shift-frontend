import React from 'react';
import { Shield, Zap, Target, ArrowRight } from 'lucide-react';
import shiftCrewRide from '../assets/about-us/shift-crew-ride.png';

const About = () => {
  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Our Legacy
          </div>
          <h1 className="marketplace-title">About Us</h1>
          <p
            className="featured-desc text-muted"
            style={{
              maxWidth: "650px",
              marginTop: "1rem",
            }}
          >
            At Shift Bicycle Store, we believe every rider deserves the best experience,
            regardless of their budget. From affordable everyday bicycles to
            high-performance mountain and road bikes, we offer a wide range of cycles,
            genuine accessories, and expert servicing—all backed by exceptional customer
            care and a passion for cycling.
          </p>
        </div>

        {/* Content Layout */}
        <div className="marketplace-layout" style={{ marginTop: '5rem', flexDirection: 'column', gap: '5rem' }}>
          {/* Main Story split grid */}
          <div className="about-story-grid">
            <div>
              <h2
                className="section-heading"
                style={{
                  fontSize: "32px",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                Where Every <span className="text-primary italic">Ride</span>{" "}
                Begins.
              </h2>
              <p
                className="text-muted"
                style={{
                  fontWeight: 300,
                  lineHeight: "1.8",
                  marginBottom: "1.5rem",
                }}
              >
                Shift Bicycle Store was founded with a simple goal—to make cycling more
                accessible while delivering an experience customers can trust. Located in the
                heart of Dibrugarh, we offer bicycles for every age, every purpose, and every
                budget. Whether you're buying your child's first bicycle, commuting to work,
                exploring mountain trails, or training for long-distance rides, we're here to
                help you choose the right bicycle with confidence.
              </p>

              <p
                className="text-muted"
                style={{
                  fontWeight: 300,
                  lineHeight: "1.8",
                }}
              >
                Our commitment doesn't end with the sale. From professional servicing and
                genuine spare parts to expert guidance and after-sales support, we strive to
                make every customer feel valued. At Shift, we don't just sell bicycles—we
                build lasting relationships with riders and foster a growing cycling community
                across Dibrugarh and Upper Assam.
              </p>
            </div>
            <div className="blog-image-zoom-container" style={{ aspectRatio: '16/10', borderRadius: '24px' }}>
              <img 
                src={shiftCrewRide}
                alt="Shift Crew Ride" 
                className="blog-post-img"
              />
            </div>
          </div>

          {/* Philosophy Grid */}
          <div className="grid-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '5rem' }}>
            <div className="usp-card-item" style={{ padding: '2rem 1.5rem', borderRight: 'none' }}>
              <div className="usp-icon-container usp-icon-accent" style={{ marginBottom: '1.5rem' }}>
                <Shield size={22} />
              </div>
              <h3 className="usp-card-title">Something for Every Rider</h3>

              <p className="usp-card-body text-muted" style={{ fontSize: "13px" }}>
                From entry-level bicycles for daily commuting and kids to premium mountain,
                hybrid, and road bikes, we offer carefully selected models to suit every
                rider, every purpose, and every budget.
              </p>
            </div>

            <div className="usp-card-item" style={{ padding: '2rem 1.5rem', borderRight: 'none' }}>
              <div className="usp-icon-container usp-icon-normal" style={{ marginBottom: '1.5rem' }}>
                <Zap size={22} />
              </div>
              <h3 className="usp-card-title">Service You Can Trust</h3>

              <p className="usp-card-body text-muted" style={{ fontSize: "13px" }}>
                Our experienced technicians provide professional servicing, repairs, gear
                tuning, brake adjustments, and maintenance using genuine parts and
                industry-standard tools, ensuring every bicycle performs at its best.
              </p>
            </div>

            <div className="usp-card-item" style={{ padding: '2rem 1.5rem', borderRight: 'none' }}>
              <div className="usp-icon-container usp-icon-accent" style={{ marginBottom: '1.5rem' }}>
                <Target size={22} />
              </div>
              <h3 className="usp-card-title">A Community on Two Wheels</h3>

              <p className="usp-card-body text-muted" style={{ fontSize: "13px" }}>
                Shift is more than a bicycle store. We are passionate about growing the
                cycling culture in Assam by supporting riders with honest advice, dependable
                after-sales service, quality products, and a welcoming environment for
                cyclists of all ages and skill levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
