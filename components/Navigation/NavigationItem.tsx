import React, { useState } from "react";
import AddEditForm from "@/components/Navigation/AddEditForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoveIcon } from "../icons";

export interface NavigationItemData {
  id: string;
  label: string;
  url?: string;
  children: NavigationItemData[];
}

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const handleFormSubmit = (data: Partial<NavigationItemData>) => {
    if (formType === "edit") {
      onEdit(item.id, data);
    } else if (formType === "add") {
      onAdd(item.id, { id: `${Date.now()}`, ...data } as NavigationItemData);
    }
    setFormType(null);
  };

  const renderActionButtons = () => (
    <div className='flex space-x-2'>
      <button onClick={() => setFormType("edit")}>Edytuj</button>
      <button onClick={() => onDelete(item.id)}>Usuń</button>
      <button onClick={() => setFormType("add")}>Dodaj pozycję menu</button>
    </div>
  );

  return (
    <li
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className='border rounded-md bg-background-primary'>
      <div className='flex justify-between items-start'>
        <div className='flex justify-center items-center space-x-4'>
          <button {...attributes} {...listeners}>
            <MoveIcon />
          </button>
          <div>
            <h2 className='font-bold text-lg'>
              {item.label + " id: " + item.id}
            </h2>
            {item.url && <h3 className='text-sm text-gray-500'>{item.url}</h3>}
          </div>
        </div>
        {renderActionButtons()}
      </div>
      {formType && (
        <AddEditForm
          initialData={formType === "edit" ? item : {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormType(null)}
          deleteItem={() => onDelete(item.id)}
        />
      )}
      {item.children?.length > 0 && (
        <ul className='bg-background-secondary pl-16'>
          {item.children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavigationItem;
