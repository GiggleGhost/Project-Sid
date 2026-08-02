import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Heart, ExternalLink, SkipForward, Radio } from 'lucide-react';
import { STORY_CONFIG } from '../config';
import { sounds } from '../utils/sound';
import { romanticSynth } from '../utils/romanticSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [usingSynthFallback, setUsingSynthFallback] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = STORY_CONFIG.romanticTracks || [
    { title: "Chopin - Nocturne Op. 9 No. 2", url: STORY_CONFIG.audioTrackUrl }
  ];

  const playCurrentTrack = async (index: number) => {
    // Stop synth if running
    romanticSynth.stop();
    setUsingSynthFallback(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const track = tracks[index];
    if (!track) return;

    const audio = new Audio(track.url);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // If MP3 fails to play (CORS/Network/Format issue), try next track or synth fallback
      if (index + 1 < tracks.length) {
        setCurrentTrackIndex(index + 1);
        playCurrentTrack(index + 1);
      } else {
        // Fallback to Web Audio romantic synth
        setUsingSynthFallback(true);
        romanticSynth.start();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Start on first user interaction if not playing
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        playCurrentTrack(0);
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      romanticSynth.stop();
    };
  }, []);

  const togglePlay = () => {
    sounds.playSparkle();
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      romanticSynth.stop();
      setIsPlaying(false);
    } else {
      if (usingSynthFallback) {
        romanticSynth.start();
        setIsPlaying(true);
      } else {
        playCurrentTrack(currentTrackIndex);
      }
    }
  };

  const nextTrack = () => {
    sounds.playSparkle();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    playCurrentTrack(nextIdx);
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
    if (muted) {
      romanticSynth.setVolume(0);
    } else {
      romanticSynth.setVolume(0.25);
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
          onClick={nextTrack}
          className="interactive glass-button p-2.5 rounded-full text-[#E75480] hover:text-[#444444]"
          title="Next Romantic Song"
        >
          <SkipForward className="w-4 h-4" />
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
          title="Our Soundtrack & Playlist"
        >
          <Heart className="w-4 h-4 fill-[#E75480]" />
        </button>
      </div>

      {/* Spotify & Romantic Soundtrack Modal */}
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
              <span className="font-title text-3xl text-[#E75480] block">Our Love Songs</span>
              <p className="text-xs text-[#666666] font-body mt-1">
                Special smooth romantic music dedicated to Sid & Maha ❤️
              </p>
            </div>

            {/* Select Local Romantic Track */}
            <div className="mb-4 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-[#FFD6E8]">
              <span className="text-xs font-semibold text-[#88586B] block mb-2 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#E75480]" /> Select Background Music:
              </span>
              <div className="space-y-1.5">
                {tracks.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentTrackIndex(i);
                      playCurrentTrack(i);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      currentTrackIndex === i && isPlaying && !usingSynthFallback
                        ? "bg-[#E75480] text-white font-medium"
                        : "bg-white/80 text-[#444444] hover:bg-[#FFD6E8]/50"
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    {currentTrackIndex === i && isPlaying && !usingSynthFallback && (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Playing</span>
                    )}
                  </button>
                ))}

                <button
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                    setUsingSynthFallback(true);
                    romanticSynth.start();
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    usingSynthFallback && isPlaying
                      ? "bg-[#E75480] text-white font-medium"
                      : "bg-white/80 text-[#444444] hover:bg-[#FFD6E8]/50"
                  }`}
                >
                  <span className="truncate">✨ Ambient Soft Romantic Piano Synth</span>
                  {usingSynthFallback && isPlaying && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Active</span>
                  )}
                </button>
              </div>
            </div>

            {/* Spotify Embed */}
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

