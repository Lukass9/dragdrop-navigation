import React from "react";
import { PlusIcon } from "../icons";

const AddButton: React.FC<{
  setIsAdd: (state: boolean) => void;
  isPrimary: boolean;
}> = ({ setIsAdd, isPrimary }) => {
  return isPrimary ? (
    <button
      onClick={() => setIsAdd(true)}
      className='flex items-center space-x-3 mt-6 px-4 py-2 rounded-lg bg-button-primary-bg font-bold text-button-primary-fg hover:bg-violet-600'>
      <PlusIcon /> <p>Dodaj pozycję menu</p>
    </button>
  ) : (
    <button
      onClick={() => setIsAdd(true)}
      className='items-center space-x-3 px-4 py-2 m-6 rounded-xl font-bold bg-button-secondary-bg  border-2 border-border-secondary hover:bg-slate-50'>
      Dodaj pozycję menu
    </button>
  );
};

export default AddButton;
