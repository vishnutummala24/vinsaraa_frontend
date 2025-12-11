import React, { useState, useEffect } from 'react';

export default function LoaderScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        {/* Animated ring */}
       
        
        {/* Brand name - small size */}
        <div className="relative px-4">
          <h1 
            className="text-sm md:text-base font-bold tracking-[0.25em] animate-pulse"
            style={{ 
              color: '#440504',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}
          >
            VINSARAA
          </h1>
          
      
        </div>

      
      </div>
    </div>
  );
}