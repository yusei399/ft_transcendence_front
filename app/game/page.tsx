'use client';

import {useEffect, useRef, useState} from 'react';
import {Game} from './components/game';
import {Button, Heading} from '@chakra-ui/react';
import Ball from './components/Ball';

export default function IndexPage() {
  const screenWidth = window.innerWidth / 2;
  const screenHeight = window.innerHeight / 2;
  const [ballPosition, setBallPosition] = useState({ x: screenWidth / 2, y: screenHeight / 2, speedX: 2, speedY: 2 });
  const [player1Y, setPlayer1Y] = useState(screenHeight / 2 - 40);
  const [player2Y, setPlayer2Y] = useState(screenHeight / 2 - 40);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [game, setGame] = useState<Game | null>(null);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     canvas.width = 800;
  //     canvas.height = 600;
  //     const newGame = new Game(canvas);
  //     setGame(newGame);
  //   }
  // }, []);

  // const handleStart = () => {
  //   game?.startGame();
  // };

  return (
    <>
      <Heading as="h1" size="xl">
        Game Page
      </Heading>
      <svg width={screenWidth} height={screenHeight} style={{ border: '1px solid black' }}>
      <Ball 
        x={ballPosition.x} 
        y={ballPosition.y} 
        radius={10}
        speedX={ballPosition.speedX}
        speedY={ballPosition.speedY}
        // onMove={handleBallMove} 
      />
      </svg>
    </>
  );
}
