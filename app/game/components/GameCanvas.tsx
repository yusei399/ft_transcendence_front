import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import useCanvas from './useCanvas';
import {GameData} from '@/lib/redux';
import {
  ballSizeToNumber,
  paddleHeightToNumber,
  paddleWidthToNumber,
} from '@/shared/HttpEndpoints/interfaces';
import {SocketService} from '@/services/websocket/socketService';

type CanvasDimensions = {
  width: number;
  height: number;
};
type PaddleMoveDir = 'up' | 'down';

type DrawProps = {state: GameData};

function GameCanvas({gameData}: {gameData: GameData}) {
  const canvasRef = useCanvas<DrawProps>(draw, {state: gameData});
  const [dimensions, setdimensions] = useState<CanvasDimensions>({height: 0, width: 0});
  const [paddleMove, setPaddleMove] = useState<PaddleMoveDir | undefined>(undefined);
  const [isEventSet, setIsEventSet] = useState(false);

  const handleKey = (event: KeyboardEvent) => {
    if (event.type === 'keyup') setPaddleMove(undefined);
    else if (event.key === 'ArrowUp' || event.key === 'w') setPaddleMove('up');
    else if (event.key === 'ArrowDown' || event.key === 's') setPaddleMove('down');
  };

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    if (dimensions.height === 0 && dimensions.width === 0)
      resize(canvas, dimensions, setdimensions);
    let intervalId: NodeJS.Timeout | undefined;
    if (!isEventSet) {
      window.addEventListener('resize', () => resize(canvas, dimensions, setdimensions));
      setIsEventSet(true);
      window.addEventListener('keydown', handleKey);
      window.addEventListener('keyup', handleKey);
    }
    if (paddleMove) {
      intervalId = setInterval(() => {
        if (paddleMove) SocketService.emit('sendPlayerMove', {gameId, direction: paddleMove});
        else clearInterval(intervalId);
      }, 1000 / 60);
    }
    return () => {
      if (isEventSet) {
        setIsEventSet(false);
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('keyup', handleKey);
        window.removeEventListener('resize', () => resize(canvas, dimensions, setdimensions));
      }
      if (intervalId) clearInterval(intervalId);
    };
  }, [canvasRef, dimensions, paddleMove, isEventSet]);

  const gameId = gameData.gameId;

  return (
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
  );
}

const draw = (context: CanvasRenderingContext2D, {state}: DrawProps) => {
  const w = context.canvas.width;
  const h = context.canvas.height;
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

const resize = (
  canvasRef: HTMLCanvasElement,
  dimensions: CanvasDimensions,
  setdimensions: Dispatch<SetStateAction<CanvasDimensions>>,
) => {
  const container = canvasRef.parentElement;
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

  const canvasStyle = getComputedStyle(canvasRef);
  const canvasBorderX =
    parseFloat(canvasStyle.borderLeftWidth) + parseFloat(canvasStyle.borderRightWidth);
  const canvasBorderY =
    parseFloat(canvasStyle.borderTopWidth) + parseFloat(canvasStyle.borderBottomWidth);

  width -= canvasBorderX;
  height -= canvasBorderY;
  if (width <= 0) width = 1;
  if (height <= 0) height = 1;
  if (dimensions.width !== width || dimensions.height !== height) {
    setdimensions({width, height});
  }
};

export default GameCanvas;
