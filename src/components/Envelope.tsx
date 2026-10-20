import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WaxSeal } from './WaxSeal';

interface EnvelopeProps {
  stage: 'sealed' | 'opened' | 'reading';
  onOpenFlap: () => void;
  onReadLetter: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  stage,
  onOpenFlap,
  onReadLetter,
}) => {
  const isClosed = stage === 'sealed';
  const isFlapOpen = stage === 'opened' || stage === 'reading';

  return (
    <div className="relative w-full max-w-[460px] sm:max-w-[530px] aspect-[1.42/1] mx-auto select-none">
      {/* Outer Envelope Glow & Shadow */}
      <div className="absolute inset-0 rounded-2xl bg-[#3f0812] blur-2xl opacity-30 translate-y-8" />

      {/* Main Unified Envelope Container */}
      <div className="relative w-full h-full">

        {/* =========================================================
            1. OPENED TOP FLAP (Pointing upward when envelope opens)
           ========================================================= */}
        <AnimatePresence>
          {isFlapOpen && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'bottom center' }}
              className="absolute -top-[160px] sm:-top-[185px] left-0 w-full h-[165px] sm:h-[190px] z-10 pointer-events-none drop-shadow-[0_-10px_20px_rgba(30,4,9,0.35)]"
            >
              <svg
                viewBox="0 0 540 190"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Rich velvet gradient for open top flap pointing up */}
                  <linearGradient id="flapOpenGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#4c0d19" />
                    <stop offset="45%" stopColor="#5d1221" />
                    <stop offset="85%" stopColor="#691626" />
                    <stop offset="100%" stopColor="#751a2b" />
                  </linearGradient>

                  {/* Inner fold crease shadow */}
                  <linearGradient id="creaseShadow" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#250308" stopOpacity="0.55" />
                    <stop offset="25%" stopColor="#250308" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#250308" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Triangular flap apex pointing upward */}
                <polygon
                  points="0,190 270,0 540,190"
                  fill="url(#flapOpenGrad)"
                />

                {/* Crease shadow at the baseline */}
                <polygon
                  points="0,190 270,0 540,190"
                  fill="url(#creaseShadow)"
                />

                {/* Clean edge highlight */}
                <polyline
                  points="0,190 270,0 540,190"
                  fill="none"
                  stroke="#8f2336"
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================
            2. ENVELOPE BACK BODY & INTERIOR LINER
           ========================================================= */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#34060d] via-[#430913] to-[#4e0d19] overflow-hidden shadow-[0_20px_40px_rgba(40,5,12,0.4)]">
          {/* Interior liner depth & soft pattern */}
          <div className="w-full h-full opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#200207] to-transparent opacity-90" />
        </div>

        {/* =========================================================
            3. PEEKING LETTER SHEET - CLIPPED AT BOTTOM SO IT NEVER SHOWS "DOWN THERE"
           ========================================================= */}
        {/* This wrapper starts -190px above the envelope and ends exactly at bottom-0 rounded-b-2xl with overflow-hidden */}
        <div className="absolute inset-x-0 bottom-0 top-[-170px] sm:top-[-195px] overflow-hidden rounded-b-2xl pointer-events-none z-20">
          <AnimatePresence>
            {stage === 'opened' && (
              <motion.div
                key="letter-peek"
                initial={{ y: 220, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                onClick={onReadLetter}
                className="absolute left-1/2 -translate-x-1/2 top-10 sm:top-12 w-[86%] sm:w-[88%] h-[320px] sm:h-[350px] bg-white rounded-t-xl shadow-[0_12px_30px_rgba(0,0,0,0.22)] pointer-events-auto cursor-pointer hover:-translate-y-2 transition-transform duration-300 group overflow-hidden border border-rose-100/70"
              >
                {/* Visible letter preview matching Image 2 */}
                <div className="p-5 sm:p-7 pt-4 select-none bg-gradient-to-b from-white via-white to-rose-50/20 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-center mb-2.5">
                      <h3 className="font-script text-xl sm:text-2xl md:text-3xl text-neutral-900 font-bold tracking-wide">
                        ♡ My sweet baby. ♡
                      </h3>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 text-neutral-800 font-script text-sm sm:text-base leading-relaxed">
                      <p>
                        I miss you so much, baby. I wish you knew how much. I think about you throughout
                        the day, how often I catch myself wishing you were here, and how badly I want to
                        hold you in my arms and never let you go. Sometimes, I just wish I could close my
                        eyes and magically appear beside you, pull you close to me, kiss your forehead, and
                        remind you of how incredibly loved you are.
                      </p>
                      <p className="opacity-75 hidden sm:block">
                        I miss your attention, your sweetness, your clinginess, your little habits, and everything
                        that makes you you. I miss the way you make me smile without even trying...
                      </p>
                    </div>
                  </div>

                  {/* "Click to read full letter" prompt */}
                  <div className="pb-2 sm:pb-3 flex justify-center items-center pointer-events-none">
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-rose-900 bg-white/95 px-3 py-0.5 rounded-full shadow-sm border border-rose-200 group-hover:bg-rose-50 transition-colors">
                      Tap to open full letter ↗
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================
            4. FRONT FLAPS (Side and bottom flaps forming the pocket)
           ========================================================= */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-2xl">
          <svg
            viewBox="0 0 540 380"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sideLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#55101e" />
                <stop offset="100%" stopColor="#430b15" />
              </linearGradient>

              <linearGradient id="sideRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#55101e" />
                <stop offset="100%" stopColor="#430b15" />
              </linearGradient>

              <linearGradient id="bottomFlapGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#3f0812" />
                <stop offset="45%" stopColor="#4c0d19" />
                <stop offset="100%" stopColor="#5b1220" />
              </linearGradient>

              <filter id="pocketDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#230308" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Left triangular flap */}
            <polygon
              points="0,0 270,195 0,380"
              fill="url(#sideLeftGrad)"
            />

            {/* Right triangular flap */}
            <polygon
              points="540,0 270,195 540,380"
              fill="url(#sideRightGrad)"
            />

            {/* Bottom flap meeting at center V */}
            <polygon
              points="0,380 270,175 540,380"
              fill="url(#bottomFlapGrad)"
              filter="url(#pocketDropShadow)"
            />

            {/* Fold highlights */}
            <line
              x1="0"
              y1="380"
              x2="270"
              y2="175"
              stroke="#6b1626"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <line
              x1="540"
              y1="380"
              x2="270"
              y2="175"
              stroke="#6b1626"
              strokeWidth="1.5"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* =========================================================
            5. CLOSED TOP FLAP (With Golden Wax Seal)
           ========================================================= */}
        <AnimatePresence>
          {isClosed && (
            <motion.div
              initial={{ scaleY: 1, opacity: 1 }}
              exit={{
                scaleY: 0,
                opacity: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 left-0 w-full h-full z-40 cursor-pointer group"
              onClick={onOpenFlap}
            >
              <svg
                viewBox="0 0 540 380"
                className="w-full h-full overflow-visible drop-shadow-[0_12px_22px_rgba(20,2,6,0.5)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="flapClosedGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#661525" />
                    <stop offset="45%" stopColor="#56111e" />
                    <stop offset="100%" stopColor="#430a14" />
                  </linearGradient>

                  <linearGradient id="flapEdgeGleam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c1c2e" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8d2337" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#7c1c2e" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Downward pointing triangle flap */}
                <polygon
                  points="0,0 270,225 540,0"
                  fill="url(#flapClosedGrad)"
                />

                <polyline
                  points="0,0 270,225 540,0"
                  fill="none"
                  stroke="url(#flapEdgeGleam)"
                  strokeWidth="2.5"
                />
              </svg>

              {/* Golden Wax Seal pinned directly at the flap vertex */}
              <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <WaxSeal onClick={onOpenFlap} isOpening={!isClosed} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
