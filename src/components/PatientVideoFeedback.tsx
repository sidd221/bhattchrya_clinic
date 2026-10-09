import React, { useState, useRef, useCallback } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const VIDEO_ITEMS = [
  {
    id: 'feedback-1',
    videoSrc: '/feedback-1.mp4',
    posterSrc: '/feedback-1-poster.jpg',
  },
  {
    id: 'feedback-2',
    videoSrc: '/feedback-2.mp4',
    posterSrc: '/feedback-2-poster.jpg',
  },
  {
    id: 'feedback-3',
    videoSrc: '/feedback-3.mp4',
    posterSrc: '/feedback-3-poster.jpg',
  },
];

export const PatientVideoFeedback: React.FC = () => {
  // Track which video is currently playing (only one video allowed at a time)
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mutedState, setMutedState] = useState<{ [key: string]: boolean }>({
    'feedback-1': false,
    'feedback-2': false,
    'feedback-3': false,
  });

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Pause all other videos when any video starts playing
  const pauseOtherVideos = useCallback((currentId: string) => {
    VIDEO_ITEMS.forEach((item) => {
      if (item.id !== currentId) {
        const otherVid = videoRefs.current[item.id];
        if (otherVid && !otherVid.paused) {
          otherVid.pause();
        }
      }
    });
  }, []);

  const handlePlayRequest = async (id: string) => {
    // 1. Enforce only one video playing at a time
    pauseOtherVideos(id);

    const vid = videoRefs.current[id];
    if (!vid) return;

    // 2. Ensure audio is explicitly unmuted & volume is max (1.0)
    const isMuted = mutedState[id] ?? false;
    vid.muted = isMuted;
    vid.volume = 1.0;

    try {
      await vid.play();
      setActiveId(id);
    } catch {
      // If browser policy blocks unmuted programmatic play, fallback to muted play
      try {
        vid.muted = true;
        setMutedState((prev) => ({ ...prev, [id]: true }));
        await vid.play();
        setActiveId(id);
      } catch (err) {
        console.error('Video playback failed:', err);
      }
    }
  };

  const handleToggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;

    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    if (!nextMuted) {
      vid.volume = 1.0;
    }
    setMutedState((prev) => ({ ...prev, [id]: nextMuted }));
  };

  const handleNativePlay = (id: string) => {
    pauseOtherVideos(id);
    setActiveId(id);
  };

  const handleNativePause = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
    }
  };

  return (
    <div id="patient-videos" className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-[#E8E1D5]/80">
      {/* Heading Just Above Videos */}
      <ScrollReveal direction="up" distance={20}>
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
              Real Experiences
            </span>
            <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#153A2A] tracking-tight mb-3">
            What Our Patients Say
          </h3>

          <p className="text-sm sm:text-base text-[#4E5E57] leading-relaxed">
            Watch genuine feedback and recovery journeys shared by patients treated at Dr. B. Bhattacharyya Clinic.
          </p>
        </div>
      </ScrollReveal>

      {/* 3 Pure Vertical Video Frames Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto px-4">
        {VIDEO_ITEMS.map((item) => {
          const isPlaying = activeId === item.id;
          const isMuted = mutedState[item.id] ?? false;

          return (
            <div
              key={item.id}
              className="relative w-full max-w-[340px] aspect-[9/16] mx-auto rounded-2xl overflow-hidden bg-[#0A1B13] border border-[#D5CABC]/40 shadow-2xl flex items-center justify-center group"
            >
              {/* Ambient blurred backdrop using lightweight poster for seamless color blending */}
              <img
                src={item.posterSrc}
                aria-hidden="true"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-125 select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-[#07130D]/40 pointer-events-none" />

              {/* HTML5 Video Element with preload="none" and full audio support */}
              <video
                ref={(el) => {
                  videoRefs.current[item.id] = el;
                }}
                src={item.videoSrc}
                poster={item.posterSrc}
                preload="none"
                playsInline
                controls={isPlaying}
                className="relative z-10 w-full h-full object-contain"
                onPlay={() => handleNativePlay(item.id)}
                onPause={() => handleNativePause(item.id)}
                onEnded={() => handleNativePause(item.id)}
                onVolumeChange={(e) => {
                  const target = e.currentTarget;
                  setMutedState((prev) => ({
                    ...prev,
                    [item.id]: target.muted || target.volume === 0,
                  }));
                }}
              />

              {/* Floating Audio Control (Icon only, zero text) */}
              {isPlaying && (
                <button
                  type="button"
                  onClick={(e) => handleToggleMute(item.id, e)}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95 hover:bg-black/80 cursor-pointer shadow-lg"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-300" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#D4B07B]" />
                  )}
                </button>
              )}

              {/* Sleek Play Button Overlay (Zero text) */}
              {!isPlaying && (
                <div
                  onClick={() => handlePlayRequest(item.id)}
                  className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer select-none transition-opacity duration-300"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#D4B07B] text-[#0A1B13] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientVideoFeedback;
