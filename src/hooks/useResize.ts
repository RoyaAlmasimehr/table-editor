import { useRef, type PointerEvent } from "react";
import type { Position, Size } from "../types/table.types";

const MIN_WIDTH = 200;
const MIN_HEIGHT = 100;

type UseResizeProps = {
  position: Position;
  size: Size;
  setSize: (size: Size) => void;
  setPosition: (position: Position) => void;
  pageRef: React.RefObject<HTMLDivElement | null>;
};

type ResizeStart = {
  mouseX: number;
  mouseY: number;
  size: Size;
  position: Position;
};

function useResize({
  position,
  size,
  setSize,
  setPosition,
  pageRef,
}: UseResizeProps) {
 
  const start = useRef<ResizeStart | null>(null);

  const handleResizeStart = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);

    start.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      size,
      position,
    };
  };

  const handleResizeMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = start.current;
    const page = pageRef.current;
    if (!s || !page) return;

    const deltaX = e.clientX - s.mouseX;
    const deltaY = e.clientY - s.mouseY;


    const maxWidth = s.position.x + s.size.width;
    const maxHeight = page.clientHeight - s.position.y;

    const width = clamp(s.size.width - deltaX, MIN_WIDTH, maxWidth);
    const height = clamp(s.size.height + deltaY, MIN_HEIGHT, maxHeight);

    setSize({ width, height });
    setPosition({ x: maxWidth - width, y: s.position.y });
  };

  const handleResizeEnd = () => {
    start.current = null;
  };

  return { handleResizeStart, handleResizeMove, handleResizeEnd };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(min, max), Math.min(max, value));
}

export default useResize;
