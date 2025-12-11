import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Settings
  const SLIDE_DURATION = 6000; // ms

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = Date.now();

    const animate = () => {
      if (!isPaused) {
        const now = Date.now();
        const delta = now - lastTime;
        lastTime = now;

        setProgress(prev => {
          const newProgress = prev + (delta / SLIDE_DURATION) * 100;
          if (newProgress >= 100) {
            setCurrentSlide(curr => (curr + 1) % HERO_SLIDES.length);
            return 0;
          }
          return newProgress;
        });
      } else {
        lastTime = Date.now(); // Prevent jump when unpausing
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Reset progress when slide changes manually
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    setProgress(0);
  };

  return (
    <section 
      className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="University Highlights Carousel"
    >
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image with Parallax-like Ken Burns */}
            <div className="absolute inset-0 overflow-hidden">
               <div 
                className={`w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear transform origin-center ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
            
            {/* Modern Gradient Overlay: Darker at bottom/left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center p-6 md:p-12 lg:p-20">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Text Content - Left Aligned */}
                <div className="lg:col-span-8 flex flex-col justify-center text-left">
                  {/* We use a specific key on the inner div to trigger re-animations on slide change */}
                  <div key={`text-${currentSlide}-${index}`} className={`${isActive ? 'block' : 'hidden'}`}>
                    
                    <div className="overflow-hidden mb-4">
                      <h2 className="text-lg md:text-xl font-medium text-aucdt-gold tracking-[0.2em] uppercase animate-fade-in-down">
                        {slide.title}
                      </h2>
                    </div>

                    <div className="overflow-hidden mb-8">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] font-sans animate-fade-in-up animation-delay-200 drop-shadow-lg">
                        {slide.subtitle}
                      </h1>
                    </div>
                    
                    <div className="animate-fade-in-up animation-delay-400">
                      <a 
                        href={slide.ctaLink}
                        className="group/btn inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 text-base font-bold rounded-lg hover:bg-aucdt-gold hover:border-aucdt-gold hover:text-aucdt-maroon transition-all duration-300 uppercase tracking-wide shadow-lg"
                      >
                        {slide.ctaText}
                        <ArrowRight size={20} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modern Navigation Controls */}
      
      {/* 1. Side List Navigation (Desktop) */}
      <div className="absolute right-0 top-0 bottom-0 hidden lg:flex flex-col justify-center px-8 z-30 w-1/4 bg-gradient-to-l from-black/60 to-transparent">
        <div className="space-y-6">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`group flex items-center justify-end w-full text-right transition-all duration-300 outline-none ${
                index === currentSlide ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <span className={`mr-4 text-sm font-medium text-white transition-all duration-300 ${
                 index === currentSlide ? 'translate-x-0' : 'translate-x-2 group-hover:translate-x-0'
              }`}>
                {slide.subtitle.split(' ').slice(0, 3).join(' ')}...
              </span>
              <div className={`h-0.5 transition-all duration-300 ${
                index === currentSlide ? 'w-12 bg-aucdt-gold h-1' : 'w-6 bg-white group-hover:w-8'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* 2. Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-800/50 z-30">
         <div 
           className="h-full bg-aucdt-gold shadow-[0_0_10px_rgba(255,203,5,0.7)]"
           style={{ width: `${progress}%`, transition: isPaused ? 'none' : 'width 100ms linear' }}
         />
      </div>

      {/* 3. Mobile Arrows & Indicators */}
      <div className="absolute bottom-8 left-0 right-0 lg:hidden flex justify-between items-center px-6 z-30">
         <div className="flex space-x-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-aucdt-gold' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
         </div>
         <div className="flex gap-4">
            <button 
                onClick={prevSlide} 
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-aucdt-gold hover:text-aucdt-maroon transition-colors border border-white/20 active:scale-95"
            >
               <ChevronLeft size={20} />
            </button>
            <button 
                onClick={nextSlide} 
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-aucdt-gold hover:text-aucdt-maroon transition-colors border border-white/20 active:scale-95"
            >
               <ChevronRight size={20} />
            </button>
         </div>
      </div>
    </section>
  );
};

export default HeroSlider;