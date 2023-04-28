import { StateSetter } from '@/types/type';
import { createContext } from 'react';

type WithBoxEditContextType = {
  showArrow: boolean;
  setShowArrow: StateSetter<boolean>;
  isBoxEditing: boolean;
  setIsBoxEditing: StateSetter<boolean>;
  isSelected: boolean;
};

const initialContext = {
  showArrow: false,
  setShowArrow: () => undefined,
  isBoxEditing: false,
  setIsBoxEditing: () => undefined,
  isSelected: false
};

export const WithBoxEditContext = createContext<WithBoxEditContextType>(initialContext);
