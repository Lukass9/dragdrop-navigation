import React, { useState } from "react";
import AddEditForm from "@/components/Navigation/AddEditForm";

export interface NavigationItemData {
  id: string;
  label: string;
  url?: string;
  children?: NavigationItemData[];
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

  const handleFormSubmit = (data: Partial<NavigationItemData>) => {
    if (formType === "edit") onEdit(item.id, data);
    if (formType === "add") {
      onAdd(item.id, { id: `${Date.now()}`, ...data } as NavigationItemData);
    }
    setFormType(null);
  };

  return (
    <li className='border p-2 rounded-md mb-4'>
      <div className='flex justify-between items-start'>
        <div>
          <p>{item.label}</p>
          <p>{item.url}</p>
        </div>
        <div className='flex space-x-2'>
          <button onClick={() => setFormType("edit")}>Edytuj</button>
          <button onClick={() => onDelete(item.id)}>Usuń</button>
          <button onClick={() => setFormType("add")}>Dodaj pozycję menu</button>
        </div>
      </div>
      {formType && (
        <AddEditForm
          initialData={formType === "edit" ? item : {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormType(null)}
        />
      )}
      {item.children && (
        <ul>
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
