import React from "react";
import {
  useNavigationState,
  NavigationItem as NavigationItemType,
} from "@/hooks/useNavigationState";
import NavigationItemComponent from "@/components/Navigation/NavigationItem";

const NavigationManager: React.FC = () => {
  const initialData: NavigationItemType[] = [
    { id: "1", label: "Strona główna", children: [] },
  ];
  const { navigation, addItem, updateItem, deleteItem } =
    useNavigationState(initialData);

  return (
    <div>
      <ul>
        {navigation.map((item) => (
          <NavigationItemComponent
            key={item.id}
            item={item}
            onAdd={addItem}
            onEdit={updateItem}
            onDelete={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavigationManager;
