import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Wedding celebration moment',
  className = '',
  containerClassName = '',
  fallbackLabel,
  objectFit = 'cover',
  objectPosition = 'center',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1C3A2C] to-[#12241C] text-[#FAF7F2] ${containerClassName}`}
      >
        <span className="text-2xl text-[#D6B368] mb-2 font-serif italic">B &amp; L</span>
        <p className="text-xs uppercase tracking-widest text-[#E5DCC8]/80 font-sans">
          {fallbackLabel || alt || 'Cherished Memory'}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        style={{ objectPosition }}
        className={`block w-full h-full ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
