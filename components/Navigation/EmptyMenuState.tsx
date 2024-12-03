import { NavigationItem } from "@/types/navigation.types";
import NavigationForm from "./NavigationForm";

interface EmptyMenuStateProps {
  isAdd: boolean;
  setIsAdd: (state: boolean) => void;
  onSubmit: (data: Partial<NavigationItem>) => void;
}

const EmptyMenuState = ({ isAdd, setIsAdd, onSubmit }: EmptyMenuStateProps) => {
  return (
    <div className=' min-h-screen bg-background-secondary flex space-y-8 flex-col items-center justify-center '>
      <div className='flex flex-col justify-center items-center rounded-lg text-center w-[90vw] bg-gray-100 p-6'>
        <h1 className='text-xl font-bold text-text-primary-900'>
          Menu jest puste
        </h1>
        <p className='mt-4 text-text-tertiary-600'>
          W tym menu nie ma jeszcze żadnych linków.
        </p>
        <NavigationForm
          isPrimary={true}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default EmptyMenuState;
