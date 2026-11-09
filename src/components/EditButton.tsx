type Props = {
  isEditMode: boolean;
  onToggle: () => void;
};

function EditButton({ isEditMode, onToggle }: Props) {
  return (
    <button
      type="button"
      className="edit-button"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onToggle}
    >
      {isEditMode ? "Exit Edit Mode" : "Edit"}
    </button>
  );
}

export default EditButton;
