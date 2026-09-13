import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Headphones,
  Coffee,
  Maximize2,
  Minimize2,
  Video,
  ExternalLink
} from 'lucide-react';

export default function MusicRoomWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState('');
  const [activeVideoId, setActiveVideoId] = useState('');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const audioRef = useRef(null);

  // Exactly TWO default music stations
  const STATIONS = [
    {
      id: 'lofi-girl',
      title: 'Lofi Girl - Chill Beats',
      category: 'LoFi Hip-Hop',
      icon: Headphones,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      defaultYoutubeId: '5qap5aO4i9A'
    },
    {
      id: 'cozy-cafe',
      title: 'Cozy Study Cafe',
      category: 'Study Ambience',
      icon: Coffee,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      defaultYoutubeId: 'rUxyKA_-grg'
    }
  ];

  const currentStation = STATIONS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setActiveVideoId(''); // Close YouTube if active
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Audio play error:', e));
    }
  };

  const selectStation = (index) => {
    setCurrentTrackIndex(index);
    setActiveVideoId('');

    if (audioRef.current) {
      audioRef.current.src = STATIONS[index].streamUrl;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const extractVideoId = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
    const match = trimmed.match(regExp);
    return match ? match[1] : null;
  };

  const handlePlayYoutube = (e) => {
    e.preventDefault();
    const id = extractVideoId(youtubeInput);
    if (id) {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setActiveVideoId(id);
    } else {
      alert('Please enter a valid YouTube video link or 11-character video ID.');
    }
  };

  const handleCloseVideo = () => {
    setActiveVideoId('');
  };

  const activeYoutubeUrl = activeVideoId
    ? `https://www.youtube.com/watch?v=${activeVideoId}`
    : currentStation.defaultYoutubeId
    ? `https://www.youtube.com/watch?v=${currentStation.defaultYoutubeId}`
    : '';

  return (
    <>
      {/* Singleton Audio Stream */}
      <audio
        ref={audioRef}
        src={currentStation.streamUrl}
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Standard Compact Grid Card */}
      <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3 shadow-xl flex flex-col justify-between h-full overflow-hidden text-zinc-100">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-sm shadow-orange-500/10">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white font-syne leading-none">Lo-Fi Lounge</h3>
              <span className="text-[10px] text-zinc-400 font-medium">Ambient Radio & YouTube</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Volume Control */}
            <div className="flex items-center gap-1 bg-zinc-950/80 px-2 py-0.5 rounded-lg border border-zinc-800/80">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-orange-400 transition-colors"
                title="Mute/Unmute"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-10 accent-orange-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Full Screen Button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-1 rounded-lg text-zinc-400 hover:text-orange-400 hover:bg-zinc-850/80 transition-colors"
              title="Open Bigger Window (Full Screen)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 min-h-0 flex flex-col justify-between gap-2 mb-1">
          {/* Active Player Banner */}
          {activeVideoId ? (
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black aspect-video max-h-[110px]">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&enablejsapi=1&rel=0`}
                title="StudyArc LoFi Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={handleCloseVideo}
                className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white p-1 rounded-full backdrop-blur-sm border border-zinc-700"
                title="Close video"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${isPlaying ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/30' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>
                  {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-3.5">
                      <span className="w-0.5 bg-white rounded-full animate-pulse h-2.5" />
                      <span className="w-0.5 bg-white rounded-full animate-pulse [animation-delay:0.2s] h-3.5" />
                      <span className="w-0.5 bg-white rounded-full animate-pulse [animation-delay:0.4s] h-2" />
                    </div>
                  ) : (
                    <Music className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{currentStation.title}</h4>
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                    <span className={isPlaying ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>{isPlaying ? 'Streaming Now' : 'Paused'}</span>
                    <span>·</span>
                    <span className="text-orange-400 font-medium">{currentStation.category}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30 active:scale-95 transition-all shrink-0 ml-2 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
            </div>
          )}

          {/* Dual Station Selector */}
          <div className="grid grid-cols-2 gap-2">
            {STATIONS.map((station, idx) => {
              const Icon = station.icon;
              const isCurrent = currentTrackIndex === idx && !activeVideoId;
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => selectStation(idx)}
                  className={`p-2 rounded-xl text-left transition-all flex items-center justify-between border cursor-pointer ${
                    isCurrent
                      ? 'bg-orange-500/15 border-orange-500/40 text-white shadow-sm shadow-orange-500/10'
                      : 'bg-zinc-950/60 hover:bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-850'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${isCurrent ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[11px] truncate font-bold ${isCurrent ? 'text-orange-300' : 'text-zinc-300'}`}>
                        {station.title.split('-')[0].trim()}
                      </p>
                      <span className="text-[9px] text-zinc-500 block truncate">{station.category}</span>
                    </div>
                  </div>

                  {isCurrent && isPlaying ? (
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping shrink-0 ml-1" />
                  ) : (
                    <Play className="w-2.5 h-2.5 text-zinc-600 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* YouTube Link & Input */}
        <div className="shrink-0 pt-2 border-t border-zinc-850/80 space-y-1.5">
          {activeYoutubeUrl && (
            <div className="flex items-center justify-between px-1 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Video className="w-3 h-3 text-red-500" />
                <span className="font-semibold text-zinc-300">YouTube:</span>
              </span>
              <a
                href={activeYoutubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:text-orange-300 underline truncate max-w-[170px] flex items-center gap-0.5"
                title={activeYoutubeUrl}
              >
                <span className="truncate">{activeYoutubeUrl.replace('https://www.', '')}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
              </a>
            </div>
          )}

          <form onSubmit={handlePlayYoutube} className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <Video className="w-3 h-3 text-red-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder="Paste YouTube stream or ID..."
                className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl pl-7 pr-2.5 py-1 text-[11px] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[11px] font-bold rounded-xl shadow-sm shadow-orange-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              Play
            </button>
          </form>
        </div>
      </div>

      {/* Bigger Fullscreen Window (Portaled to document.body to avoid parent container bounds) */}
      {isFullScreen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFullScreen(false);
          }}
        >
          <div className="w-full max-w-4xl max-h-[90vh] bg-[#0c0e15] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto custom-scrollbar text-zinc-100 relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-syne flex items-center gap-2.5">
                    <span>Lo-Fi Lounge & Ambient Music Room</span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-sans">
                      Study Sanctuary
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    Curated 24/7 focus radio stations and custom YouTube audio ambience
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Volume Control */}
                <div className="flex items-center gap-2 bg-zinc-950/90 px-3 py-1.5 rounded-xl border border-zinc-800">
                  <button
                    onClick={toggleMute}
                    className="text-zinc-400 hover:text-orange-400 transition-colors"
                    title="Mute/Unmute"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-orange-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-zinc-400 min-w-[28px]">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                </div>

                {/* Exit Fullscreen Button */}
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-700/80 rounded-xl text-xs font-semibold text-zinc-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  title="Close Fullscreen (Esc)"
                >
                  <Minimize2 className="w-4 h-4 text-orange-400" />
                  <span>Exit Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Main Stage */}
            <div className="py-6 space-y-6">
              {activeVideoId ? (
                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-black aspect-video max-h-[460px] w-full shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&enablejsapi=1&rel=0`}
                    title="StudyArc LoFi Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={handleCloseVideo}
                    className="absolute top-3.5 right-3.5 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-xl backdrop-blur-sm border border-zinc-700 flex items-center gap-1.5 text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Return to Lo-Fi Radio</span>
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all ${isPlaying ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-500/30' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}>
                      {isPlaying ? (
                        <div className="flex items-end gap-1 h-6">
                          <span className="w-1 bg-white rounded-full animate-pulse h-4" />
                          <span className="w-1 bg-white rounded-full animate-pulse [animation-delay:0.2s] h-6" />
                          <span className="w-1 bg-white rounded-full animate-pulse [animation-delay:0.4s] h-3" />
                          <span className="w-1 bg-white rounded-full animate-pulse [animation-delay:0.1s] h-5" />
                        </div>
                      ) : (
                        <Music className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white font-syne">{currentStation.title}</h3>
                      <div className="flex items-center gap-2.5 mt-1.5">
                        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                        <span className={`text-xs font-semibold ${isPlaying ? 'text-emerald-400' : 'text-zinc-500'}`}>
                          {isPlaying ? 'Live Audio Stream Active' : 'Stream Paused'}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-xs text-orange-400 font-medium">{currentStation.category}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </button>
                </div>
              )}

              {/* Dual Radio Stations Selection Grid */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Curated Focus Radio Stations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {STATIONS.map((station, idx) => {
                    const Icon = station.icon;
                    const isCurrent = currentTrackIndex === idx && !activeVideoId;
                    return (
                      <button
                        key={station.id}
                        type="button"
                        onClick={() => selectStation(idx)}
                        className={`p-4 rounded-2xl text-left transition-all flex items-center justify-between border cursor-pointer ${
                          isCurrent
                            ? 'bg-orange-500/15 border-orange-500/50 text-white shadow-lg shadow-orange-500/10'
                            : 'bg-zinc-950/70 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isCurrent ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-zinc-900 text-zinc-500'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-bold truncate ${isCurrent ? 'text-orange-300' : 'text-zinc-200'}`}>
                              {station.title}
                            </p>
                            <span className="text-xs text-zinc-500">{station.category} • 24/7 Live Stream</span>
                          </div>
                        </div>
                        {isCurrent && isPlaying ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping shrink-0" />
                        ) : (
                          <Play className="w-4 h-4 text-zinc-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* YouTube Custom Stream Input */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-semibold text-zinc-300">
                    <Video className="w-4 h-4 text-red-500" />
                    Custom YouTube Stream
                  </span>
                  {activeYoutubeUrl && (
                    <a
                      href={activeYoutubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400 hover:text-orange-300 underline flex items-center gap-1 text-xs"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <form onSubmit={handlePlayYoutube} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Video className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={youtubeInput}
                      onChange={(e) => setYoutubeInput(e.target.value)}
                      placeholder="Paste YouTube stream URL or video ID (e.g. lofi hip hop, rain sounds, cozy cafe ambience)..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    Play Stream
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
