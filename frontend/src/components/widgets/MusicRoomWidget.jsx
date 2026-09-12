import React, { useState, useRef } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, ExternalLink, Radio } from 'lucide-react';

export default function MusicRoomWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [embedVideoId, setEmbedVideoId] = useState('');

  // Audio element for LoFi radio stream (Royalty-free Chill LoFi stream)
  const audioRef = useRef(null);

  // Reliable, cozy royalty-free live LoFi audio stream
  const LOFI_STREAM_URL = 'https://streams.ilovemusic.de/iloveradio17.mp3';

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
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
    if (newVol === 0) setIsMuted(true);
    else setIsMuted(false);
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

  const handlePlayYoutube = (e) => {
    e.preventDefault();
    if (!youtubeUrl.trim()) return;

    // Extract YouTube ID from standard URLs: watch?v=ID or youtu.be/ID
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      // Default to relaxing lofi stream ID if invalid
      videoId = 'jfKfPfyJRdk'; // Lofi Girl stream
    }

    setEmbedVideoId(videoId);
    // Pause HTML5 audio stream if playing
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-focus-900/90 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
      {/* Hidden Audio Stream Element */}
      <audio
        ref={audioRef}
        src={LOFI_STREAM_URL}
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-orange-400" />
          <h3 className="text-base font-bold text-white">Music Room</h3>
        </div>

        <button 
          onClick={() => window.open('https://www.youtube.com/watch?v=jfKfPfyJRdk', '_blank')}
          className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
          title="Open Lofi Girl on YouTube"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail Cover Scene / Embedded Player */}
      <div className="relative rounded-xl overflow-hidden mb-3 border border-zinc-800/80 bg-zinc-950 aspect-video flex items-center justify-center group shadow-md">
        {embedVideoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${embedVideoId}?autoplay=1`}
            title="YouTube LoFi Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src="/lofi-bg.jpg"
              alt="LoFi Study Scene"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Play Overlay Button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-orange-500/90 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all"
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

      {/* Track Info & Stream Controls */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
            <span>LoFi Study Beats</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          </h4>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
            <Radio className="w-3 h-3 text-orange-400" />
            <span>24/7 LoFi Radio Stream</span>
          </p>
        </div>

        {/* Volume Control */}
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
      </div>

      {/* YouTube Custom URL Input (Matching Mockup) */}
      <form onSubmit={handlePlayYoutube} className="flex items-center gap-2">
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="flex-1 bg-focus-850 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-sm shadow-orange-500/30 transition-all active:scale-95"
        >
          Play
        </button>
      </form>
    </div>
  );
}
