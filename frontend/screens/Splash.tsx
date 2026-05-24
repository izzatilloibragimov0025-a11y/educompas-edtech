import React, { useEffect, useState } from 'react';
import { initAudio, sfx } from '../services/audio';
import { User } from '../types';
import { Compass } from 'lucide-react';
import { Button } from '../components/UI';

interface Props {
  user: User | null;
  onComplete: () => void;
  onReset: () => void;
}

export const Splash: React.FC<Props> = ({ user, onComplete, onReset }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    initAudio();
    sfx.tada();
    onComplete();
  };

  // Generic Premium Splash for First Launch (No interests known yet)
  if (!user) {
    return (
      <div className="min-h-screen bg-offwhite flex flex-col items-center justify-center relative overflow-hidden">
        {/* Elegant background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-lavender/20 to-transparent rounded-b-[100%] blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full px-6">
          <div className="w-32 h-32 bg-white rounded-[32px] shadow-glass border border-white/50 flex items-center justify-center mb-8 animate-float">
            <Compass size={64} className="text-lavender" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-5xl font-display font-black text-charcoal tracking-tight animate-pop-in text-center">
            EduKompas<span className="text-lavender">.AI</span>
          </h1>
          
          <p className="mt-4 text-charcoal/50 font-bold text-sm tracking-widest uppercase animate-pop-in text-center" style={{animationDelay: '0.2s'}}>
            Aqlli ta'lim platformasi
          </p>

          {isReady ? (
            <div className="mt-16 animate-pop-in w-full max-w-xs">
              <Button 
                onClick={handleStart} 
                variant="primary" 
                className="w-full !py-5 !text-xl !bg-lavender !border-lavender-dark !shadow-3d-secondary"
              >
                Boshlash
              </Button>
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center animate-pop-in w-full max-w-xs" style={{animationDelay: '0.4s'}}>
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-lavender rounded-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Personalized Cosmic Splash for Returning Users
  return (
    <div className="min-h-screen bg-cosmic flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-sunny rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-sky rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <div className="relative animate-float mb-8">
          {/* Glowing rings */}
          <div className="absolute inset-0 bg-sky rounded-full blur-2xl opacity-50 animate-pulse-glow"></div>
          <div className="w-40 h-40 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl relative z-10">
            <span className="text-7xl drop-shadow-lg">🚀</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-display font-black tracking-tight animate-pop-in drop-shadow-lg text-center">
          Qaytganing bilan,<br/><span className="text-sunny">{user.name}!</span>
        </h1>
        
        {isReady ? (
          <div className="mt-12 flex flex-col items-center animate-pop-in w-full max-w-xs">
            <Button 
              onClick={handleStart} 
              variant="white" 
              className="w-full !py-4 !text-lg mb-6"
            >
              Davom etish
            </Button>
            
            {/* Reset Button for Demo Purposes */}
            <button 
              onClick={onReset} 
              className="text-white/50 text-sm font-bold hover:text-white transition-colors underline underline-offset-4"
            >
              Boshqa foydalanuvchi (Tozalash)
            </button>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center animate-pop-in" style={{animationDelay: '0.5s'}}>
            <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sunny to-coral rounded-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="mt-3 text-white/80 font-bold text-sm tracking-widest uppercase">Koinotga tayyorgarlik...</p>
          </div>
        )}
      </div>
    </div>
  );
};
