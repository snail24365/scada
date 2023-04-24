import { createContext } from 'react';

type LineEditContextType = {};

const initialContext = {};

export const WithLineEditContext = createContext<LineEditContextType>(initialContext);
