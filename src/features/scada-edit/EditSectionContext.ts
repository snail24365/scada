import { createContext } from 'react';

type EditSectionContextType = {
  rootSvgRef: React.RefObject<SVGSVGElement>;
  rootDivRef: React.RefObject<HTMLDivElement>;
};

const initialEditSectionContext = {
  rootSvgRef: { current: null },
  rootDivRef: { current: null }
};

export const EditSectionContext = createContext<EditSectionContextType>(initialEditSectionContext);
