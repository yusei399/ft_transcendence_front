'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/lib/redux/hook';
import { jwtSelector } from '@/lib/redux';
import { useRouter } from 'next/navigation';
import Loading from '../components/global/Loading';
import { Game } from './components/game';

export default function IndexPage() {
  const authToken = useAppSelector(jwtSelector);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    // 認証トークンがない場合は認証ページへリダイレクト
    if (!authToken) {
      router.push('/auth');
      return;
    }

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 600;
      const newGame = new Game(canvas);
      setGame(newGame);
    }
  }, [authToken, router]);

  const handleStart = () => {
    game?.startGame();
  };

  // 認証トークンがない場合はローディング画面を表示
  if (!authToken) return <Loading />;

  // 認証トークンがある場合はゲーム画面を表示
  return (
    <>
      <h1>Game Page</h1>
      <canvas ref={canvasRef} />
      <button onClick={handleStart}>Start Game</button>
    </>
  );
}

