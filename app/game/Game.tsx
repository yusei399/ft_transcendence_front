'use client';

import {useEffect, useRef, useState} from 'react';
import {VStack, Heading, Text, Flex} from '@chakra-ui/react';
import {CurrentGameData} from '@/lib/redux';
import {SocketService} from '@/services/websocket/socketService';
import {
  ballSizeToNumber,
  paddleHeightToNumber,
  paddleWidthToNumber,
} from '@/shared/HttpEndpoints/interfaces';

type PongCanvasProps = {
  gameId: number;
  currentGame: CurrentGameData;
};

export default function PongCanvas({gameId, currentGame}: PongCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paddleMove, setPaddleMove] = useState<'up' | 'down' | undefined>(undefined);
  const [dimensions, setdimensions] = useState({width: 0, height: 0});

  const resize = () => {
    const container = canvasRef.current?.parentElement;
    if (!container) return;

    const containerStyle = getComputedStyle(container);
    const containerPaddingX =
      parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
    const containerPaddingY =
      parseFloat(containerStyle.paddingTop) + parseFloat(containerStyle.paddingBottom);

    const maxWidth = container.clientWidth - containerPaddingX;
    const maxHeight = container.clientHeight - containerPaddingY;

    let width = maxWidth;
    let height = (width * 3) / 4;

    if (height > maxHeight) {
      height = maxHeight;
      width = (height * 4) / 3;
    }

    const canvasStyle = getComputedStyle(canvasRef.current);
    const canvasBorderX =
      parseFloat(canvasStyle.borderLeftWidth) + parseFloat(canvasStyle.borderRightWidth);
    const canvasBorderY =
      parseFloat(canvasStyle.borderTopWidth) + parseFloat(canvasStyle.borderBottomWidth);

    width -= canvasBorderX;
    height -= canvasBorderY;

    if (dimensions.width !== width || dimensions.height !== height) {
      setdimensions({width, height});
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    if (dimensions.width === 0 && dimensions.height === 0) resize();
    const context = canvas.getContext('2d');
    if (context) {
      drawEverything({
        context,
        w: canvas.width,
        h: canvas.height,
        state: currentGame,
      });
      window.addEventListener('keydown', handleKey);
      window.addEventListener('keyup', handleKey);
      window.addEventListener('resize', resize);
    }
    if (paddleMove) SocketService.emit('sendPlayerMove', {gameId, direction: paddleMove});
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKey);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, currentGame, paddleMove, dimensions]);

  const handleKey = (event: KeyboardEvent) => {
    if (event.type === 'keyup') setPaddleMove(undefined);
    else if (event.key === 'ArrowUp' || event.key === 'w') setPaddleMove('up');
    else if (event.key === 'ArrowDown' || event.key === 's') setPaddleMove('down');
  };

  return (
    <VStack padding={6} height="100%" width="100%">
      <Heading as="h1" size="lg">
        Game Page
      </Heading>
      <Flex height="80%" width="100%" justifyContent="center">
        <canvas
          ref={canvasRef}
          style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            backgroundColor: 'gray',
          }}
        />
      </Flex>
      <Text>Your score: {currentGame.me.score}</Text>
      <Text>Opponent's score: {currentGame.opponent.score}</Text>
    </VStack>
  );
}

type DrawEverythingProps = {
  context: CanvasRenderingContext2D;
  w: number;
  h: number;
  state: CurrentGameData;
};

const drawEverything = ({context, w, h, state}: DrawEverythingProps) => {
  const paddleHeight = h * paddleHeightToNumber(state.rules.paddleSize);
  const paddleWidth = w * paddleWidthToNumber(state.rules.paddleSize);
  const ballRadius = w * ballSizeToNumber(state.rules.ballSize);

  context.clearRect(0, 0, w, h);
  context.fillStyle = 'white';
  context.fillRect(0, 0, w, h);

  const leftPlayerPos = state.me.side === 'left' ? state.me.paddlePos : state.opponent.paddlePos;
  const rightPlayerPos = state.me.side === 'right' ? state.me.paddlePos : state.opponent.paddlePos;
  context.fillStyle = state.me.side === 'left' ? 'blue' : 'red';
  context.fillRect(0, leftPlayerPos * h - paddleHeight / 2, paddleWidth, paddleHeight);

  context.fillStyle = state.me.side === 'left' ? 'red' : 'blue';
  context.fillRect(
    w - paddleWidth,
    rightPlayerPos * h - paddleHeight / 2,
    paddleWidth,
    paddleHeight,
  );

  context.beginPath();
  context.arc(state.ball.x * w, state.ball.y * h, ballRadius, 0, Math.PI * 2);
  context.fillStyle = 'black';
  context.fill();
  context.closePath();

  if (state.countdown) {
    context.font = '60px Arial';
    context.fillStyle = 'gray';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText((state.countdown / 1000).toFixed(1), w / 2, h / 2);
  }
};
