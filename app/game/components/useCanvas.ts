import {useRef, useEffect} from 'react';

type Draw<T = unknown> = (context: CanvasRenderingContext2D, drawData: T) => void;

const useCanvas = <T>(draw: Draw<T>, drawData: T) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    const render = () => {
      draw(context, drawData);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, drawData]);
  return canvasRef;
};
export default useCanvas;
