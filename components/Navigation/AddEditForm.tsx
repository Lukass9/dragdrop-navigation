import { TrashIcon } from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchema, formSchema } from "../../utils/validation";

interface AddEditFormProps {
  initialData?: Partial<FormSchema>;
  onSubmit: (data: FormSchema) => void;
  onCancel?: () => void;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmitForm: SubmitHandler<FormSchema> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className='border-border-primary border-2 rounded-lg flex flex-row text-center w-full bg-bg-primary'>
      <div className='flex flex-col text-left p-6 space-y-2 w-full'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='name' className='text-text-secondary-700'>
            Nazwa
          </label>
          <input
            {...register("name")}
            type='text'
            id='name'
            placeholder='np. Promocje'
            className='border-border-primary border-2 rounded-xl p-2'
          />
          {errors.name && (
            <p className='text-red-500 text-sm'>{errors.name.message}</p>
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor='url' className='text-text-secondary-700'>
            Link
          </label>
          <input
            {...register("url")}
            type='text'
            id='url'
            placeholder='Wklej lub wyszukaj'
            className='border-border-primary border-2 rounded-xl p-2'
          />
          {errors.url && (
            <p className='text-red-500 text-sm'>{errors.url.message}</p>
          )}
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
            disabled={isSubmitting}
            className='text-button-secondary-colorFg border-button-secondary-colorBorder border rounded-lg p-2'>
            {isSubmitting ? "Przesyłanie..." : "Dodaj"}
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
