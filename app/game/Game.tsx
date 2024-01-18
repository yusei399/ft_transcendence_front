/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {useEffect, useRef, useState} from 'react';
import {Game} from './components/game';
import {Button, VStack, Heading} from '@chakra-ui/react';

export default function GameView(): JSX.Element {
  const screenWidth = window.innerWidth / 2;
  const screenHeight = window.innerHeight / 2;
  const [ballPosition, setBallPosition] = useState({
    x: screenWidth / 2,
    y: screenHeight / 2,
    speedX: 2,
    speedY: 2,
  });
  const [player1Y, setPlayer1Y] = useState(screenHeight / 2 - 40);
  const [player2Y, setPlayer2Y] = useState(screenHeight / 2 - 40);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const newGame = new Game(canvas);
      setGame(newGame);
    }
  }, []);

  const handleStart = (): void => {
    game?.startGame();
  };

  return (
    <VStack padding={6} height="100%">
      <Heading as="h1" size="lg">
        Game Page
      </Heading>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid gray',
          padding: '10px',
          margin: '10px',
          width: '80%',
          height: '80%',
        }}
      />
      <Button onClick={handleStart}>Start Game</Button>
    </VStack>
  );
}
