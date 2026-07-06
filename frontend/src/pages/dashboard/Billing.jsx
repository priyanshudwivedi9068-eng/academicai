import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Zap, Shield } from 'lucide-react';
import PaymentModal from '../../components/PaymentModal';

const Billing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0 });

  const handleUpgrade = (name, price) => {
    setSelectedPlan({ name, price });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Upgrade your academic journey</h1>
        <p className="text-slate-500 dark:text-slate-400">Choose the perfect plan to unlock all AI capabilities and ace your exams.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Basic Plan */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Basic</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Perfect for getting started.</p>
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-slate-900 dark:text-white">₹0</span>
            <span className="text-slate-500 dark:text-slate-400">/forever</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-slate-400" /> 3 documents per month
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-slate-400" /> Basic AI Chat (Gemini Flash)
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-slate-400" /> Standard Support
            </li>
          </ul>
          <button className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border-2 border-primary-500 shadow-xl shadow-primary-500/10 flex flex-col relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full flex items-center gap-1 shadow-md">
            <Zap className="w-3 h-3 fill-current" /> Most Popular
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">For serious academic performance.</p>
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-slate-900 dark:text-white">₹999</span>
            <span className="text-slate-500 dark:text-slate-400">/month</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary-500" /> Unlimited document uploads
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary-500" /> Advanced Quiz & Flashcards Generator
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary-500" /> Priority Gemini 1.5 Pro access
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary-500" /> Export notes to PDF/Word
            </li>
          </ul>
          <button 
            onClick={() => handleUpgrade('Pro', 999)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold shadow-md shadow-primary-600/20 transition-all flex items-center justify-center gap-2"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-500" />
          <span>Secure checkout powered by industry standard encryption.</span>
        </div>
        <div className="flex items-center gap-4">
          <CreditCard className="w-6 h-6 text-slate-400" />
          <span>Supports UPI, Cards, and NetBanking</span>
        </div>
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        plan={selectedPlan.name}
        price={selectedPlan.price}
      />
    </div>
  );
};

export default Billing;
