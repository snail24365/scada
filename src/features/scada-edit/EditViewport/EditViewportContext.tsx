import { createContext } from 'react';
import { Viewbox } from '../../../types/type';

type EditViewportContextType = {
  viewboxRef: React.RefObject<Viewbox>;
  rootSvgRef: React.RefObject<SVGSVGElement>;
  rootDivRef: React.RefObject<HTMLDivElement>;
};

const initialEditViewportContext = {
  viewboxRef: { current: { x: 0, y: 0, width: 0, height: 0 } },
  rootSvgRef: { current: null },
  rootDivRef: { current: null },
};

export const EditViewportContext = createContext<EditViewportContextType>(
  initialEditViewportContext,
);
