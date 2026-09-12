import React, { useState, useRef, useEffect } from 'react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Radio,
  X,
  Headphones,
  Coffee,
  Maximize2,
  Minimize2,
  Video
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

  // Exactly TWO default music stations as requested
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
    : `https://www.youtube.com/watch?v=${currentStation.defaultYoutubeId}`;

  // Content render function for both normal and fullscreen views
  const renderContent = (isModal = false) => (
    <div className={`flex flex-col justify-between h-full text-zinc-100 ${isModal ? 'max-w-3xl w-full p-6 bg-[#0b0c0f] border border-zinc-800 rounded-3xl shadow-2xl' : ''}`}>
      {/* Hidden Audio Stream */}
      <audio
        ref={audioRef}
        src={currentStation.streamUrl}
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <Music className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-none">Music Room</h3>
            <span className="text-[10px] text-zinc-500 font-medium">LoFi & YouTube</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Volume Control */}
          <button
            onClick={toggleMute}
            className="text-zinc-500 hover:text-zinc-300 p-1"
            title="Mute/Unmute"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-12 accent-orange-500 h-1 bg-zinc-800 rounded-lg cursor-pointer mr-1"
          />

          {/* Full Screen / Maximize Button */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1 rounded-md text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/80 transition-colors"
            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* YouTube Player Screen or Active Radio Banner */}
      {activeVideoId ? (
        <div className={`relative rounded-xl overflow-hidden mb-2 border border-zinc-800 bg-black ${isModal ? 'aspect-video w-full' : 'aspect-video'}`}>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&enablejsapi=1&rel=0`}
            title="FocusNest LoFi Player"
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
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isPlaying ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-zinc-900 text-zinc-400'}`}>
              {isPlaying ? <Radio className="w-3.5 h-3.5 animate-pulse" /> : <Music className="w-3.5 h-3.5" />}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{currentStation.title}</h4>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-zinc-700'}`} />
                <span>{isPlaying ? 'Live' : 'Ready'}</span>
                <span>·</span>
                <span className="text-orange-400">{currentStation.category}</span>
              </p>
            </div>
          </div>

          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30 active:scale-95 transition-all shrink-0"
          >
            {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
          </button>
        </div>
      )}

      {/* Exactly TWO Default Stations */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-semibold px-1">
          <span>STATIONS</span>
          <span>2 channels</span>
        </div>

        <div className="space-y-1">
          {STATIONS.map((station, idx) => {
            const Icon = station.icon;
            const isCurrent = currentTrackIndex === idx && !activeVideoId;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => selectStation(idx)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left ${
                  isCurrent
                    ? 'bg-orange-500/15 border border-orange-500/30 text-white font-semibold'
                    : 'bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-850/60'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-orange-400' : 'text-zinc-500'}`} />
                  <span className="truncate text-[11px]">{station.title}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] text-zinc-500 uppercase px-1.5 py-0.2 rounded bg-zinc-800">
                    {station.category}
                  </span>
                  {isCurrent && isPlaying ? (
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  ) : (
                    <Play className="w-2.5 h-2.5 text-zinc-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prominently Shown YouTube Link & Input Form (as requested) */}
      <div className="pt-2 border-t border-zinc-850 space-y-1.5">
        {/* Active YouTube Link Display */}
        <div className="flex items-center justify-between px-1 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Video className="w-3 h-3 text-red-500" />
            <span className="font-semibold text-zinc-300">YouTube Link:</span>
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

        {/* Input Form */}
        <form onSubmit={handlePlayYoutube} className="flex items-center gap-1.5">
          <input
            type="text"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="Paste YouTube URL or ID..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-semibold rounded-lg shadow-sm shadow-orange-500/30 active:scale-95 transition-all shrink-0"
          >
            Play
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Standard Compact Grid Card */}
      <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3 shadow-xl flex flex-col justify-between h-full overflow-hidden text-zinc-100">
        {renderContent(false)}
      </div>

      {/* Full Screen Modal View */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200">
          {renderContent(true)}
        </div>
      )}
    </>
  );
}
