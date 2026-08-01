import React, { useState } from 'react';
import { HelpCircle, Heart, Sparkles, CheckCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter9Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = STORY_CONFIG.quiz[currentIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent double taps

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      sounds.playPop();
      sounds.playSparkle();
      setScore(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        text: currentQ.correctResponse
      });

      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF8DB3', '#E75480', '#F7D27A']
      });
    } else {
      sounds.playFlip();
      setFeedback({
        isCorrect: false,
        text: currentQ.wrongResponse
      });
    }
  };

  const handleNextQuestion = () => {
    sounds.playSparkle();
    setSelectedOption(null);
    setFeedback(null);

    if (currentIndex + 1 < STORY_CONFIG.quiz.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    sounds.playSparkle();
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <section id="chapter-9" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Chapter Header */}
        <div className="text-center mb-10">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter IX</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Our Sweet Relationship Quiz</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2 flex items-center justify-center gap-1">
            <HelpCircle className="w-4 h-4 text-[#E75480]" /> Let's test how well you know Maha's heart!
          </p>
        </div>

        {!isCompleted ? (
          /* Question View */
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-[#FFD6E8] shadow-2xl space-y-6">
            
            {/* Progress */}
            <div className="flex items-center justify-between text-xs font-semibold text-[#888888] border-b border-[#FFD6E8] pb-3">
              <span>Question {currentIndex + 1} of {STORY_CONFIG.quiz.length}</span>
              <span className="text-[#E75480] flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-[#E75480]" /> Score: {score}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#444444] text-center">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "border-[#FFD6E8] hover:border-[#E75480] text-[#444444]";
                if (selectedOption !== null) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-md";
                  } else if (idx === selectedOption) {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-800";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`interactive w-full p-4 rounded-2xl border font-body text-sm font-medium text-left transition-all duration-300 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && idx === currentQ.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {feedback && (
              <div className="pt-4 border-t border-[#FFD6E8] text-center space-y-4 animate-fadeIn">
                <p className={`font-body text-sm font-semibold ${feedback.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {feedback.text}
                </p>

                <button
                  onClick={handleNextQuestion}
                  className="interactive glass-button px-6 py-2.5 rounded-full font-heading text-xs font-semibold text-[#E75480] inline-flex items-center gap-2"
                >
                  <span>{currentIndex + 1 < STORY_CONFIG.quiz.length ? "Next Question" : "See Final Score"}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#F7D27A]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results View */
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-[#FFD6E8] shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#FFD6E8] flex items-center justify-center shadow-inner">
              <Heart className="w-10 h-10 text-[#E75480] fill-[#E75480] animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="font-title text-4xl sm:text-5xl text-[#E75480] block">
                {score === STORY_CONFIG.quiz.length ? "Perfect Score, Muddulu! 🎉" : "You Passed With Love! ❤️"}
              </span>
              <p className="font-heading text-[#444444] text-lg">
                You scored {score} out of {STORY_CONFIG.quiz.length}!
              </p>
              <p className="font-body text-xs text-[#888888] max-w-md mx-auto pt-2">
                No matter what the quiz says, you win my heart 100% of the time, Sid!
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="interactive glass-button px-6 py-2.5 rounded-full font-heading text-xs font-semibold text-[#E75480] inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          </div>
        )}
      </div>

      <TurnPageButton targetChapterId="chapter-10" label="Turn to Scratch Card ❤️" />
    </section>
  );
};
