import React from 'react';
import { motion } from 'motion/react';
import { GlossyHeart } from './GlossyHeart';
import { romanticAudio } from '../utils/audio';

interface FloatingHeartsBackgroundProps {
  showFullConstellation?: boolean;
}

export const FloatingHeartsBackground: React.FC<FloatingHeartsBackgroundProps> = ({
  showFullConstellation = false,
}) => {
  // Static constellation matching Image 3 layout exactly
  const leftHearts = [
    { top: '24%', left: '7%', size: 74, rotation: 16, delay: 0 },
    { top: '39%', left: '13%', size: 66, rotation: 22, delay: 0.4 },
    { top: '44%', left: '2%', size: 58, rotation: -18, delay: 0.8 },
    { top: '59%', left: '6%', size: 54, rotation: 10, delay: 1.2 },
  ];

  const rightHearts = [
    { top: '10%', right: '17%', size: 76, rotation: -14, delay: 0.2 },
    { top: '21%', right: '7%', size: 64, rotation: 20, delay: 0.6 },
    { top: '25%', right: '23%', size: 68, rotation: 24, delay: 1.0 },
    { top: '59%', right: '15%', size: 76, rotation: -12, delay: 0.3 },
    { top: '70%', right: '8%', size: 62, rotation: 18, delay: 0.7 },
    { top: '76%', right: '19%', size: 66, rotation: 15, delay: 1.1 },
  ];

  const handleHeartClick = () => {
    romanticAudio.playHeartPop();
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-radial from-rose-200/40 via-rose-100/10 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Hearts Constellation (visible in Reading stage matching Image 3, and subtly in earlier stages) */}
      <div
        className={`w-full h-full transition-opacity duration-1000 ${
          showFullConstellation ? 'opacity-100' : 'opacity-25 sm:opacity-35'
        }`}
      >
        {/* Left Side Hearts */}
        {leftHearts.map((h, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute hidden md:block pointer-events-auto"
            style={{
              top: h.top,
              left: h.left,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [h.rotation, h.rotation + 4, h.rotation],
            }}
            transition={{
              duration: 4.5 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: h.delay,
            }}
          >
            <GlossyHeart
              size={h.size}
              rotation={h.rotation}
              interactive
              onClick={handleHeartClick}
            />
          </motion.div>
        ))}

        {/* Right Side Hearts */}
        {rightHearts.map((h, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute hidden md:block pointer-events-auto"
            style={{
              top: h.top,
              right: h.right,
            }}
            animate={{
              y: [0, -14, 0],
              rotate: [h.rotation, h.rotation - 5, h.rotation],
            }}
            transition={{
              duration: 4.8 + i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: h.delay,
            }}
          >
            <GlossyHeart
              size={h.size}
              rotation={h.rotation}
              interactive
              onClick={handleHeartClick}
            />
          </motion.div>
        ))}

        {/* Mobile floating hearts (fewer, well positioned at top/bottom corners so they don't block text) */}
        <div className="md:hidden">
          <motion.div
            className="absolute top-4 left-3 pointer-events-auto"
            animate={{ y: [0, -8, 0], rotate: [12, 16, 12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GlossyHeart size={44} rotation={12} interactive onClick={handleHeartClick} />
          </motion.div>
          <motion.div
            className="absolute top-4 right-3 pointer-events-auto"
            animate={{ y: [0, -10, 0], rotate: [-14, -18, -14] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GlossyHeart size={46} rotation={-14} interactive onClick={handleHeartClick} />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-4 pointer-events-auto"
            animate={{ y: [0, -8, 0], rotate: [15, 18, 15] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GlossyHeart size={48} rotation={15} interactive onClick={handleHeartClick} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
