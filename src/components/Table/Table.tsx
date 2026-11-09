import { data } from "../../constants/data";
import type { Column } from "../../types/data.types";
import type { Dispatch, SetStateAction } from "react";
import useTable from "../../hooks/useTable";
import "./Table.css";

type TableProps = {
  columns: Column[];
  isEditMode: boolean;
  setColumns: Dispatch<SetStateAction<Column[]>>;
};

function Table({ columns, isEditMode, setColumns }: TableProps) {
  const {
    columnWidths,
    handleDragStart,
    handleDrop,
    handleColumnResizeStart,
    handleColumnResizeMove,
    handleColumnResizeEnd,
  } = useTable({ columns, setColumns });

  return (
    <table className="data-table">
      <colgroup>
        {columns.map((column) => (
          <col
            key={column.id}
            style={{
              width: columnWidths[column.id]
                ? `${columnWidths[column.id]}px`
                : undefined,
            }}
          />
        ))}
      </colgroup>

      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.id}
              draggable={isEditMode}
              onDragStart={(event) => {
                if (
                  (event.target as HTMLElement).closest(".column-resize-handle")
                ) {
                  event.preventDefault();
                  return;
                }

                handleDragStart(column.id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(column.id)}
            >
              {column.title}

              {isEditMode && index < columns.length - 1 && (
                <div
                  className="column-resize-handle"
                  onPointerDown={(event) =>
                    handleColumnResizeStart(event, index)
                  }
                  onPointerMove={handleColumnResizeMove}
                  onPointerUp={handleColumnResizeEnd}
                  onPointerCancel={handleColumnResizeEnd}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.id}>{row[column.id as keyof typeof row]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
