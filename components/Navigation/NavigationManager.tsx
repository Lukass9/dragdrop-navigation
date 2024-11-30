import React, { useState } from "react";
import {
  useNavigationState,
  NavigationItem as NavigationItemType,
} from "@/hooks/useNavigationState";
import NavigationItemComponent, {
  NavigationItemData,
} from "@/components/Navigation/NavigationItem";
import AddEditForm from "./AddEditForm";

const NavigationManager: React.FC = () => {
  const initialData: NavigationItemType[] = [
    { id: "1", label: "Strona główna", children: [] },
  ];
  const { navigation, addItem, addChildrenItem, updateItem, deleteItem } =
    useNavigationState(initialData);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const handleFormSubmit = (data: Partial<NavigationItemData>) => {
    addItem({ id: `${Date.now()}`, ...data } as NavigationItemData);
    setIsAdd(false);
  };

  return (
    <div className='bg-background-secondary'>
      <ul className='bg-background-secondary'>
        {navigation.map((item) => (
          <NavigationItemComponent
            key={item.id}
            item={item}
            onAdd={addChildrenItem}
            onEdit={updateItem}
            onDelete={deleteItem}
          />
        ))}
      </ul>
      {isAdd ? (
        <AddEditForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsAdd(false)}
        />
      ) : (
        <button onClick={() => setIsAdd(true)}>Dodaj</button>
      )}
    </div>
  );
};

export default NavigationManager;
