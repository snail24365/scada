import { createContext } from 'react';
import { StateSetter, Viewbox } from '../../../types/type';

type PropertyEditWindowContextType = {
  property: any;
  setProperty: StateSetter<object>;
};

const initialEditViewportContext = {
  property: {},
  setProperty: () => {}
};

export const PropertyEditWindowContext = createContext<PropertyEditWindowContextType>(initialEditViewportContext);
