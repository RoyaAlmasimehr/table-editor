import Table from "../Table/Table";
import useA4Page from "../../hooks/useA4Table";
import ResizeHandle from "../ResizeHandle";
import EditButton from "../EditButton";

import "./A4Page.css";

function A4Page() {
  const {
    refs,
    isEditMode,
    toggleEditMode,
    position,
    size,
    columns,
    setColumns,
    drag,
    resize,
  } = useA4Page();

 
  const dragProps = isEditMode
    ? {}
    : {
        onPointerDown: drag.handlePointerDown,
        onPointerMove: drag.handlePointerMove,
        onPointerUp: drag.handlePointerUp,
        onPointerCancel: drag.handlePointerUp,
      };

  return (
    <div className="a4-page" ref={refs.pageRef}>
      <div
        ref={refs.tableRef}
        className={`table-wrapper ${isEditMode ? "is-edit-mode" : ""}`}
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
        {...dragProps}
      >
        <Table
          columns={columns}
          isEditMode={isEditMode}
          setColumns={setColumns}
        />

        {!isEditMode && (
          <ResizeHandle
            onStart={resize.handleResizeStart}
            onMove={resize.handleResizeMove}
            onEnd={resize.handleResizeEnd}
          />
        )}

        <EditButton isEditMode={isEditMode} onToggle={toggleEditMode} />
      </div>
    </div>
  );
}

export default A4Page;
