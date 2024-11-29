import React from "react";
import NavigationItem, { NavigationItemData } from "./NavigationItem";

interface NavigationListProps {
  items: NavigationItemData[];
}

const handleEdit = (id: string) => console.log(`Edytuj: ${id}`);
const handleDelete = (id: string) => console.log(`Usuń: ${id}`);
const handleAdd = (id: string) => console.log(`Dodaj: ${id}`);

const NavigationList: React.FC<NavigationListProps> = ({ items }) => {
  return (
    <ul className='space-y-4'>
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      ))}
    </ul>
  );
};

export default NavigationList;
