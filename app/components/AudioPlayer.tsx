import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faVolumeUp,
  faVolumeMute,
  faHeart 
} from '@fortawesome/free-solid-svg-icons';

interface AudioPlayerProps {
  className?: string;
}

export default function AudioPlayer({ className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    audio.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`audio-player wedding-card p-6 bg-gradient-to-br from-rose-50/80 to-amber-50/80 border-rose-200/40 ${className}`}>
      <audio
        ref={audioRef}
        src="/Lana.mp3"
        preload="metadata"
      />
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <FontAwesomeIcon icon={faHeart} className="text-rose-400 text-lg animate-pulse" />
          <h3 className="text-xl font-elegant font-medium text-rose-800">Our Song</h3>
          <FontAwesomeIcon icon={faHeart} className="text-rose-400 text-lg animate-pulse" />
        </div>
        <p className="text-rose-600 font-serif text-base">Young and Beautiful - Lana Del Rey</p>
      </div>

      {/* Main Controls */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-12 h-12 bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 
                     rounded-full flex items-center justify-center text-white shadow-soft 
                     hover:shadow-dreamy transition-all duration-300 hover:scale-105 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FontAwesomeIcon 
              icon={isPlaying ? faPause : faPlay} 
              className="text-lg ml-0.5" 
            />
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercentage}
              onChange={handleProgressChange}
              disabled={isLoading}
              className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer
                         slider:bg-gradient-to-r slider:from-rose-400 slider:to-amber-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, 
                  rgb(251 113 133) 0%, 
                  rgb(251 191 36) ${progressPercentage}%, 
                  rgb(251 207 232) ${progressPercentage}%, 
                  rgb(251 207 232) 100%)`
              }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-xs text-rose-600 mt-1 font-serif">
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : '0:00'}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-rose-100 hover:bg-rose-200 rounded-full flex items-center justify-center
                       text-rose-600 hover:text-rose-700 transition-all duration-300 hover:scale-105"
          >
            <FontAwesomeIcon 
              icon={isMuted ? faVolumeMute : faVolumeUp} 
              className="text-sm" 
            />
          </button>
          
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            className="w-16 h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                rgb(251 113 133) 0%, 
                rgb(251 113 133) ${isMuted ? 0 : volume * 100}%, 
                rgb(251 207 232) ${isMuted ? 0 : volume * 100}%, 
                rgb(251 207 232) 100%)`
            }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="flex items-center justify-center space-x-4 pt-2">
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-rose-300/40 rounded-full"></div>
        <div className="flex space-x-1.5">
          <div className="w-1.5 h-1.5 bg-rose-300/60 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-rose-300/40 rounded-full"></div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .audio-player input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(45deg, rgb(251 113 133), rgb(251 191 36));
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(251, 113, 133, 0.3);
          }
          
          .audio-player input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(45deg, rgb(251 113 133), rgb(251 191 36));
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px rgba(251, 113, 133, 0.3);
          }
          
          .audio-player input[type="range"]::-webkit-slider-track {
            height: 8px;
            border-radius: 4px;
          }
          
          .audio-player input[type="range"]::-moz-range-track {
            height: 8px;
            border-radius: 4px;
          }
        `
      }} />
    </div>
  );
}