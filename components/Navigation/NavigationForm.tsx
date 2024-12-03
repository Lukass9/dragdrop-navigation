import { NavigationItem } from "@/types/navigation.types";
import AddButton from "../Button/AddButton";
import AddEditForm from "./AddEditForm";

const NavigationForm: React.FC<{
  isAdd: boolean;
  isPrimary: boolean;
  setIsAdd: (state: boolean) => void;
  onSubmit: (data: Partial<NavigationItem>) => void;
}> = ({ isAdd, setIsAdd, onSubmit, isPrimary }) => (
  <>
    {isAdd ? (
      <div className={`${isPrimary ? "w-8/12" : ""}`}>
        <AddEditForm onSubmit={onSubmit} onCancel={() => setIsAdd(false)} />
      </div>
    ) : (
      <AddButton setIsAdd={setIsAdd} isPrimary={isPrimary} />
    )}
  </>
);

export default NavigationForm;
