import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../config';

const GoogleReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/google-reviews`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching google reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return null;

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-header">
          <div className="reviews-title-block">
            <div className="google-badge">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google Reviews
            </div>
            <h2 className="reviews-heading">
              Trusted by the <span className="text-primary italic">Community</span>.
            </h2>
          </div>
          <div className="reviews-summary-block">
            <div className="reviews-average-row">
              <span className="reviews-average-num">{data?.averageRating}</span>
              <div className="reviews-stars text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
            </div>
            <p className="reviews-count-text">Based on {data?.totalReviews} verified reviews</p>
            <a href="https://share.google/hbEUmnNfuFSFYuWTp" target="_blank" rel="noreferrer" className="reviews-maps-link">
              View on Maps <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="reviews-grid grid-4">
          {data?.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="review-card"
            >
              <Quote className="review-quote-icon" size={36} />
              <div className="review-author-row">
                <img src={review.avatar} alt={review.author} className="review-avatar" />
                <div className="review-author-info">
                  <h4 className="review-author-name">{review.author}</h4>
                  <span className="review-time">{review.time}</span>
                </div>
              </div>
              <div className="review-card-stars text-gold">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
              </div>
              <p className="review-comment">
                "{review.comment}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;