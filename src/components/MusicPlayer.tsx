import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Heart, ExternalLink } from 'lucide-react';
import { STORY_CONFIG } from '../config';
import { sounds } from '../utils/sound';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lazy Audio init
    const audio = new Audio(STORY_CONFIG.audioTrackUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Start on first user interaction if not playing
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    sounds.playSparkle();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  };

  return (
    <>
      {/* Floating Glass Control Bar */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="interactive glass-button flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-[#E75480] hover:text-[#444444]"
          title={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
        >
          <Music className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline font-heading tracking-wide">
            {isPlaying ? "Music Playing ❤️" : "Play Music"}
          </span>
          {isPlaying && (
            <span className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-[#E75480] rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-[#FF8DB3] rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-[#E75480] rounded-full animate-pulse delay-150" />
            </span>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="interactive glass-button p-2.5 rounded-full text-[#E75480] hover:text-[#444444]"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={() => {
            sounds.playSparkle();
            setShowSpotifyModal(true);
          }}
          className="interactive glass-button p-2.5 rounded-full text-[#E75480] hover:text-[#444444]"
          title="Our Spotify Soundtrack"
        >
          <Heart className="w-4 h-4 fill-[#E75480]" />
        </button>
      </div>

      {/* Spotify Playlist Modal */}
      {showSpotifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="relative glass-panel rounded-3xl p-6 max-w-md w-full border border-white/80 shadow-2xl animate-float">
            <button
              onClick={() => setShowSpotifyModal(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#E75480] text-sm font-semibold p-1"
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <span className="font-title text-3xl text-[#E75480] block">Our Love Song</span>
              <p className="text-xs text-[#666666] font-body mt-1">
                A special track dedicated to Siddikuna & Maha ❤️
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md my-4 border border-[#FFD6E8]">
              <iframe
                src={STORY_CONFIG.spotifyUrl.includes('/embed/') ? STORY_CONFIG.spotifyUrl : STORY_CONFIG.spotifyUrl.replace('open.spotify.com/', 'open.spotify.com/embed/')}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Soundtrack"
              ></iframe>
            </div>

            <a
              href={STORY_CONFIG.spotifyUrl.replace('/embed', '')}
              target="_blank"
              rel="noreferrer"
              className="interactive glass-button w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-[#E75480] mt-2"
            >
              Open in Spotify App <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
