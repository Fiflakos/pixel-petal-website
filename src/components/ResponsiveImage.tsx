
import React from 'react';
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  objectFit = 'cover'
}) => {
  return (
    <div className={cn("relative overflow-hidden w-full h-full", containerClassName)}>
      <img 
        src={src} 
        alt={alt} 
        className={cn(
          "w-full h-full transition-all duration-300",
          `object-${objectFit}`,
          className
        )}
        loading="lazy"
      />
    </div>
  );
};

export default ResponsiveImage;
