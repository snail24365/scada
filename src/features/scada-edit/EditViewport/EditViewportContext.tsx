import { createContext } from "react";
import { Viewbox } from "../../../types/type";

type EditViewportContextType = {
  viewboxRef: React.RefObject<Viewbox>;
};

const initialEditViewportContext = {
  viewboxRef: { current: { x: 0, y: 0, width: 0, height: 0 } },
};

export const EditViewportContext = createContext<EditViewportContextType>(
  initialEditViewportContext
);
