import { createContext } from 'react';

type DigitalTwinContextType = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const initialDigitalTwinContext = {
  containerRef: { current: null }
};

export const DigitalTwinContext = createContext<DigitalTwinContextType>(initialDigitalTwinContext);
