import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Lock, CreditCard, ShieldCheck } from 'lucide-react';

const PaymentSimulation = ({ total, onModernSuccess, onModernFailure }) => {
  const [step, setStep] = useState('entry'); // entry, processing, success, failure
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const processPayment = () => {
    setStep('processing');
    // Simulate gateway delay
    setTimeout(() => {
      // Simulate 90% success rate for mock
      if (Math.random() > 0.1) {
        setStep('success');
        setTimeout(() => onModernSuccess(), 2000);
      } else {
        setStep('failure');
      }
    }, 3500);
  };

  return (
    <div className="payment-card">
      <AnimatePresence mode="wait">
        {step === 'entry' && (
          <motion.div 
            key="entry"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="payment-card-body"
          >
            <div className="payment-card-header">
              <div className="payment-title-wrapper">
                <h3 className="payment-heading">Secure Checkout</h3>
                <p className="payment-subheading">Select Payment Method</p>
              </div>
              <ShieldCheck className="text-green-500" size={32} />
            </div>

            <div className="payment-method-row">
              <div className="payment-method-details">
                <div className="payment-method-icon">
                   <CreditCard size={20} />
                </div>
                <div className="payment-method-text">
                   <p className="method-title">Credit / Debit Card</p>
                   <p className="method-subtitle">Visa, Mastercard, Amex</p>
                </div>
              </div>
              <div className="radio-selected"></div>
            </div>

            <div className="card-inputs-container">
              <div className="card-input-group">
                 <label className="card-input-label">Card Number</label>
                 <input 
                   type="text" 
                   placeholder="0000 0000 0000 0000" 
                   className="card-text-input input-mono"
                   onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                 />
              </div>
              <div className="card-inputs-row grid-2">
                 <div className="card-input-group">
                    <label className="card-input-label">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="card-text-input" />
                 </div>
                 <div className="card-input-group">
                    <label className="card-input-label">CVV</label>
                    <input type="password" placeholder="***" className="card-text-input" />
                 </div>
              </div>
            </div>

            <button 
              onClick={processPayment}
              className="payment-submit-btn"
            >
              Pay ₹{total.toLocaleString()} <Lock size={16} className="submit-lock-icon" />
            </button>

            <span className="payment-footer-note">
              Shift uses industry-standard 256-bit SSL encryption.
            </span>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="payment-processing-view"
          >
            <div className="processing-spinner-wrapper">
               <Loader2 className="animate-spin text-primary" size={80} strokeWidth={1} />
               <div className="processing-inner-logo">
                  <span className="processing-logo-text">SHIFT</span>
               </div>
            </div>
            <div className="processing-text-wrapper">
              <h3 className="processing-heading">Processing...</h3>
              <p className="processing-subheading">Contacting secure bank gateway.<br/>Do not refresh or close window.</p>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="payment-result-view"
          >
            <div className="payment-success-badge">
               <CheckCircle2 size={48} />
            </div>
            <div className="payment-result-text-wrapper">
              <h3 className="payment-success-heading">Payment Success</h3>
              <p className="payment-result-subheading">Order #SHF-0923 is confirmed</p>
            </div>
            <p className="payment-redirect-text">Redirecting to your order summary...</p>
          </motion.div>
        )}

        {step === 'failure' && (
          <motion.div 
            key="failure"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="payment-result-view"
          >
            <div className="payment-failure-badge">
               <XCircle size={48} />
            </div>
            <div className="payment-result-text-wrapper">
              <h3 className="payment-failure-heading">Payment Failed</h3>
              <p className="payment-result-subheading">Your bank declined the transaction.</p>
            </div>
            <button 
              onClick={() => setStep('entry')}
              className="payment-retry-btn"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSimulation;
