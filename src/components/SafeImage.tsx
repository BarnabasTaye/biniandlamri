import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Wedding celebration moment',
  className = '',
  containerClassName = '',
  fallbackLabel,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1C3A2C] to-[#12241C] text-[#FAF7F2] ${containerClassName}`}
      >
        <span className="text-2xl text-[#D6B368] mb-2 font-serif italic">L &amp; B</span>
        <p className="text-xs uppercase tracking-widest text-[#E5DCC8]/80 font-sans">
          {fallbackLabel || alt || 'Cherished Memory'}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#EFE9DC]/60 animate-pulse flex items-center justify-center">
          <span className="font-serif italic text-[#B68D40] text-sm tracking-wider">Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
