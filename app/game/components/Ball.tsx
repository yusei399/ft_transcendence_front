import React, { useEffect, useState } from 'react';

type BallProps = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
//   onMove: (x: number, y: number) => void;
};

const Ball: React.FC<BallProps> = ({ x, y, radius, speedX, speedY }) => {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({ x: prev.x + speedX, y: prev.y + speedY }));
    }, 16); // approximately 60 FPS

    return () => clearInterval(interval);
  }, [speedX, speedY]);

//   useEffect(() => {
//     onMove(position.x, position.y);
//   }, [position, onMove]);

  return <circle cx={position.x} cy={position.y} r={radius} fill="white" />;
};

export default Ball;
