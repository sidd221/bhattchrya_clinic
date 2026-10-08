import React, { useState } from 'react';
import './ShinyText.css';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2.5,
  className = '',
  color = '#153A2A',
  shineColor = '#82D9A9',
  spread = 120,
  pauseOnHover = false,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    // Pass CSS variables for keyframe animation timing
    ['--shiny-speed' as string]: `${speed}s`,
    ['--shiny-delay' as string]: `${delay}s`,
  };

  return (
    <span
      className={`shiny-text ${pauseOnHover && isHovered ? 'paused' : ''} ${className}`}
      style={disabled ? undefined : gradientStyle}
      onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
    >
      {text}
    </span>
  );
};

export default ShinyText;
