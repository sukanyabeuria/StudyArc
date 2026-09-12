import React, { useState, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Radio,
  RotateCcw,
  Sparkles,
  ListMusic
} from 'lucide-react';

export default function MusicRoomWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState('');
  const [activeVideoId, setActiveVideoId] = useState('');
  const [activePreset, setActivePreset] = useState(null);

  // Audio element for built-in 24/7 LoFi Radio stream (high reliability)
  const audioRef = useRef(null);
  const LOFI_STREAM_URL = 'https://streams.ilovemusic.de/iloveradio17.mp3';

  // Curated, tested study stations
  const PRESET_STATIONS = [
    {
      id: '5qap5aO4i9A',
      name: 'Lofi Girl',
      tag: 'Beats to relax/study'
    },
    {
      id: 'DWcJFNfaw9c',
      name: 'Synthwave',
      tag: 'Chill beats'
    },
    {
      id: 'rUxyKA_-grg',
      name: 'Cozy Cafe',
      tag: 'Coffee shop vibes'
    }
  ];

  const toggleRadioPlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If YouTube was active, close it so sounds don't overlap
      setActiveVideoId('');
      setActivePreset(null);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Stream play prevented:', e));
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  /**
   * Flexible YouTube parser supporting:
   * - standard: youtube.com/watch?v=ID
   * - short: youtu.be/ID
   * - live: youtube.com/live/ID
   * - embed: youtube.com/embed/ID
   * - direct 11-char ID
   */
  const extractVideoId = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Direct 11-character ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    // Standard URL patterns
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
    const match = trimmed.match(regExp);
    return match ? match[1] : null;
  };

  const handlePlayYoutube = (e) => {
    e?.preventDefault();
    const videoId = extractVideoId(youtubeInput);

    if (videoId) {
      // Stop radio stream if playing
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setActiveVideoId(videoId);
      setActivePreset(null);
    } else {
      alert('Please enter a valid YouTube video URL or 11-character video ID (e.g. https://www.youtube.com/watch?v=5qap5aO4i9A)');
    }
  };

  const handleSelectPreset = (preset) => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setActiveVideoId(preset.id);
    setActivePreset(preset.id);
  };

  const handleClosePlayer = () => {
    setActiveVideoId('');
    setActivePreset(null);
  };

  return (
    <div className="bg-focus-900/90 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
      {/* Background Radio Stream Audio */}
      <audio
        ref={audioRef}
        src={LOFI_STREAM_URL}
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-orange-400" />
          <h3 className="text-base font-bold text-white">Music Room</h3>
        </div>

        <div className="flex items-center gap-1.5">
          {activeVideoId && (
            <button
              onClick={handleClosePlayer}
              className="text-[11px] font-medium text-orange-400 hover:text-orange-300 px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20"
              title="Return to ambient room view"
            >
              Close Video
            </button>
          )}
          <button
            onClick={() =>
              window.open(
                activeVideoId
                  ? `https://www.youtube.com/watch?v=${activeVideoId}`
                  : 'https://www.youtube.com/watch?v=5qap5aO4i9A',
                '_blank'
              )
            }
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Open in YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Player Screen / Cozy Thumbnail */}
      <div className="relative rounded-xl overflow-hidden mb-2.5 border border-zinc-800/80 bg-zinc-950 aspect-video flex items-center justify-center group shadow-md">
        {activeVideoId ? (
          <iframe
            key={activeVideoId}
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&enablejsapi=1&rel=0`}
            title="FocusNest LoFi YouTube Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src="/lofi-bg.jpg"
              alt="LoFi Study Scene"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Play Button for Built-in Stream */}
            <button
              onClick={toggleRadioPlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Preset Radio Stations (Quick 1-Click Launch) */}
      <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-1">
        {PRESET_STATIONS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 flex items-center gap-1.5 ${
              activePreset === preset.id
                ? 'bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/30'
                : 'bg-focus-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
            }`}
          >
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Track Info & Built-in Radio Volume */}
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
            <span>{activeVideoId ? 'YouTube Study Player' : 'LoFi Study Beats'}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying || activeVideoId ? 'bg-orange-500 animate-ping' : 'bg-zinc-600'
              }`}
            />
          </h4>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
            <Radio className="w-3 h-3 text-orange-400" />
            <span>{activeVideoId ? 'Custom Stream Active' : '24/7 Chill Radio'}</span>
          </p>
        </div>

        {/* Volume */}
        {!activeVideoId && (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 accent-orange-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Custom YouTube URL Form (Matching Mockup) */}
      <form onSubmit={handlePlayYoutube} className="flex items-center gap-2">
        <input
          type="text"
          value={youtubeInput}
          onChange={(e) => setYoutubeInput(e.target.value)}
          placeholder="Paste YouTube URL or ID..."
          className="flex-1 bg-focus-850 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-sm shadow-orange-500/30 transition-all active:scale-95 shrink-0"
        >
          Play
        </button>
      </form>
    </div>
  );
}
