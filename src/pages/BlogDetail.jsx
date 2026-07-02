import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Static fallback posts (from Blog.jsx but with extra text content for detailed reading)
const STATIC_BLOG_CONTENTS = {
  'shift-high-altitude': {
    tag: 'Feature',
    title: 'Shift High Altitude: The North East Challenge',
    date: 'March 24, 2026',
    author: 'Performance Team',
    img: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&q=80&w=1200',
    content: `Tackling the steep gradients and winding passes of the North East trails. The crew puts our custom builds to the ultimate endurance test.

    Our journey began at the foothills of the Himalayas, where humidity is thick and the tarmac quickly yields to gravel, mud, and jagged slate. We set out to test the new Shift Carbon X1 Pro under conditions most manufacturers only simulate in clean, temperature-controlled laboratory chambers.
    
    ### Scaling the Sela Pass
    At an altitude of over 13,700 feet, the air thins, and every pedal stroke feels like double the effort. The Carbon X1's custom-tuned Northeast geometry proved its worth here. The steeper seat tube angle kept the rider's center of gravity forward, preventing front-wheel lift on 18% gradients.
    
    The mechanical Shimano 105 groupset shift action remained crisp despite freezing temperatures. We faced unexpected sleet near the peak, which tested the hydraulic disc brakes. The stopping power was immediate and modular, giving our test riders absolute confidence on wet, winding descents with zero runoff margins.
    
    ### Frame Stiffness and Comfort
    A common criticism of lightweight carbon frames is that they transmit too much road chatter. On the broken gravel sections leading down to Tawang, the frame layup did an exceptional job of absorbing micro-vibrations without feeling sluggish.
    
    Our engineering lead noted:
    > "By adjusting the carbon layup in the chainstays while maintaining a reinforced bottom bracket shell, we achieved vertical compliance without losing a single watt of power transfer."
    
    The test concluded with over 450 kilometers logged and zero mechanical failures. The North East challenge has proven that our custom-tuned frames are built to conquer real, unforgiving terrain.`
  },
  'carbon-vs-aluminium': {
    tag: 'Technical',
    title: 'Carbon vs Aluminium: Which Frame Wins in 2026',
    date: 'March 12, 2026',
    author: 'Engineering Lab',
    img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200',
    content: `A detailed breakdown of frame aerodynamics, weight metrics, structural resilience, and cost analysis for modern performance cyclists.

    In the cycling world, no debate is as enduring or passionate as the choice of frame material. As we progress into 2026, advances in metallurgy and carbon fiber composites have redefined what both materials can deliver. Here is our data-driven breakdown of how they compare today.
    
    ### Weight and Stiffness-to-Weight Ratio
    Carbon fiber remains the undisputed champion of weight reduction. A high-grade carbon frame can weigh as little as 700-900 grams, whereas a top-tier hydroformed aluminum frame sits around 1100-1300 grams.
    
    However, the real differentiator is how stiffness is distributed:
    * **Carbon:** Fiber direction can be manipulated to make a frame stiff horizontally (for power transfer) and compliant vertically (for comfort).
    * **Aluminium:** While modern hydroforming allows varied wall thickness (butted tubing), it remains isotropic, meaning it behaves similarly in all directions.
    
    ### Aerodynamics and Design Freedom
    Carbon fiber is molded, allowing aerodynamic tube shapes (like truncated airfoils) with integrated routing. Aluminium tubes must be welded, which limits aerodynamics and leaves weld beads, although modern double-pass smooth welding makes them nearly invisible.
    
    ### Durability and Lifecycle
    * **Aluminium:** Fatigue limit is finite. Over years of hard riding, aluminium accumulates micro-stress and will eventually soften or crack. It handles blunt impacts (crashes, rock strikes) exceptionally well without catastrophic failure.
    * **Carbon:** Practically infinite fatigue life if undamaged. However, a sharp impact can cause delamination of internal layers, which might be invisible to the eye but structurally compromised.
    
    ### The Verdict
    If your budget allows and racing performance is your primary objective, Carbon wins. But if you want a rugged gravel bike, a daily commuter, or want the absolute best value per rupee, modern hydroformed Aluminium is closer to carbon performance than ever before.`
  },
  'brahmaputra-valley': {
    tag: 'Community',
    title: 'Riding the Brahmaputra Valley Trail with the Shift Crew',
    date: 'Feb 28, 2026',
    author: 'Community Lead',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
    content: `Exploring local riverbed trails, meeting passionate riders, and expanding the boundaries of active cycling communities in Assam.

    There is something magical about the early morning fog rising off the Brahmaputra River. Last weekend, 45 riders joined the Shift Crew for our monthly community ride, exploring the alluvial dirt trails and singletracks that run parallel to the mighty river in Upper Assam.
    
    ### The Route
    We started at the Dibrugarh riverfront, navigating dry sandbanks, bamboo groves, and technical clay climbs. The diversity of bikes was inspiring: from vintage steel touring rigs to our latest gravel and mountain builds.
    
    ### Community Over Speed
    This wasn't a race; it was a celebration of motion. We stopped at a small tea garden worker settlement for local black tea and snacks, sharing stories of long-distance tours and discussing mechanical tips.
    
    We are building a culture where cycling isn't just an elite sport, but a sustainable, healthy, and deeply social daily habit. We thank everyone who came out and made it an unforgettable ride!`
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse ID to see if it's a static route slug
  const staticSlug = id ? id.toLowerCase() : '';

  useEffect(() => {
    const fetchBlogPost = async () => {
      // Check static fallbacks first
      if (STATIC_BLOG_CONTENTS[staticSlug]) {
        setPost(STATIC_BLOG_CONTENTS[staticSlug]);
        setLoading(false);
        return;
      }

      // Check if it's a valid MongoDB ObjectId (24 hex characters)
      const isMongoId = /^[a-f\d]{24}$/i.test(id);
      if (!isMongoId) {
        // Find general match in list if title was used as fallback slug
        const fallbackKey = Object.keys(STATIC_BLOG_CONTENTS).find(k => k.includes(staticSlug) || staticSlug.includes(k));
        if (fallbackKey) {
          setPost(STATIC_BLOG_CONTENTS[fallbackKey]);
        } else {
          setError('Post not found.');
        }
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load the article.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [id, staticSlug]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase' }}>{error || 'Article Not Found'}</h2>
        <Link to="/blog" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '8px' }}>Back to Journal</Link>
      </div>
    );
  }

  // Format content body paragraphs (splitting by new lines)
  const paragraphs = post.content ? post.content.split('\n') : [];
  const imageUrl = post.img || post.image?.url || 'https://via.placeholder.com/1200?text=Shift+Journal';

  return (
    <div className="blog-detail-page">
      {/* Hero Banner */}
      <div className="blog-detail-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="blog-detail-hero-overlay" />
        <div className="container">
          <div className="blog-detail-hero-content">
            <div className="breadcrumbs" style={{ marginBottom: '1.5rem' }}>
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={10} />
              <Link to="/blog" className="breadcrumb-link">Journal</Link>
              <ChevronRight size={10} />
              <span className="breadcrumb-current">{post.title}</span>
            </div>
            
            <span className="blog-detail-tag">{post.tag || post.category || 'Story'}</span>
            <h1 className="blog-detail-title">{post.title}</h1>
            
            <div className="blog-detail-meta">
              <div className="meta-item"><User size={14} /> <span>{post.author || 'Shift Admin'}</span></div>
              <div className="meta-item"><Calendar size={14} /> <span>{post.date || new Date(post.createdAt).toLocaleDateString()}</span></div>
              <div className="meta-item"><Clock size={14} /> <span>5 Min Read</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="container blog-detail-content-wrap">
        <div className="blog-detail-layout">
          <div className="blog-detail-main">
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft size={14} /> Back to Journal
            </Link>

            <article className="blog-article">
              {paragraphs.map((p, i) => {
                const trimmed = p.trim();
                if (!trimmed) return null;
                
                // Render headers
                if (trimmed.startsWith('###')) {
                  return <h3 key={i} className="blog-article-h3">{trimmed.replace('###', '')}</h3>;
                }
                if (trimmed.startsWith('##')) {
                  return <h2 key={i} className="blog-article-h2">{trimmed.replace('##', '')}</h2>;
                }
                
                // Render Blockquotes
                if (trimmed.startsWith('>')) {
                  return (
                    <blockquote key={i} className="blog-article-blockquote">
                      {trimmed.replace('>', '').replace(/"/g, '')}
                    </blockquote>
                  );
                }

                // Render Bullet points
                if (trimmed.startsWith('*')) {
                  return (
                    <ul key={i} className="blog-article-ul">
                      <li>{trimmed.replace('*', '').trim()}</li>
                    </ul>
                  );
                }

                return <p key={i} className="blog-article-p">{trimmed}</p>;
              })}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
