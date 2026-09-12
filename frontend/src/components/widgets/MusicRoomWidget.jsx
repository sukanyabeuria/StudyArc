import React, { useState, useRef, useEffect } from 'react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Radio,
  Sparkles,
  ListMusic,
  X,
  Headphones,
  Coffee,
  CloudRain,
  Moon,
  Flame,
  Zap
} from 'lucide-react';

export default function MusicRoomWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState('');
  const [activeVideoId, setActiveVideoId] = useState('');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioRef = useRef(null);

  // Curated LoFi Stations & Soundscapes
  const STATIONS = [
    {
      id: 'lofi-1',
      title: 'Lofi Girl - Chill Beats',
      category: 'LoFi Hip-Hop',
      icon: Headphones,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      youtubeId: '5qap5aO4i9A'
    },
    {
      id: 'lofi-2',
      title: 'Chillhop Live Radio',
      category: 'Study & Work',
      icon: Coffee,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      youtubeId: 'jfKfPfyJRdk'
    },
    {
      id: 'synthwave',
      title: 'Synthwave Chill Radio',
      category: 'Retro Electro',
      icon: Zap,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      youtubeId: 'DWcJFNfaw9c'
    },
    {
      id: 'cozy-cafe',
      title: 'Cozy Rain & Coffee Shop',
      category: 'Ambience',
      icon: CloudRain,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      youtubeId: 'rUxyKA_-grg'
    },
    {
      id: 'night-coding',
      title: 'Late Night Coding LoFi',
      category: 'Deep Focus',
      icon: Moon,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      youtubeId: '1nueKGeqB6I'
    },
    {
      id: 'campfire',
      title: 'Campfire & Peaceful Nature',
      category: 'Calm Soundscape',
      icon: Flame,
      streamUrl: 'https://streams.ilovemusic.de/iloveradio17.mp3',
      youtubeId: 'M5QY2_8704o'
    }
  ];

  const currentStation = STATIONS[currentTrackIndex];

  // Sync volume on audio element
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
      setActiveVideoId(''); // Stop YouTube when starting radio
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Stream play blocked:', e));
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
      alert('Please enter a valid YouTube link or 11-character video ID.');
    }
  };

  const handleCloseVideo = () => {
    setActiveVideoId('');
  };

  return (
    <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3.5 shadow-xl flex flex-col justify-between h-full overflow-hidden text-zinc-100">
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
            <span className="text-[10px] text-zinc-500 font-medium">LoFi & Soundscapes</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {activeVideoId ? (
            <button
              onClick={handleCloseVideo}
              className="flex items-center gap-1 text-[10px] font-semibold text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 px-2 py-0.5 rounded-md transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Close Video</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
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
                className="w-14 accent-orange-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Center Display: Video Player OR Active Station Banner */}
      {activeVideoId ? (
        <div className="relative rounded-xl overflow-hidden mb-2 border border-zinc-800 bg-black aspect-video shrink-0">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&enablejsapi=1&rel=0`}
            title="FocusNest LoFi Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isPlaying ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-zinc-900 text-zinc-400'}`}>
              {isPlaying ? <Radio className="w-4 h-4 animate-pulse" /> : <Music className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{currentStation.title}</h4>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-zinc-700'}`} />
                <span>{isPlaying ? 'Playing Live' : 'Ready to Play'}</span>
                <span>·</span>
                <span className="text-orange-400">{currentStation.category}</span>
              </p>
            </div>
          </div>

          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/30 active:scale-95 transition-all shrink-0"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>
        </div>
      )}

      {/* Station List with VISIBLE SCROLL BAR (Requested by User) */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-semibold px-1">
          <span>STATIONS & PLAYLISTS</span>
          <span>{STATIONS.length} available</span>
        </div>

        {/* Scrollable Container with Custom Scrollbar */}
        <div className="custom-scrollbar overflow-y-auto max-h-[110px] space-y-1 pr-1.5">
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
                    <Play className="w-2.5 h-2.5 text-zinc-600 hover:text-zinc-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* YouTube Custom Link Input Form */}
      <form onSubmit={handlePlayYoutube} className="flex items-center gap-1.5 pt-1 border-t border-zinc-850">
        <input
          type="text"
          value={youtubeInput}
          onChange={(e) => setYoutubeInput(e.target.value)}
          placeholder="Paste YouTube study URL or ID..."
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
  );
}
