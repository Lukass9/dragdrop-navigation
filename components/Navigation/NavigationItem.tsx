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

  const handleDeleteItemWhenEdit = (id: string) => {
    onDelete(id);
  };

  return (
    <li className='border rounded-md mb-4 space-y-2 bg-background-primary'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='font-bold text-lg '>{item.label}</h2>
          <h3 className='text-sm text-gray-500'>{item.url}</h3>
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
          deleteItem={() => handleDeleteItemWhenEdit(item.id)}
        />
      )}
      {item.children && (
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
