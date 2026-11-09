import { useRef, useState } from "react";
import type { Dispatch, SetStateAction, PointerEvent } from "react";
import type { Column } from "../types/data.types";

type UseTableProps = {
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
};

function useTable({ columns, setColumns }: UseTableProps) {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const draggedColumn = useRef<string | null>(null);

  const resizeStart = useRef({
    mouseX: 0,
    leftWidth: 0,
    rightWidth: 0,
    leftId: "",
    rightId: "",
  });

  // Drag & Drop

  const handleDragStart = (columnId: string) => {
    draggedColumn.current = columnId;
  };

  const handleDrop = (targetColumnId: string) => {
    const sourceColumnId = draggedColumn.current;

    if (!sourceColumnId || sourceColumnId === targetColumnId) return;

    const newColumns = [...columns];

    const sourceIndex = newColumns.findIndex(
      (column) => column.id === sourceColumnId,
    );

    const targetIndex = newColumns.findIndex(
      (column) => column.id === targetColumnId,
    );

    if (sourceIndex === -1 || targetIndex === -1) return;

    const [movedColumn] = newColumns.splice(sourceIndex, 1);

    newColumns.splice(targetIndex, 0, movedColumn);

    setColumns(newColumns);
    draggedColumn.current = null;
  };



  const handleColumnResizeStart = (
    event: PointerEvent<HTMLDivElement>,
    index: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const leftColumn = columns[index];
    const rightColumn = columns[index + 1];

    if (!rightColumn) return;

    const leftHeader = event.currentTarget.parentElement;
    const rightHeader = leftHeader?.nextElementSibling as HTMLElement | null;

    if (!leftHeader || !rightHeader) return;

    resizeStart.current = {
      mouseX: event.clientX,
      leftWidth:
        columnWidths[leftColumn.id] ?? leftHeader.getBoundingClientRect().width,
      rightWidth:
        columnWidths[rightColumn.id] ??
        rightHeader.getBoundingClientRect().width,
      leftId: leftColumn.id,
      rightId: rightColumn.id,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleColumnResizeMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const { mouseX, leftWidth, rightWidth, leftId, rightId } =
      resizeStart.current;

    const deltaX = event.clientX - mouseX;
    const minWidth = 45;
    const totalWidth = leftWidth + rightWidth;

    const newLeftWidth = Math.max(
      minWidth,
      Math.min(totalWidth - minWidth, leftWidth + deltaX),
    );

    const newRightWidth = totalWidth - newLeftWidth;

    setColumnWidths((prev) => ({
      ...prev,
      [leftId]: newLeftWidth,
      [rightId]: newRightWidth,
    }));
  };

  const handleColumnResizeEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    columnWidths,
    handleDragStart,
    handleDrop,
    handleColumnResizeStart,
    handleColumnResizeMove,
    handleColumnResizeEnd,
  };
}

export default useTable;
