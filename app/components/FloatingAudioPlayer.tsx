import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faVolumeUp,
  faVolumeMute,
  faMusic
} from '@fortawesome/free-solid-svg-icons';

interface FloatingAudioPlayerProps {
  className?: string;
}

export default function FloatingAudioPlayer({ className = '' }: FloatingAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
    
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedData = () => setIsLoading(false);
    const handleError = (e: any) => {
      console.error('Audio loading error:', e);
      setIsLoading(false);
    };

    // Set initial loading to false after a short delay if metadata doesn't load
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // iOS Audio Unlock Logic
    const unlockAudioForIOS = async () => {
      if (iOS && !audioUnlocked) {
        try {
          await audio.play();
          audio.pause();
          audio.currentTime = 0;
          setAudioUnlocked(true);
          console.log('Audio unlocked for iOS');
        } catch (error) {
          console.log('Audio unlock failed, will try again on user interaction');
        }
      }
    };

    // Try to unlock audio immediately
    unlockAudioForIOS();

    // Add listeners for user interaction to unlock audio
    const unlockOnInteraction = () => {
      if (iOS && !audioUnlocked) {
        unlockAudioForIOS();
      }
    };

    document.addEventListener('touchstart', unlockOnInteraction, { once: true });
    document.addEventListener('touchend', unlockOnInteraction, { once: true });
    document.addEventListener('click', unlockOnInteraction, { once: true });

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      clearTimeout(fallbackTimer);
      document.removeEventListener('touchstart', unlockOnInteraction);
      document.removeEventListener('touchend', unlockOnInteraction);
      document.removeEventListener('click', unlockOnInteraction);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUnlocked]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // For iOS, try to unlock audio first
        if (isIOS && !audioUnlocked) {
          try {
            await audio.play();
            audio.pause();
            audio.currentTime = 0;
            setAudioUnlocked(true);
          } catch (unlockError) {
            console.log('Failed to unlock audio on iOS');
          }
        }

        // Ensure the audio is ready
        if (audio.readyState < 2) {
          setIsLoading(true);
          
          // Wait for audio to be ready or timeout after 3 seconds
          const readyPromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('loadeddata', onCanPlay);
              reject(new Error('Audio load timeout'));
            }, 3000);
            
            const onCanPlay = () => {
              clearTimeout(timeout);
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('loadeddata', onCanPlay);
              resolve(true);
            };
            
            audio.addEventListener('canplay', onCanPlay);
            audio.addEventListener('loadeddata', onCanPlay);
          });
          
          try {
            await readyPromise;
          } catch {
            console.log('Audio not ready, attempting to play anyway');
          }
          
          setIsLoading(false);
        }
        
        // Set volume for iOS (sometimes gets reset)
        audio.volume = isMuted ? 0 : volume;
        
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio play error:', error);
      setIsLoading(false);
      setIsPlaying(false);
      
      // Show user-friendly error for iOS
      if (isIOS) {
        alert('Audio playback blocked. Please try tapping the play button again.');
      }
    }
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
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <audio
        ref={audioRef}
        src="/lana.mp3"
        preload="none"
        playsInline
        controls={false}
        crossOrigin="anonymous"
      />
      
      {/* Compact Player */}
      <div className="bg-gradient-to-r from-rose-500/90 to-amber-500/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 transition-all duration-300">
        {!isExpanded ? (
          /* Collapsed State */
          <div className="flex items-center space-x-3 p-3">
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white 
                         transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FontAwesomeIcon 
                  icon={isPlaying ? faPause : faPlay} 
                  className="text-sm ml-0.5" 
                />
              )}
            </button>
            
            <div className="text-white">
              <FontAwesomeIcon icon={faMusic} className="text-sm animate-pulse" />
            </div>
            
            <button
              onClick={() => setIsExpanded(true)}
              className="text-white/70 hover:text-white text-xs px-2 py-1 hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {isIOS && !audioUnlocked ? 'Tap to Unlock' : 'Our Song'}
            </button>
          </div>
        ) : (
          /* Expanded State */
          <div className="p-4 min-w-[320px]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white">
                <p className="text-sm font-medium">Young and Beautiful</p>
                <p className="text-xs text-white/70">Lana Del Rey</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/70 hover:text-white text-xs px-2 py-1 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white 
                           transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FontAwesomeIcon 
                    icon={isPlaying ? faPause : faPlay} 
                    className="text-sm ml-0.5" 
                  />
                )}
              </button>
              
              <div className="flex-1">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-1">
                  <div 
                    className="h-full bg-white/80 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration ? formatTime(duration) : '0:00'}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="w-6 h-6 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <FontAwesomeIcon 
                    icon={isMuted ? faVolumeMute : faVolumeUp} 
                    className="text-xs" 
                  />
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer volume-slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .volume-slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
          
          .volume-slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
        `
      }} />
    </div>
  );
}