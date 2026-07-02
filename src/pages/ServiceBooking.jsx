import React, { useState, useRef } from 'react';
import { Shield, Calendar, Wrench, Send, CheckCircle, AlertCircle, Loader2, Upload, X, Bike } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ServiceBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    date: '',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Limit to images and 10MB
      if (!file.type.startsWith('image/')) {
        setStatus((prev) => ({ ...prev, error: 'Please upload an image file only.' }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setStatus((prev) => ({ ...prev, error: 'File size should be under 10MB.' }));
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setStatus((prev) => ({ ...prev, error: '' }));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const submissionData = new FormData();
    // Append text fields
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    // Append file if selected
    if (selectedFile) {
      submissionData.append('cycleImage', selectedFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        body: submissionData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          brand: '',
          model: '',
          date: '',
          message: '',
        });
        handleRemoveFile();
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      console.error('Service booking submit error:', err);
      setStatus({
        loading: false,
        success: false,
        error: 'Unable to reach the server. Please check your connection and try again.',
      });
    }
  };

  return (
    <div className="marketplace-section contact-section">
      <div className="container">
        {/* Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Maintenance & Tuning
          </div>
          <h1 className="marketplace-title">Book a Service</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', margin: '1rem 0 0 0' }}>
            Schedule expert tuning, custom assembly, or diagnostic repair for your high-performance cycle at our Dibrugarh Flagship Hub.
          </p>
        </div>

        {/* Content Layout */}
        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <h2 className="contact-subheading">Why Shift Service?</h2>
            <p className="contact-desc">
              Our mechanics hold professional certifications and use specialized equipment to maximize your performance.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="detail-title">Component Warranty</h4>
                  <p className="detail-text">
                    All components installed carry official brand certifications and full replacement warranties.
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Wrench size={20} />
                </div>
                <div>
                  <h4 className="detail-title">Expert Diagnostics</h4>
                  <p className="detail-text">
                    We inspect frame fatigue, align carbon components with precise torque specs, and tune gear steps.
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="detail-title">Priority Slots</h4>
                  <p className="detail-text">
                    Book ahead to secure same-day turnaround times so you never miss a weekend ride.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-map-placeholder" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 215, 0, 0.02)', border: '1px dashed rgba(255, 215, 0, 0.15)', height: '180px', marginTop: '2.5rem' }}>
              <Bike size={40} className="text-primary" style={{ marginBottom: '12px', opacity: 0.6 }} />
              <span className="text-muted text-xs uppercase tracking-widest text-center" style={{ padding: '0 20px' }}>Precision Tuning for Carbon & Alloy Machines</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-card">
            <h2 className="contact-subheading">Booking Request</h2>
            
            {status.success && (
              <div className="alert-message alert-success">
                <CheckCircle size={20} className="alert-icon" />
                <div>
                  <h4 className="alert-title">Booking Submitted!</h4>
                  <p className="alert-desc">We have received your service request and will confirm your slot shortly.</p>
                </div>
              </div>
            )}

            {status.error && (
              <div className="alert-message alert-error">
                <AlertCircle size={20} className="alert-icon" />
                <div>
                  <h4 className="alert-title">Booking Failed</h4>
                  <p className="alert-desc">{status.error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" encType="multipart/form-data">
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date" className="form-label">Preferred Service Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-input"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="brand" className="form-label">Cycle Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Trek, Giant, Specialized"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="model" className="form-label">Cycle Model</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Domane AL 2, TCR Advanced"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Describe Issues or Tuning Required</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe gear skips, brake fade, alignment issues, or the service package you want..."
                  className="form-input form-textarea"
                />
              </div>

              {/* File Attachment Field */}
              <div className="form-group">
                <label className="form-label">Attach Image of your Cycle (Optional)</label>
                
                {!previewUrl ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="file-upload-dropzone"
                    style={{
                      border: '1px dashed rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.01)',
                      transition: 'var(--transition)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Upload size={24} className="text-muted" />
                    <span className="text-sm text-muted">Click to select cycle image</span>
                    <span className="text-xs text-muted" style={{ opacity: 0.6 }}>Supports PNG, JPG, JPEG (Max 10MB)</span>
                  </div>
                ) : (
                  <div 
                    className="file-upload-preview-container"
                    style={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      maxHeight: '200px'
                    }}
                  >
                    <img 
                      src={previewUrl} 
                      alt="Cycle Preview" 
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(198, 40, 40, 0.85)',
                        color: '#fff',
                        borderRadius: '50%',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'var(--transition)'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                <input
                  type="file"
                  id="cycleImage"
                  name="cycleImage"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn-submit btn-primary-custom"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    Book Slot
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
