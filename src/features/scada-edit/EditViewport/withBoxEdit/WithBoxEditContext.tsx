import { StateSetter } from '@/type';
import { createContext } from 'react';

type WithBoxEditContextType = {
  showArrow: boolean;
  setShowArrow: StateSetter<boolean>;
  isBoxEditing: boolean;
  setIsBoxEditing: StateSetter<boolean>;
};

const initialContext = {
  showArrow: false,
  setShowArrow: () => undefined,
  isBoxEditing: false,
  setIsBoxEditing: () => undefined,
};

export const WithBoxEditContext = createContext<WithBoxEditContextType>(initialContext);
