import React, { useState, useEffect, useRef } from 'react';
import { PLAYLIST_TRACKS } from '../data/mockData';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc, ExternalLink, List, X, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [playerReady, setPlayerReady] = useState(false);
  const [isTracklistOpen, setIsTracklistOpen] = useState(false);

  const playerRef = useRef<any>(null);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  
  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  const track = PLAYLIST_TRACKS[currentTrackIndex];

  // Load YouTube Iframe API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current) return;
      try {
        playerRef.current = new window.YT.Player('yt-player-element', {
          height: '0',
          width: '0',
          videoId: PLAYLIST_TRACKS[0].youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0,
            loop: 1,
          },
          events: {
            onReady: (event: any) => {
              setPlayerReady(true);
              event.target.setVolume(80);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Auto-advance to next song in playlist automatically
                const nextIdx = (currentTrackIndexRef.current + 1) % PLAYLIST_TRACKS.length;
                changeTrack(nextIdx);
              }
            },
          },
        });
      } catch (err) {
        console.warn('YouTube Player init error:', err);
      }
    }
  }, []);

  const changeTrack = (index: number) => {
    setCurrentTrackIndex(index);
    soundEngine.playBell(); // Immediate audible feedback
    
    if (playerRef.current && playerReady && playerRef.current.loadVideoById) {
      try {
        playerRef.current.loadVideoById(PLAYLIST_TRACKS[index].youtubeId);
        setIsPlaying(true);
      } catch (e) {
        console.warn('Failed to load YouTube video:', e);
      }
    } else {
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    soundEngine.playBell();
    if (!playerRef.current || !playerReady || !playerRef.current.playVideo) {
      setIsPlaying(!isPlaying);
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST_TRACKS.length;
    changeTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length;
    changeTrack(prevIdx);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (playerRef.current && playerReady && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVol);
      if (newVol === 0) {
        playerRef.current.mute();
        setIsMuted(true);
      } else if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[96%] max-w-4xl z-40">
      
      {/* YouTube Hidden Container */}
      <div id="yt-player-element" className="hidden"></div>

      {/* Quick Flexible Track Switcher Bar */}
      <div className="mb-1.5 flex items-center justify-between gap-1 overflow-x-auto py-0.5 px-1 no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider bg-stone-950/80 px-2 py-0.5 rounded-lg border border-orange-500/20">
            📻 Fast Track Switch:
          </span>
          {PLAYLIST_TRACKS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => changeTrack(idx)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all border shadow-md active:scale-95 ${
                idx === currentTrackIndex
                  ? 'bg-orange-500 text-stone-950 border-orange-300 font-black'
                  : 'bg-stone-900/90 text-stone-300 hover:text-white border-white/10 hover:border-orange-500/50'
              }`}
            >
              Song {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Tracklist Popover Drawer */}
      {isTracklistOpen && (
        <div className="mb-2 bg-stone-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl max-h-60 overflow-y-auto z-50 text-stone-100 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
                Kisku Cassette Tracklist ({PLAYLIST_TRACKS.length} Songs)
              </span>
            </div>
            <button
              onClick={() => setIsTracklistOpen(false)}
              className="p-1 rounded-lg bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            {PLAYLIST_TRACKS.map((t, index) => {
              const isSelected = index === currentTrackIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    changeTrack(index);
                    setIsTracklistOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-stone-950 font-bold shadow-md'
                      : 'bg-stone-950/60 hover:bg-stone-800/80 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-xs font-mono w-5 ${isSelected ? 'text-stone-950 font-black' : 'text-stone-500'}`}>
                      0{index + 1}
                    </span>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm truncate font-medium">{t.title}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-stone-900' : 'text-stone-400'}`}>
                        {t.artist} • {t.album}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-stone-950 font-bold' : 'text-stone-500'}`}>
                      {t.duration}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-stone-950" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Glassmorphism Responsive Player Bar */}
      <div className="bg-stone-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 text-stone-100">
        
        {/* Track Metadata & Cover */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial">
          
          {/* Cassette / Cover Thumbnail */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-stone-950 border border-white/10 overflow-hidden flex-shrink-0 shadow-lg group">
            <img
              src={track.coverUrl}
              alt={track.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-110 rotate-3' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center">
              <Disc className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-400 ${isPlaying ? 'animate-spin-slow' : ''}`} />
            </div>
          </div>

          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-orange-400 font-bold tracking-widest uppercase">
                TRACK 0{currentTrackIndex + 1}
              </span>
              <span className="bg-orange-600 text-stone-950 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded tracking-wider uppercase">
                YOUTUBE
              </span>
            </div>
            <p className="text-stone-100 font-bold text-xs sm:text-sm truncate">
              {track.title}
            </p>
            <p className="text-stone-400 text-[10px] sm:text-xs truncate">
              {track.artist}
            </p>
          </div>

        </div>

        {/* Audio Visualizer Spectrum Bars (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 px-2">
          {[40, 70, 30, 90, 60, 100, 50, 80, 40, 70].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-orange-600 to-orange-400 rounded-full transition-all duration-300"
              style={{
                height: isPlaying ? `${Math.max(8, (h * Math.sin(Date.now() * 0.005 + i)))}px` : '6px',
              }}
            ></div>
          ))}
        </div>

        {/* Player Controls & Volume */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Select Tracklist Button */}
          <button
            onClick={() => setIsTracklistOpen(!isTracklistOpen)}
            className={`p-2 rounded-xl border transition-all active:scale-95 flex items-center gap-1 text-xs font-bold ${
              isTracklistOpen
                ? 'bg-orange-500 border-orange-300 text-stone-950'
                : 'bg-stone-950 hover:bg-stone-800 text-orange-300 border-white/10'
            }`}
            title="Open Tracklist Menu"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">Tracks</span>
          </button>

          {/* Track Skip Prev */}
          <button
            onClick={handlePrev}
            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-orange-400 transition-all border border-white/10 active:scale-95 flex items-center gap-1 text-xs font-mono font-bold"
            title="Previous Track"
          >
            <SkipBack className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-black shadow-xl border border-orange-300 transition-transform active:scale-90 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider"
            title={isPlaying ? 'Pause Playlist' : 'Play Track'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-stone-950" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>

          {/* Track Skip Next */}
          <button
            onClick={handleNext}
            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-orange-400 transition-all border border-white/10 active:scale-95 flex items-center gap-1 text-xs font-mono font-bold"
            title="Next Track"
          >
            <span className="hidden sm:inline">Next</span>
            <SkipForward className="w-4 h-4 text-orange-400" />
          </button>

          {/* Volume Slider (Hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-stone-950/60 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => handleVolumeChange(isMuted ? 80 : 0)}
              className="text-stone-400 hover:text-orange-400 transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-stone-300" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-14 sm:w-16 accent-orange-500 cursor-pointer"
            />
          </div>

          {/* Direct YouTube Link */}
          <a
            href={`https://youtu.be/${track.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-orange-300 hover:text-white transition-all border border-white/10 flex items-center gap-1 text-xs font-bold shadow-lg"
            title={`Open ${track.title} on YouTube`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

        </div>

      </div>

    </div>
  );
};

