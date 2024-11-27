import React, { useState } from "react";
import { TrashIcon } from "@/components/icons";

interface InitialFormData {
  name: string;
  url: string;
}

interface AddEditFormProps {
  initialData?: InitialFormData;
  onSubmit: (data: InitialFormData) => void;
  onCancel?: () => void;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<InitialFormData>({
    name: "",
    url: "",
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='border-border-primary border-2 rounded-lg flex flex-row text-center w-full bg-bg-primary'>
      <div className='flex flex-col text-left p-6 space-y-2 w-full'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='name' className='text-text-secondary-700'>
            Nazwa
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='np. Promocje'
            value={formData.name}
            onChange={handleChange}
            className='border-border-primary border-2 rounded-xl p-2'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='url' className='text-text-secondary-700'>
            Link
          </label>
          <input
            type='text'
            id='url'
            name='url'
            placeholder='Wklej lub wyszukaj'
            value={formData.url}
            onChange={handleChange}
            className='border-border-primary border-2 rounded-xl p-2'
          />
        </div>
        <div className='flex flex-row space-x-2'>
          <button
            type='button'
            onClick={onCancel}
            className='text-button-secondary-fg border-border-primary border rounded-lg p-2'>
            Anuluj
          </button>
          <button
            type='submit'
            className='text-button-secondary-colorFg border-button-secondary-colorBorder border rounded-lg p-2'>
            Dodaj
          </button>
        </div>
      </div>

      <div className='flex justify-center place-items-start'>
        <button type='button' onClick={onCancel} className='flex'>
          <TrashIcon />
        </button>
      </div>
    </form>
  );
};

export default AddEditForm;
