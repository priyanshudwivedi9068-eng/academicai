import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CreditCard, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, plan, price }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success'

  const handleSimulatePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upgrade to {plan}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total amount: <span className="font-bold text-slate-900 dark:text-white">₹{price}</span></p>
            </div>
            <button 
              onClick={onClose}
              disabled={status === 'processing'}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {status === 'success' ? (
            <div className="p-10 flex flex-col items-center justify-center text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h3>
              <p className="text-slate-500 dark:text-slate-400">Welcome to AcadAssist {plan}. Your account has been upgraded.</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Payment Methods */}
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'upi' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  <QrCode className="w-6 h-6" />
                  <span className="font-medium text-sm">UPI / QR</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-medium text-sm">Card</span>
                </button>
              </div>

              {/* Payment UI */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-6 flex flex-col items-center justify-center min-h-[200px] border border-slate-100 dark:border-slate-800">
                {paymentMethod === 'upi' ? (
                  <div className="text-center">
                    <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-sm border border-slate-200 mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-slate-800" />
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Scan with any UPI App</p>
                    <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Card Number</label>
                      <input type="text" placeholder="4111 1111 1111 1111" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">CVV</label>
                        <input type="password" placeholder="123" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <button 
                onClick={handleSimulatePayment}
                disabled={status === 'processing'}
                className="w-full py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                {status === 'processing' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...</>
                ) : (
                  <>Pay ₹{price}</>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-green-500" /> 100% Secure Encrypted Payment
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
