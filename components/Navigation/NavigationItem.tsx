import AddEditForm from "@/components/Navigation/AddEditForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import TripleButton from "../Button/TripleButton";
import { MoveIcon } from "../icons";
import { NavigationItem as NavigationItemData } from "@/types/navigation.types";
import { v4 as uuidv4 } from "uuid";

interface NavigationItemProps {
  item: NavigationItemData;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: Partial<NavigationItemData>) => void;
  onAdd: (parentId: string, newItem: NavigationItemData) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [formType, setFormType] = useState<"edit" | "add" | null>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({ id: item.id });

  const style = {
    color: isOver ? "green" : undefined,
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const handleFormSubmit = (data: Partial<NavigationItemData>) => {
    if (formType === "edit") {
      onEdit(item.id, data);
    } else if (formType === "add") {
      onAdd(item.id, { id: uuidv4(), ...data } as NavigationItemData);
    }
    setFormType(null);
  };

  return (
    <li ref={setNodeRef} style={style} className=' bg-background-primary'>
      <div className='border rounded-md px-4 py-3 flex justify-between items-start'>
        <div className='flex justify-center items-center space-x-4'>
          <button className='hover:cursor-grab' {...attributes} {...listeners}>
            <MoveIcon />
          </button>
          <div>
            <h2 className='font-bold text-lg'>{item.label}</h2>
            {item.url && <h3 className='text-sm text-gray-500'>{item.url}</h3>}
          </div>
        </div>
        <TripleButton
          setFormType={setFormType}
          onDelete={onDelete}
          item={item}
        />
      </div>
      {formType && (
        <AddEditForm
          initialData={formType === "edit" ? item : {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormType(null)}
          deleteItem={() => onDelete(item.id)}
        />
      )}
    </li>
  );
};

export default NavigationItem;
