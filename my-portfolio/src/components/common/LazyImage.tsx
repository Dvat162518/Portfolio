import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  onClick?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = 'bg-gray-200 dark:bg-gray-700',
  onClick 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 ${placeholderColor} animate-pulse rounded-full`}
          />
        )}
      </AnimatePresence>
      
      <motion.img
        src={imageSrc}
        alt={alt}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? 'blur(0px)' : 'blur(10px)'
        }}
        transition={{ duration: 0.5 }}
        className={`w-full h-full object-cover rounded-full`}
      />
    </div>
  );
};

export default LazyImage;