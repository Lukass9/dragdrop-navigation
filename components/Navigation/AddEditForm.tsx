import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "../../utils/validation";
import { TrashIcon } from "../icons";
import { useNavigationState } from "@/hooks/useNavigationState";

interface AddEditFormProps {
  initialData?: Partial<FormSchema>;
  onSubmit: (data: FormSchema) => void;
  onCancel: () => void;
  deleteItem?: () => void;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  deleteItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleDelete = () => (deleteItem ? deleteItem() : onCancel());
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='border-border-primary border-2 rounded-lg flex flex-row text-center w-full bg-bg-primary'>
      <div className='flex flex-col text-left p-6 space-y-2 w-full'>
        {(["label", "url"] as const).map((field) => (
          <div key={field} className='flex flex-col space-y-2'>
            <label className='text-text-secondary-700' htmlFor={field}>
              {field === "label" ? "Nazwa" : "Link"}
            </label>
            <input
              {...register(field)}
              id={field}
              className='border-border-primary border-2 rounded-xl p-2'
              placeholder={
                field === "label" ? "np. Promocje" : "Wklej lub wyszukaj"
              }
            />
            {errors[field] && (
              <p className='text-red-500'>{errors[field]?.message}</p>
            )}
          </div>
        ))}

        <div className='flex space-x-2'>
          <button
            type='button'
            onClick={onCancel}
            className='text-button-secondary-fg border-border-primary border rounded-lg p-2'>
            Anuluj
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='text-button-secondary-colorFg border-button-secondary-colorBorder border rounded-lg p-2'>
            {isSubmitting ? "Przesyłanie..." : "Dodaj"}
          </button>
        </div>
      </div>

      <div className='flex justify-center place-items-start'>
        <button type='button' onClick={handleDelete} className='flex'>
          <TrashIcon />
        </button>
      </div>
    </form>
  );
};

export default AddEditForm;
