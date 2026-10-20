import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, RotateCcw, Type, ZoomIn, ZoomOut, Heart, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

interface LetterSheetProps {
  onFoldBack: () => void;
  customLetterText?: string;
  customTitle?: string;
}

export const LetterSheet: React.FC<LetterSheetProps> = ({
  onFoldBack,
  customLetterText,
  customTitle = '♡ My sweet baby. ♡',
}) => {
  const [copied, setCopied] = useState(false);
  const [fontMode, setFontMode] = useState<'script' | 'serif'>('script');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number; size: number; delay: number; rotate: number }>>([]);

  const defaultParagraphs = [
    `I miss you so much, baby. I wish you knew how much. I think about you throughout the day, how often I catch myself wishing you were here, and how badly I want to hold you in my arms and never let you go. Sometimes, I just wish I could close my eyes and magically appear beside you, pull you close to me, kiss your forehead, and remind you of how incredibly loved you are.`,

    `I miss your attention, your sweetness, your clinginess, your little habits, and everything that makes you you. I miss the way you make me smile without even trying, the way you make my heart feel so full, and how you somehow manage to make me fall even more in love with you every single day. You're genuinely my favorite person, my comfort, my happiness, and the girl I want to share all my little moments with.`,

    `Baby, you're so incredibly amazing and smart, and I hope you never forget how special you are to me. I admire you more than I could ever explain, and I'm so proud of the person you are. Even when things get difficult, even when we're struggling, and even when the distance makes everything feel harder, I still want you. I still choose you. I still want to be right there beside you, loving you through everything life throws at us.`,

    `I wish I could kiss your cheeks a thousand times, cuddle you until we both fall asleep, hold your hand while we talk about absolutely nothing, and annoy you with all the affection I have stored up for you. I want to be the person who makes you feel safe, appreciated, beautiful, and loved, even on the days when you don't feel your best. I want to remind you every day that you're my girl, my favorite girl, and the one my heart keeps choosing.`,

    `Long distance is hard because I have so much love to give you, yet I can't always express it through hugs, kisses, and simply being there beside you. But please remember that no amount of distance could ever change how I feel about you. You're always in my thoughts, always in my heart, and always the person I wish I could run to whenever I miss you.`,

    `I love you more than these words could ever explain, princess. I love your mind, your heart, your personality, your beautiful soul, and every little thing that makes you the girl I fell in love with. I'm so grateful that I met you, and if I could go back and live everything all over again, I'd still find my way to you every single time.`,

    `So until I can finally hold you for real, just remember that somewhere, there's a boy who misses you endlessly, thinks about you constantly, and loves you more than he could ever put into words. A boy who wants to give you all the kisses, cuddles, reassurance, and affection you've ever wanted. A boy who will keep chasing you, keep loving you, and keep standing beside you through everything.`,

    `I miss you so much, my beautiful girl. I wish you were here with me, but until that day comes, I'll keep loving you from here, counting down the moments until I can finally hold you close.`,

    `Forever missing you, forever choosing you, and forever loving you, my sweetest girl.`,
  ];

  const fullLetterString = customLetterText || defaultParagraphs.join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLetterString);
    setCopied(true);
    romanticAudio.playHeartPop();
    setTimeout(() => setCopied(false), 2400);
  };

  const handlePrint = () => {
    window.print();
  };

  const triggerHeartBurst = () => {
    // Audio Chime
    romanticAudio.playHeartPop();

    // Canvas Confetti using gentle little heart shapes (NO circles)
    try {
      if (typeof window !== 'undefined' && (window as unknown as { Path2D: typeof Path2D }).Path2D) {
        const heartShape = confetti.shapeFromPath({
          path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
        });

        confetti({
          particleCount: 36,
          spread: 75,
          origin: { y: 0.68 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
          shapes: [heartShape],
          scalar: 1.35,
          ticks: 220,
          gravity: 0.8,
        });
      } else {
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { y: 0.68 },
          colors: ['#f43f5e', '#fb7185', '#fda4af'],
          scalar: 1.1,
        });
      }
    } catch {
      // Fallback
    }

    // Spawn Floating Hearts gently rising
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: 15 + Math.random() * 70,
      size: 16 + Math.random() * 18,
      delay: Math.random() * 0.25,
      rotate: (Math.random() - 0.5) * 35,
    }));

    setFloatingHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
    }, 2400);
  };

  return (
    <div className="w-full max-w-[680px] mx-auto relative">
      {/* Floating Action Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2 px-2 print:hidden"
      >
        <button
          onClick={onFoldBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#641424] bg-white/80 hover:bg-white rounded-full shadow-sm border border-rose-200 transition-all cursor-pointer hover:scale-103 active:scale-97"
          title="Fold letter back into envelope"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Fold back to envelope</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Toggle Script / Serif Reader */}
          <button
            onClick={() => {
              setFontMode(prev => (prev === 'script' ? 'serif' : 'script'));
              romanticAudio.playPaperSlide();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white/80 hover:bg-white rounded-full shadow-sm border border-rose-200 transition-all cursor-pointer"
            title="Toggle between authentic handwriting and reader serif"
          >
            <Type className="w-3.5 h-3.5 text-rose-700" />
            <span className="hidden sm:inline">
              {fontMode === 'script' ? 'Reading Mode' : 'Cursive Script'}
            </span>
          </button>

          {/* Font Size controls */}
          <div className="flex items-center bg-white/80 rounded-full border border-rose-200 shadow-sm p-0.5">
            <button
              onClick={() => setFontSizeMultiplier(prev => Math.max(0.85, prev - 0.1))}
              className="p-1 hover:bg-rose-50 rounded-full text-slate-600 transition-colors cursor-pointer"
              title="Smaller font"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] px-1 text-slate-500 font-mono">
              {Math.round(fontSizeMultiplier * 100)}%
            </span>
            <button
              onClick={() => setFontSizeMultiplier(prev => Math.min(1.3, prev + 0.1))}
              className="p-1 hover:bg-rose-50 rounded-full text-slate-600 transition-colors cursor-pointer"
              title="Larger font"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 sm:px-2.5 sm:py-1.5 flex items-center gap-1 text-xs font-medium text-slate-700 bg-white/80 hover:bg-white rounded-full shadow-sm border border-rose-200 transition-all cursor-pointer"
            title="Copy letter to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Print / Save */}
          <button
            onClick={handlePrint}
            className="p-1.5 sm:px-2.5 sm:py-1.5 flex items-center gap-1 text-xs font-medium text-slate-700 bg-white/80 hover:bg-white rounded-full shadow-sm border border-rose-200 transition-all cursor-pointer"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Heart burst button */}
          <button
            onClick={triggerHeartBurst}
            className="p-1.5 text-rose-600 hover:text-rose-700 bg-white/80 hover:bg-white rounded-full shadow-sm border border-rose-200 transition-all cursor-pointer hover:scale-110 active:scale-95"
            title="Send love burst"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-600 animate-pulse" />
          </button>
        </div>
      </motion.div>

      {/* The Parchment Letter Sheet */}
      <motion.article
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.96 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-xl shadow-[0_20px_50px_rgba(80,12,24,0.18),0_4px_12px_rgba(80,12,24,0.06)] border border-rose-100/80 p-8 sm:p-12 md:p-14 overflow-hidden select-text paper-texture"
        style={{
          boxShadow: '0 25px 60px -15px rgba(90, 16, 30, 0.22), 0 8px 24px -6px rgba(90, 16, 30, 0.1)',
        }}
      >
        {/* Subtle romantic corner flourish watermark */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-100/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-rose-100/30 to-transparent pointer-events-none" />

        {/* Header: ♡ My sweet baby. ♡ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className={`text-3xl sm:text-4xl md:text-[42px] font-bold text-neutral-900 tracking-wide select-none ${
              fontMode === 'script' ? 'font-script' : 'font-cormorant font-semibold'
            }`}
          >
            {customTitle}
          </h2>
        </div>

        {/* Letter Body */}
        <div
          className={`space-y-5 sm:space-y-6 text-neutral-800 leading-[1.75] sm:leading-[1.85] text-justify hyphens-auto ${
            fontMode === 'script'
              ? 'font-script text-[21px] sm:text-[23px] md:text-[25px] font-medium tracking-wide'
              : 'font-cormorant text-[19px] sm:text-[21px] md:text-[22px] leading-relaxed'
          }`}
          style={{
            fontSize: `${
              (fontMode === 'script' ? 22 : 19) * fontSizeMultiplier
            }px`,
          }}
        >
          {customLetterText ? (
            customLetterText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="transition-all duration-200">
                {paragraph}
              </p>
            ))
          ) : (
            <>
              <p>
                I miss you so much, baby. I wish you knew how much. I think about you throughout the day, how often I catch myself wishing you were here, and how badly I want to hold you in my arms and never let you go. Sometimes, I just wish I could close my eyes and magically appear beside you, pull you close to me, kiss your forehead, and remind you of how incredibly loved you are.
              </p>

              <p>
                I miss your attention, your sweetness, your clinginess, your little habits, and everything that makes you you. I miss the way you make me smile without even trying, the way you make my heart feel so full, and how you somehow manage to make me fall even more in love with you every single day. You're genuinely my favorite person, my comfort, my happiness, and the girl I want to share all my little moments with.
              </p>

              <p>
                Baby, you're so incredibly amazing and smart, and I hope you never forget how special you are to me. I admire you more than I could ever explain, and I'm so proud of the person you are. Even when things get difficult, even when we're struggling, and even when the distance makes everything feel harder, I still want you. I still choose you. I still want to be right there beside you, loving you through everything life throws at us.
              </p>

              <p>
                I wish I could kiss your cheeks a thousand times, cuddle you until we both fall asleep, hold your hand while we talk about absolutely nothing, and annoy you with all the affection I have stored up for you. I want to be the person who makes you feel safe, appreciated, beautiful, and loved, even on the days when you don't feel your best. I want to remind you every day that you're my girl, my favorite girl, and the one my heart keeps choosing.
              </p>

              <p>
                Long distance is hard because I have so much love to give you, yet I can't always express it through hugs, kisses, and simply being there beside you. But please remember that no amount of distance could ever change how I feel about you. You're always in my thoughts, always in my heart, and always the person I wish I could run to whenever I miss you.
              </p>

              <p>
                I love you more than these words could ever explain, princess. I love your mind, your heart, your personality, your beautiful soul, and every little thing that makes you the girl I fell in love with. I'm so grateful that I met you, and if I could go back and live everything all over again, I'd still find my way to you every single time.
              </p>

              <p>
                So until I can finally hold you for real, just remember that somewhere, there's a boy who misses you endlessly, thinks about you constantly, and loves you more than he could ever put into words. A boy who wants to give you all the kisses, cuddles, reassurance, and affection you've ever wanted. A boy who will keep chasing you, keep loving you, and keep standing beside you through everything.
              </p>

              <p>
                I miss you so much, my beautiful girl. I wish you were here with me, but until that day comes, I'll keep loving you from here, counting down the moments until I can finally hold you close.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <p className="font-semibold text-neutral-900">
                  Forever missing you, forever choosing you, and forever loving you, my sweetest girl.
                </p>

                {/* Hand-drawn open heart as present in Image 3 bottom-right */}
                <div className="self-end sm:self-auto select-none pr-2">
                  <svg
                    viewBox="0 0 60 55"
                    className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-900 inline-block stroke-current fill-none stroke-[2.4]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 48 C 28 46, 5 32, 5 18 C 5 9, 13 4, 21 4 C 26 4, 28 7, 30 10 C 32 7, 34 4, 39 4 C 47 4, 55 9, 55 18 C 55 32, 32 46, 30 48 Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.article>

      {/* Floating Animated Hearts Spawned on Click */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: '75vh', scale: 0.5, rotate: heart.rotate }}
            animate={{ opacity: 0, y: '-10vh', scale: 1.3, rotate: heart.rotate + 20 }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1], delay: heart.delay }}
            style={{
              position: 'absolute',
              left: `${heart.left}%`,
              width: heart.size,
              height: heart.size,
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-rose-600 text-rose-700 drop-shadow-md">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Sweet bottom indicator */}
      <div className="mt-8 text-center print:hidden">
        <button
          onClick={triggerHeartBurst}
          className="inline-flex items-center gap-2 text-sm sm:text-base text-[#671625] hover:text-white font-medium bg-white/90 hover:bg-[#671625] active:bg-[#52101c] px-6 py-2.5 rounded-full shadow-md border border-rose-200/90 transition-all cursor-pointer group active:scale-95"
        >
          <span className="group-hover:scale-125 transition-transform text-base sm:text-lg">❤️</span>
          <span>Click to send extra love</span>
          <span className="group-hover:scale-125 transition-transform text-base sm:text-lg">❤️</span>
        </button>
      </div>
    </div>
  );
};
