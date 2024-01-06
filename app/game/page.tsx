'use client';

import {useEffect, useRef, useState} from 'react';
import {Game} from './components/game';
import {Button, VStack, Heading} from '@chakra-ui/react';

export default function IndexPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const newGame = new Game(canvas);
      setGame(newGame);
    }
  }, []);

  const handleStart = () => {
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
