import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, CheckCircle2, ArrowRight, ShieldCheck, Phone, MapPin } from 'lucide-react';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };

    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'L\'adresse e-mail est requise';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Veuillez entrer une adresse e-mail valide';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800 selection:bg-purple-200 selection:text-purple-900">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative"
      >
        {/* Decorative top accent */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-purple-700"></div>

        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200"
            >
              <span className="text-white text-3xl font-bold tracking-tighter">T</span>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                    Recevez nos promotions exclusives
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                    Inscrivez-vous pour recevoir les meilleures offres pour votre hanout directement dans votre boîte de réception.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-slate-400'}`} />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Votre nom complet"
                        className={`block w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-400'} rounded-xl text-sm transition-all duration-200 outline-none focus:ring-4`}
                      />
                    </div>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-1.5 text-xs text-red-500 pl-1">
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="Adresse e-mail"
                        className={`block w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-400'} rounded-xl text-sm transition-all duration-200 outline-none focus:ring-4`}
                      />
                    </div>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-1.5 text-xs text-red-500 pl-1">
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex items-start pt-1">
                    <div className="flex items-center h-5">
                      <input
                        id="opt-in"
                        type="checkbox"
                        checked={optIn}
                        onChange={(e) => setOptIn(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="opt-in" className="ml-3 text-sm text-slate-600 cursor-pointer select-none">
                      Recevoir les alertes de nouveaux produits et les promotions spéciales.
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Inscription...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>S'inscrire maintenant</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="text-center py-6"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Merci, {name.split(' ')[0]} !</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Votre inscription est confirmée. Vous recevrez bientôt nos meilleures offres pour votre hanout.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsSuccess(false);
                    setName('');
                    setEmail('');
                    setOptIn(true);
                  }}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors text-sm"
                >
                  Retour
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info inside card */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100">
          <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-500 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            <span>Nous respectons votre confidentialité. Pas de spam.</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5 hover:text-purple-600 transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5" />
              <span>+212 5XX XX XX XX</span>
            </div>
            <div className="flex items-center space-x-1.5 hover:text-purple-600 transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sale, Maroc</span>
            </div>
            <div className="flex items-center space-x-1.5 hover:text-purple-600 transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5" />
              <span>contact@tasehil.ma</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/20 blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/20 blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
