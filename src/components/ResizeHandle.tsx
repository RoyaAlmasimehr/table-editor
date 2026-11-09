import type { PointerEvent } from "react";

type Props = {
  onStart: (e: PointerEvent<HTMLDivElement>) => void;
  onMove: (e: PointerEvent<HTMLDivElement>) => void;
  onEnd: (e: PointerEvent<HTMLDivElement>) => void;
};

function ResizeHandle({ onStart, onMove, onEnd }: Props) {
  return (
    <div
      className="resize-handle"
      onPointerDown={onStart}
      onPointerMove={onMove}
      onPointerUp={onEnd}
      onPointerCancel={onEnd}
    />
  );
}

export default ResizeHandle;
