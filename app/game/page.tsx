'use client';

import {useEffect, useRef, useState} from 'react';
import {Game} from './components/game';
import {Button, Heading} from '@chakra-ui/react';

export default function IndexPage() {
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
      {/* <Heading as="h1" size="xl">
        Game Page
      </Heading>
      <canvas ref={canvasRef} />
      <Button onClick={handleStart}>Start Game</Button> */}
      
    </>
  );
}
