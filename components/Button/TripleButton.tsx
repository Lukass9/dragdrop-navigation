import React from "react";

interface TipleButtonProps {
  setFormType: React.Dispatch<React.SetStateAction<"edit" | "add" | null>>;
  onDelete: (id: string) => void;
  item: {
    id: string;
  };
}

const TripleButton = ({ setFormType, onDelete, item }: TipleButtonProps) => {
  return (
    <div className='flex border rounded-lg'>
      <button
        onClick={() => onDelete(item.id)}
        className='p-3 hover:bg-slate-50'>
        <p>Usuń</p>
      </button>

      <button
        onClick={() => setFormType("edit")}
        className='p-3 border-l border-r hover:bg-slate-50'>
        <p>Edytuj</p>
      </button>

      <button
        onClick={() => setFormType("add")}
        className='p-3 hover:bg-slate-50'>
        <p>Dodaj pozycję menu</p>
      </button>
    </div>
  );
};

export default TripleButton;
