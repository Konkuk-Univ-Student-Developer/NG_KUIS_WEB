import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

interface QuickMenuProps {
  id: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  path: string;
}

const QuickMenu = ({ id, icon, label, path }: QuickMenuProps) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    navigate(path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(path);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="flex-1 bg-beige relative w-full md:max-w-65 h-21 rounded-[10px] md:rounded-2xl md:h-37 touch-none cursor-pointer"
    >
      <div className="absolute size-6 top-2 left-2 md:top-3 md:left-6 md:size-11">
        {icon}
      </div>
      <span className="absolute right-2 bottom-2 text-sm font-semibold leading-[1.2] tracking-[-0.28px] text-right text-black md:right-4 md:bottom-4 md:text-2xl md:font-bold md:leading-[1.2] md:tracking-[-0.48]">
        {label}
      </span>
    </div>
  );
};

export default QuickMenu;
