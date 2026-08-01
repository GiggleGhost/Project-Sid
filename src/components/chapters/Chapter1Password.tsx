import React, { useState } from 'react';
import { Heart, Lock, KeyRound, Sparkles } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { sounds } from '../../utils/sound';

interface Chapter1PasswordProps {
  onUnlocked: () => void;
}

export const Chapter1Password: React.FC<Chapter1PasswordProps> = ({ onUnlocked }) => {
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputPassword.trim().toLowerCase();
    const target = STORY_CONFIG.password.trim().toLowerCase();

    if (cleaned === target) {
      // Success sequence
      setIsSuccess(true);
      setErrorMsg('');
      sounds.playHeartbeat();

      setTimeout(() => {
        sounds.playSparkle();
        setWelcomeText(`Welcome home, ${STORY_CONFIG.nicknames[0]} ❤️`);
      }, 800);

      setTimeout(() => {
        onUnlocked();
      }, 3000);
    } else {
      // Wrong password
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);
      setIsShaking(true);
      sounds.playFlip();

      if (newCount >= 2) {
        setErrorMsg(`Hmm... That is also my favourite nickname of yours but not the one. Try again, my love. ❤️\nHint: ${STORY_CONFIG.passwordHint}`);
      } else {
        setErrorMsg("Hmm... That is my favourite too but Try again, my love. ❤️");
      }

      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <section id="chapter-1" className="min-h-screen flex flex-col items-center justify-center p-6 relative z-20">
      <div className="max-w-md w-full text-center">
        {!isSuccess ? (
          <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/80 transition-all duration-500">
            {/* Lock Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FFD6E8] flex items-center justify-center shadow-inner animate-float">
              <Lock className="w-8 h-8 text-[#E75480]" />
            </div>

            <h1 className="font-title text-4xl sm:text-5xl text-[#E75480] mb-3">
              Project Sid ❤️
            </h1>

            <p className="font-heading text-[#444444] text-lg sm:text-xl mb-6">
              Someone left something special for you...
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`relative ${isShaking ? 'animate-shake' : ''}`}>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="My favourite nick name of yours. ❤️"
                  className={`w-full px-5 py-3.5 pr-12 rounded-2xl bg-white/80 border text-center font-body text-base outline-none transition-all duration-300 ${
                    errorMsg
                      ? 'border-red-400 focus:ring-2 focus:ring-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : 'border-[#FF8DB3]/40 focus:border-[#E75480] focus:ring-2 focus:ring-[#FF8DB3]/30'
                  }`}
                  autoFocus
                />
                <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8DB3]" />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 font-medium whitespace-pre-line animate-fadeIn">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="interactive glass-button w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-heading font-semibold text-[#E75480] group"
              >
                <span>Unlock Our Memories</span>
                <Sparkles className="w-4 h-4 text-[#F7D27A] group-hover:rotate-12 transition-transform" />
              </button>
            </form>
          </div>
        ) : (
          /* Correct Password Success View */
          <div className="glass-panel p-10 rounded-3xl text-center space-y-6 animate-pulse-glow border border-[#FFD6E8]">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E75480] text-white flex items-center justify-center shadow-xl animate-bounce">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <div className="space-y-2">
              <span className="font-title text-4xl sm:text-5xl text-[#E75480] block">
                {welcomeText || "Unlocking..."}
              </span>
              <p className="text-xs font-body text-[#888888]">
                Gathering our golden memories...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
