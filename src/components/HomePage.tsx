import React, { useState } from 'react';
import { Brain, ArrowRight, MessageSquare, Globe2, Sparkles, Volume2 } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';
import { motion } from 'framer-motion';

interface HomePageProps {
  onStartJourney: () => void;
}

export function HomePage({ onStartJourney }: HomePageProps) {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleGetStarted = () => setIsDisclaimerOpen(true);
  const handleDisclaimerConfirm = () => {
    setIsDisclaimerOpen(false);
    onStartJourney();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative">
      
      {/* Background Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-50">
          <motion.div 
            className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
          <motion.div 
            className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 3 }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative text-center">
          
          {/* Floating Brain Logo */}
          <motion.div 
            className="flex justify-center mb-6 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/20"></div>
            <Brain className="h-16 w-16 text-blue-400 relative" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6">
            Dhanvantari
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your personal AI health assistant that understands and responds in your language
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <button 
              onClick={handleGetStarted}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          
          {/* Feature Card */}
          {[ 
            { icon: MessageSquare, title: "AI Health Assistant", desc: "Get instant responses to your health questions with our AI-powered assistant." },
            { icon: Globe2, title: "Multilingual Support", desc: "Communicate in your preferred language with our multilingual capabilities." },
            { icon: Volume2, title: "Voice Interaction", desc: "Speak with your AI assistant and listen to responses in your language." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-lg transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.07, boxShadow: "0px 4px 20px rgba(0, 136, 255, 0.2)" }}
            >
              <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-blue-100">{feature.desc}</p>
            </motion.div>
          ))}
        
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <p className="text-blue-100">Powered by Google's Gemini AI</p>
          </div>
          <p className="text-blue-100/60">
            © {new Date().getFullYear()} Dhanvantari. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onConfirm={handleDisclaimerConfirm}
      />
    </div>
  );
}
