import { useCallback, useRef, useState } from "react";
import useDrag from "../hooks/useDrag";
import useResize from "../hooks/useResize";
import { columns as initialColumns } from "../constants/data";
import { INITIAL_POSITION, INITIAL_SIZE } from "../constants/data";
export default function useA4Page() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [size, setSize] = useState(INITIAL_SIZE);
  const [columns, setColumns] = useState(initialColumns);

  const pageRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const drag = useDrag({ position, size, setPosition, pageRef });

  const resize = useResize({
    position,
    size,
    setSize,
    setPosition,
    pageRef,
  });

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  return {
    refs: { pageRef, tableRef },
    isEditMode,
    toggleEditMode,
    position,
    size,
    columns,
    setColumns,
    drag,
    resize,
  };
}
