import { createContext } from 'react';
import { Size, StateSetter } from '../../../type';

type Viewport = Size;
type Viewbox = Size & { x: number; y: number };

type EditViewportContextType = {
  viewport: Viewport;
  viewbox: Viewbox;
  viewboxRef: React.MutableRefObject<Viewbox>;
  setViewport: StateSetter<Size>;
  setViewbox: StateSetter<Viewbox>;
  editViewportSvgRef: React.RefObject<SVGSVGElement>;
};

const initialEditViewportContext = {
  viewport: { width: 0, height: 0 },
  viewbox: { x: 0, y: 0, width: 0, height: 0 },
  setViewport: () => undefined,
  setViewbox: () => undefined,
  editViewportSvgRef: { current: null },
  viewboxRef: { current: { x: 0, y: 0, width: 0, height: 0 } },
};

export const EditViewportContext = createContext<EditViewportContextType>(initialEditViewportContext);
