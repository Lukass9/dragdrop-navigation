import React, { useState } from "react";
import AddEditForm from "../Navigation/AddEditForm";
import { NavigationItem } from "@/types/navigation.types";
import { v4 as uuidv4 } from "uuid";
interface AddNavigationButtonProps {
  onAdd: (data: Partial<NavigationItem>) => void;
}

const AddNavigationButton: React.FC<AddNavigationButtonProps> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (data: Partial<NavigationItem>) => {
    onAdd({ id: uuidv4(), ...data } as NavigationItem);
    setIsAdding(false);
  };

  return isAdding ? (
    <AddEditForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
  ) : (
    <button onClick={() => setIsAdding(true)}>Dodaj</button>
  );
};

export default AddNavigationButton;
