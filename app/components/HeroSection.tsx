import { useState, useEffect } from 'react';

interface HeroSectionProps {
  className?: string;
}

const weddingImages = [
  '/love.jpg',
  '/us.jpg', 
  '/them.jpg',
  '/them2.jpg',
  '/image.jpg',
  '/double2.jpg'
];

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlideEnabled || !imagesLoaded) return;
    
    const interval = setInterval(() => {
      setActiveImage(prev => (prev + 1) % weddingImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [autoSlideEnabled, imagesLoaded]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = weddingImages.map((imageSrc) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = imageSrc;
        });
      });
      
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    
    preloadImages();
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStartX(touch.clientX);
    setTouchEndX(touch.clientX);
    setAutoSlideEnabled(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;
    const touch = e.targetTouches[0];
    setTouchEndX(touch.clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || touchEndX === 0) {
      setTimeout(() => setAutoSlideEnabled(true), 3000);
      return;
    }
    
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 30;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setActiveImage(prev => (prev + 1) % weddingImages.length);
      } else {
        setActiveImage(prev => prev > 0 ? prev - 1 : weddingImages.length - 1);
      }
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
    setTimeout(() => setAutoSlideEnabled(true), 8000);
  };

  return (
    <div 
      className={`h-screen relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading state */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="text-amber-700 font-serif">Loading beautiful moments...</p>
          </div>
        </div>
      )}

      {/* Sliding background images */}
      <div className="absolute inset-0">
        {weddingImages.map((imageSrc, index) => (
          <div
            key={`hero-img-${index}`}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === activeImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url(${imageSrc})`,
              willChange: 'opacity'
            }}
          />
        ))}
      </div>
      
      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-rose-800/15 to-purple-200/5 z-20" />

      {/* Navigation dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {weddingImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveImage(index);
                setAutoSlideEnabled(false);
                setTimeout(() => setAutoSlideEnabled(true), 8000);
              }}
              className={`w-3 h-3 transition-all duration-300 ${
                index === activeImage
                  ? 'bg-white shadow-lg border-2 border-amber-200/50 scale-110'
                  : 'bg-white/60 hover:bg-white/80'
              } rounded-full`}
            />
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8 z-30">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-elegant font-medium mb-6 animate-fade-in-up drop-shadow-lg">
          Hummulkhair & Abdul-Hafeez
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-200/90 to-transparent mb-6 rounded-full animate-fade-in"></div>
        <p className="text-xl md:text-2xl font-serif font-light mb-3 animate-fade-in-delay text-amber-100 drop-shadow-md">December 14th, 2025</p>
        <p className="text-lg md:text-xl text-orange-100/95 mb-8 animate-fade-in-delay-2 font-sans font-light">Lagos, Nigeria</p>
        <p className="text-sm font-script text-2xl text-pink-200/90 animate-fade-in-delay-3 animate-float">#doubleHaffairs25</p>
      </div>

      {/* Scroll indicator - Mobile only */}
      <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center space-y-3 animate-bounce">
          <div className="w-7 h-11 border-2 border-amber-200/60 flex justify-center backdrop-blur-sm rounded-xl shadow-gentle">
            <div className="w-1.5 h-4 bg-amber-200/80 mt-2 animate-pulse rounded-full"></div>
          </div>
          <p className="text-orange-100/90 text-xs font-sans font-light tracking-wide">Scroll to explore</p>
          <div className="flex space-x-1.5">
            <div className="w-1.5 h-1.5 bg-pink-200/70 animate-pulse rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-pink-200/70 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-pink-200/70 animate-pulse rounded-full" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 1s ease-out 0.9s both;
        }
        
        .font-serif {
          font-family: 'Georgia', 'Times New Roman', serif;
        }
      `}</style>
    </div>
  );
}
