import React, { useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Disc3,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPlayerPopup, setShowPlayerPopup] = useState(false);

  // Exact YouTube video provided by user: https://www.youtube.com/watch?v=Rt9tW3cMLhI
  const YOUTUBE_VIDEO_ID = 'Rt9tW3cMLhI';
  const MOST_REPLAYED_START_SECONDS = 38; // Chorus: "You're a spark in the dark... And I want you more than any stupid song could ever say"

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Post message command to YouTube IFrame API
  const postCommand = (func: string, args: unknown[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const startPlayback = () => {
    setHasStarted(true);
    setIsPlaying(true);

    // Seek to the most replayed part (0:38) and play
    postCommand('seekTo', [MOST_REPLAYED_START_SECONDS, true]);
    postCommand('playVideo');
  };

  const pausePlayback = () => {
    setIsPlaying(false);
    postCommand('pauseVideo');
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  const replayHighlight = () => {
    setIsPlaying(true);
    postCommand('seekTo', [MOST_REPLAYED_START_SECONDS, true]);
    postCommand('playVideo');
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      postCommand('mute');
    } else {
      postCommand('unMute');
    }
  };

  // When envelope is unsealed, auto-trigger the song playback on mobile & desktop
  useEffect(() => {
    if (autoPlayTrigger && !hasStarted) {
      startPlayback();
    }
  }, [autoPlayTrigger]);

  return (
    <div className="relative z-40 flex flex-col items-end">
      {/* 
        Active Visible-in-Viewport YouTube Player.
        Positioned inside the viewport (opacity 0.05 on the page or 1px inside header)
        so mobile Safari & Android Chrome never throttle or freeze it as "offscreen"!
      */}
      <div
        className="absolute top-0 right-0 w-2 h-2 opacity-[0.02] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={
            isPlaying || autoPlayTrigger
              ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?start=${MOST_REPLAYED_START_SECONDS}&autoplay=1&playsinline=1&enablejsapi=1`
              : `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?start=${MOST_REPLAYED_START_SECONDS}&enablejsapi=1&playsinline=1`
          }
          title="Olivia Rodrigo - stupid song"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      </div>

      {/* Main Music Pill Container */}
      <div className="flex flex-col items-center sm:items-end">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-rose-200/80 shadow-[0_4px_14px_rgba(100,18,32,0.06)] transition-all hover:shadow-md">
          {/* Track Info with Spinning Vinyl */}
          <button
            onClick={() => setShowPlayerPopup(prev => !prev)}
            className="flex items-center gap-2 select-none text-left cursor-pointer group"
            title="Click to view player & chorus video"
          >
            <div className="relative">
              <Disc3
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 text-rose-700 transition-transform ${
                  isPlaying ? 'animate-spin' : 'group-hover:rotate-45'
                }`}
                style={{ animationDuration: '2.8s' }}
              />
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[11px] sm:text-xs font-semibold text-rose-950 truncate max-w-[100px] sm:max-w-[150px] leading-tight">
                  stupid song
                </span>
                <span className="text-[8px] sm:text-[9px] px-1 py-0.2 bg-rose-100 text-rose-800 rounded font-mono font-medium">
                  0:38
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-rose-700/80 leading-tight">
                Olivia Rodrigo
              </span>
            </div>
          </button>

          <div className="h-4 w-px bg-rose-200 mx-0.5" />

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlayback}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#671625] text-white hover:bg-[#7e1b2e]'
                : 'bg-rose-100 text-rose-900 hover:bg-rose-200 ring-2 ring-rose-300/60'
            }`}
            title={isPlaying ? 'Pause' : 'Play most replayed part of stupid song'}
            aria-label={isPlaying ? 'Pause' : 'Play song'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Replay Chorus Highlight */}
          <button
            onClick={replayHighlight}
            className="p-1 rounded-full text-rose-800 hover:bg-rose-100/60 transition-colors cursor-pointer"
            title="Replay most replayed chorus part (0:38)"
            aria-label="Replay chorus"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            className="p-1 rounded-full text-rose-800 hover:bg-rose-100/60 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* --- REQUIRED CAPTION UNDER PLAYER: "your favourite song" --- */}
        <div className="mt-1 px-2 flex items-center gap-1 select-none">
          <Sparkles className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
          <span className="font-script text-base sm:text-lg text-[#6c1527] font-bold tracking-wide italic">
            your favourite song
          </span>
          <span className="text-xs text-rose-500">♡</span>
        </div>
      </div>

      {/* Interactive Video Player & Most Replayed Section Card */}
      {showPlayerPopup && (
        <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-auto sm:right-0 sm:top-14 sm:w-96 bg-white rounded-2xl shadow-2xl border border-rose-200 p-4 z-50 animate-fade-in text-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100 mb-3">
            <div className="flex flex-col">
              <span className="font-title text-base text-rose-950 font-bold">
                stupid song
              </span>
              <span className="font-script text-sm text-[#7e172a] font-semibold">
                your favourite song
              </span>
            </div>
            <button
              onClick={() => setShowPlayerPopup(false)}
              className="text-xs text-slate-400 hover:text-slate-700 px-2 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* YouTube Video iframe directly at 0:38 */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?start=${MOST_REPLAYED_START_SECONDS}&autoplay=1&playsinline=1`}
              title="Olivia Rodrigo - stupid song (Most Replayed Part)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-3 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100 text-xs text-rose-900 leading-relaxed">
            <div className="font-semibold text-rose-950 mb-0.5 flex items-center gap-1">
              <span>🔥 Most Replayed Part (0:38)</span>
            </div>
            <p className="italic font-script text-base sm:text-lg text-rose-950 leading-tight">
              "You're a spark in the dark and my clothes will catch a flame... And I want you more than any stupid song could ever say"
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between pt-1">
            <button
              onClick={replayHighlight}
              className="inline-flex items-center gap-1.5 text-xs text-rose-800 hover:text-rose-950 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay from 0:38</span>
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}&t=38s`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#671625] hover:underline font-semibold"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
