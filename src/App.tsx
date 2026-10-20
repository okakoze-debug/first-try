/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Envelope } from './components/Envelope';
import { LetterSheet } from './components/LetterSheet';
import { FloatingHeartsBackground } from './components/FloatingHeartsBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { romanticAudio } from './utils/audio';

const DEFAULT_LETTER_TEXT = `I miss you so much, baby. I wish you knew how much. I think about you throughout the day, how often I catch myself wishing you were here, and how badly I want to hold you in my arms and never let you go. Sometimes, I just wish I could close my eyes and magically appear beside you, pull you close to me, kiss your forehead, and remind you of how incredibly loved you are.

I miss your attention, your sweetness, your clinginess, your little habits, and everything that makes you you. I miss the way you make me smile without even trying, the way you make my heart feel so full, and how you somehow manage to make me fall even more in love with you every single day. You're genuinely my favorite person, my comfort, my happiness, and the girl I want to share all my little moments with.

Baby, you're so incredibly amazing and smart, and I hope you never forget how special you are to me. I admire you more than I could ever explain, and I'm so proud of the person you are. Even when things get difficult, even when we're struggling, and even when the distance makes everything feel harder, I still want you. I still choose you. I still want to be right there beside you, loving you through everything life throws at us.

I wish I could kiss your cheeks a thousand times, cuddle you until we both fall asleep, hold your hand while we talk about absolutely nothing, and annoy you with all the affection I have stored up for you. I want to be the person who makes you feel safe, appreciated, beautiful, and loved, even on the days when you don't feel your best. I want to remind you every day that you're my girl, my favorite girl, and the one my heart keeps choosing.

Long distance is hard because I have so much love to give you, yet I can't always express it through hugs, kisses, and simply being there beside you. But please remember that no amount of distance could ever change how I feel about you. You're always in my thoughts, always in my heart, and always the person I wish I could run to whenever I miss you.

I love you more than these words could ever explain, princess. I love your mind, your heart, your personality, your beautiful soul, and every little thing that makes you the girl I fell in love with. I'm so grateful that I met you, and if I could go back and live everything all over again, I'd still find my way to you every single time.

So until I can finally hold you for real, just remember that somewhere, there's a boy who misses you endlessly, thinks about you constantly, and loves you more than he could ever put into words. A boy who wants to give you all the kisses, cuddles, reassurance, and affection you've ever wanted. A boy who will keep chasing you, keep loving you, and keep standing beside you through everything.

I miss you so much, my beautiful girl. I wish you were here with me, but until that day comes, I'll keep loving you from here, counting down the moments until I can finally hold you close.

Forever missing you, forever choosing you, and forever loving you, my sweetest girl.`;

export default function App() {
  const [stage, setStage] = useState<'sealed' | 'opened' | 'reading'>('sealed');
  const [customTitle, setCustomTitle] = useState('♡ My sweet baby. ♡');
  const [customLetter, setCustomLetter] = useState(DEFAULT_LETTER_TEXT);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Check for shared URL hash data
  useEffect(() => {
    try {
      if (window.location.hash.startsWith('#custom=')) {
        const raw = window.location.hash.replace('#custom=', '');
        const decoded = decodeURIComponent(escape(atob(decodeURIComponent(raw))));
        const parsed = JSON.parse(decoded);
        if (parsed.t) setCustomTitle(parsed.t);
        if (parsed.b) setCustomLetter(parsed.b);
      }
    } catch {
      // ignore
    }
  }, []);

  // Step 1 -> Step 2: Open Envelope
  const handleOpenFlap = () => {
    if (stage !== 'sealed') return;
    romanticAudio.playSealBreak();
    setStage('opened');
    setAutoPlayMusic(true);

    // Soft celebration sparkle
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.5 },
      colors: ['#fde047', '#fb923c', '#f43f5e'],
      scalar: 0.9,
    });
  };

  // Step 2 -> Step 3: Unveil Full Letter
  const handleReadLetter = () => {
    if (stage !== 'opened') return;
    romanticAudio.playPaperSlide();
    setStage('reading');
    setAutoPlayMusic(true);

    // Gentle heart burst
    confetti({
      particleCount: 32,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#a31924', '#e11d48', '#fda4af', '#fde047'],
      scalar: 1.1,
    });
  };

  // Step 3 -> Step 1: Replay
  const handleFoldBack = () => {
    romanticAudio.playPaperSlide();
    setStage('sealed');
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#fff2f6] via-[#ffeef4] to-[#ffe9f0] font-sans">
      {/* Floating glossy background hearts */}
      <FloatingHeartsBackground showFullConstellation={stage === 'reading'} />

      {/* Top Bar / Controls */}
      <header className="relative z-40 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 flex items-start justify-between">
        <div className="flex items-center gap-1.5 text-rose-950 font-serif-sub tracking-wider text-xs sm:text-sm font-semibold opacity-85 select-none pt-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-700 fill-rose-600/70" />
          <span>With all my love</span>
        </div>

        <div className="flex items-start">
          {/* Olivia Rodrigo - stupid song Music Player */}
          <MusicPlayer autoPlayTrigger={autoPlayMusic} />
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
        {stage !== 'reading' ? (
          /* ==========================================================
             STAGES 1 & 2: Sealed Envelope & Opening Envelope
             ========================================================== */
          <div className="w-full flex flex-col items-center justify-center my-auto transition-all duration-700">
            {/* Title matching Image 1: "A letter for my baby", smoothly disappears in Stage 2 like Image 2 */}
            <AnimatePresence>
              {stage === 'sealed' && (
                <motion.div
                  key="main-title"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-6 sm:mb-8"
                >
                  <h1 className="font-title text-4xl sm:text-5xl md:text-6xl text-[#521321] font-normal tracking-tight select-none">
                    A letter for my baby
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Interactive Burgundy Envelope - smoothly pulled down when opened */}
            <motion.div
              layout
              animate={{
                y: stage === 'opened' ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 65 : 95) : 0,
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full mb-8 sm:mb-10 flex justify-center"
            >
              <Envelope
                stage={stage}
                onOpenFlap={handleOpenFlap}
                onReadLetter={handleReadLetter}
              />
            </motion.div>

            {/* Interactive Call-To-Action Button */}
            <motion.div
              layout
              animate={{
                y: stage === 'opened' ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 65 : 95) : 0,
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex justify-center"
            >
              <AnimatePresence mode="wait">
                {stage === 'sealed' ? (
                  <motion.button
                    key="btn-open"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleOpenFlap}
                    className="px-7 py-3 sm:px-9 sm:py-3.5 bg-[#671625] hover:bg-[#7b1b2d] active:bg-[#58121f] text-white font-medium text-base sm:text-lg rounded-full shadow-[0_8px_20px_rgba(85,14,28,0.35)] transition-colors cursor-pointer select-none"
                  >
                    Tap here to open it baby
                  </motion.button>
                ) : (
                  <motion.button
                    key="btn-read"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleReadLetter}
                    className="px-7 py-3 sm:px-9 sm:py-3.5 bg-[#671625] hover:bg-[#7b1b2d] active:bg-[#58121f] text-white font-medium text-base sm:text-lg rounded-full shadow-[0_8px_20px_rgba(85,14,28,0.35)] transition-colors cursor-pointer select-none flex items-center gap-2"
                  >
                    <span>Tap here to read it sweetie</span>
                    <span className="text-xl">✨</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Subtle Hint */}
            <p className="mt-4 text-xs sm:text-sm text-[#7e172a]/70 select-none">
              {stage === 'sealed'
                ? 'Tap the button or the golden wax seal to unseal'
                : 'Tap to unfold and read every word'}
            </p>
          </div>
        ) : (
          /* ==========================================================
             STAGE 3: Full Letter Unveiled (Image 3)
             ========================================================== */
          <div className="w-full py-4 sm:py-6 flex justify-center">
            <LetterSheet
              onFoldBack={handleFoldBack}
              customLetterText={customLetter}
              customTitle={customTitle}
            />
          </div>
        )}
      </main>

      {/* Bottom right corner signature */}
      <footer className="fixed bottom-3 right-4 sm:bottom-4 sm:right-6 z-30 select-none pointer-events-none print:hidden">
        <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#651322] font-serif-sub font-semibold italic tracking-wide bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-200 shadow-md">
          <span className="text-sm text-rose-600">♡</span>
          <span>From your Sefy (daddy)</span>
          <span className="text-sm text-rose-600">♡</span>
        </div>
      </footer>
    </div>
  );
}
