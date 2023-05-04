import { createContext } from 'react';
import { StateSetter, Viewbox } from '../../../types/type';

type PropertyWindowContextType = {
  property: any;
  setProperty: StateSetter<object>;
};

const initialPropertyWindowContext = {
  property: {},
  setProperty: () => {}
};

export const PropertyEditWindowContext = createContext<PropertyWindowContextType>(initialPropertyWindowContext);
