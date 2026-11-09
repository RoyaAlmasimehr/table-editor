import { useRef, type PointerEvent } from "react";
import type { Position, Size } from "../types/table.types";
type UseDragProps = {
  position: Position;
  size: Size;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  pageRef: React.RefObject<HTMLDivElement | null>;
};

function useDrag({ position, size, setPosition, pageRef }: UseDragProps) {
  const dragStart = useRef({
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
  });

  const isDragging = useRef(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    event.preventDefault();

    isDragging.current = true;

    dragStart.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      x: position.x,
      y: position.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !pageRef.current) return;

    const deltaX = event.clientX - dragStart.current.mouseX;
    const deltaY = event.clientY - dragStart.current.mouseY;

    const maxX = Math.max(0, pageRef.current.clientWidth - size.width);
    const maxY = Math.max(0, pageRef.current.clientHeight - size.height);

    setPosition({
      x: Math.max(0, Math.min(dragStart.current.x + deltaX, maxX)),
      y: Math.max(0, Math.min(dragStart.current.y + deltaY, maxY)),
    });
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}

export default useDrag;