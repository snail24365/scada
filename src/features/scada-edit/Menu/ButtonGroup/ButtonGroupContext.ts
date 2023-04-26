import { Optional, StateSetter } from '@/type';
import { createContext } from 'react';

type ButtonGroupContext = {
  selectedIndex: number;
  setSelectedIndex: StateSetter<number>;
};

const initialButtonGroup = {
  selectedIndex: -1,
  setSelectedIndex: () => {},
};

export const ButtonGroupContext = createContext<ButtonGroupContext>(initialButtonGroup);
