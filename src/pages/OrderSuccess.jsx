import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Printer, ArrowLeft, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/yellow-black.png';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order || {
    id: 'SHF-0923-7742',
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Trek Marlin Gen 2', quantity: 1, price: 45900, size: 'L' },
      { name: 'Shift Performance Jersey', quantity: 1, price: 2499, size: 'M' }
    ],
    total: 48399,
    discount: 500,
    shipping: 0,
    tax: 0,
    final: 47899,
    address: 'Convoy Rd, Chowkidingee, Dibrugarh, Assam 786001'
  };

  const invoiceRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-success-section">
      <div className="container max-w-4xl">
        <div className="success-header no-print">
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="success-icon-container">
             <CheckCircle2 size={48} />
           </motion.div>
           <div className="success-title-block">
             <h1 className="success-heading">Order <span className="text-primary italic">Confirmed</span>!</h1>
             <p className="success-subheading">Thank you for choosing Shift. Your gear is in good hands.</p>
           </div>
           <div className="success-actions">
             <button onClick={handlePrint} className="btn-primary success-print-btn">
               <Printer size={16} /> Print Invoice
             </button>
             <Link to="/marketplace" className="btn-outline success-continue-btn">
               Continue Shopping <ArrowLeft size={16} className="rotate-180" />
             </Link>
           </div>
        </div>

        {/* INVOICE CARD */}
        <div ref={invoiceRef} className="invoice-card">
           {/* Invoice Header */}
           <div className="invoice-header">
              <div className="invoice-brand-column">
                 <div className="invoice-logo-row">
                   <img src={logo} alt="Shift" className="invoice-logo-img" />
                   <span className="invoice-logo-text">Shift</span>
                 </div>
                 <div className="invoice-store-address">
                    <p className="invoice-address-line font-black"><MapPin size={12}/> Shift Bicycle Store Dibrugarh</p>
                    <p>Convoy Rd, Ttiloi Bari, Chowkidingee</p>
                    <p>Dibrugarh, Assam 786001</p>
                    <p className="invoice-address-line phone-margin"><Phone size={12}/> +91 98765 43210</p>
                    <p className="invoice-address-line"><Mail size={12}/> hello@shiftbikes.com</p>
                 </div>
              </div>
              <div className="invoice-meta-column">
                 <h2 className="invoice-title">Invoice</h2>
                 <div className="invoice-meta-item">
                   <p className="invoice-meta-label">Order ID</p>
                   <p className="invoice-meta-val">{order.id || 'SHF-INV-001'}</p>
                 </div>
                 <div className="invoice-meta-item">
                   <p className="invoice-meta-label">Date</p>
                   <p className="invoice-meta-val">{new Date().toLocaleDateString()}</p>
                 </div>
              </div>
           </div>

           {/* Customer Info */}
           <div className="invoice-billing-grid grid-2">
              <div className="billing-column">
                 <h4 className="billing-label">Bill To</h4>
                 <div className="billing-info">
                    <p className="billing-name">John Doe</p>
                    <p>123 Mountain Trail, High Ridges</p>
                    <p>Guwahati, Assam 781001</p>
                    <p>+91 99887 76655</p>
                 </div>
              </div>
              <div className="billing-column">
                 <h4 className="billing-label">Payment Method</h4>
                 <div className="billing-info">
                    <p className="billing-name uppercase">Mock Payment Simulation</p>
                    <p className="billing-txn-text">Transaction: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    <p className="billing-status-text">STATUS: COMPLETED</p>
                 </div>
              </div>
           </div>

           {/* Table */}
           <table className="invoice-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header-cell cell-left">Item Description</th>
                  <th className="table-header-cell cell-center">Qty</th>
                  <th className="table-header-cell cell-right">Price</th>
                  <th className="table-header-cell cell-right">Total</th>
                </tr>
              </thead>
              <tbody className="table-body">
                 {order.items.map((item, idx) => (
                   <tr key={idx} className="table-body-row">
                     <td className="table-body-cell cell-left">
                        <div className="item-description-block">
                           <span className="item-name">{item.name}</span>
                           <span className="item-subtext">Brand: Shift | Size: {item.size}</span>
                        </div>
                     </td>
                     <td className="table-body-cell cell-center font-bold">{item.quantity}</td>
                     <td className="table-body-cell cell-right font-bold">₹{item.price.toLocaleString()}</td>
                     <td className="table-body-cell cell-right font-black">₹{(item.price * item.quantity).toLocaleString()}</td>
                   </tr>
                 ))}
              </tbody>
           </table>

           {/* Totals */}
           <div className="invoice-totals-row">
              <div className="invoice-totals-wrapper">
                 <div className="totals-line">
                    <span>Subtotal</span>
                    <span className="text-black">₹{order.total?.toLocaleString()}</span>
                 </div>
                 <div className="totals-line text-green">
                    <span>Discount (COUPON)</span>
                    <span>-₹{order.discount?.toLocaleString()}</span>
                 </div>
                 <div className="totals-line">
                    <span>Shipping</span>
                    <span className="text-black">₹{order.shipping?.toLocaleString()}</span>
                 </div>
                 <div className="grand-total-line">
                    <span className="grand-total-label">Grand Total</span>
                    <span className="grand-total-val">₹{(order.final || order.total).toLocaleString()}</span>
                 </div>
              </div>
           </div>

           {/* Footer Note */}
           <div className="warranty-note">
              <ShieldCheck className="warranty-icon" size={32} />
              <p className="warranty-text">
                This bill is generated digitally for order verification. Please keep it safe for warranty and support. Shift Bicycle Store Dibrugarh ensures all parts are tested for performance. 
              </p>
           </div>
        </div>

        {/* Global Print Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body { background: white !important; color: black !important; padding: 0 !important; margin: 0 !important; }
            .no-print { display: none !important; }
            .invoice-card { box-shadow: none !important; border: none !important; margin: 0 !important; padding: 0 !important; background: white !important; }
            .container { max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
          }
        `}} />
      </div>
    </div>
  );
};

export default OrderSuccess;
