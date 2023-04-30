import { createContext } from 'react';

type AtomReferenceContextType = {};

const intialAtomReferenceContext = {};

export const AtomReferenceContext = createContext<AtomReferenceContextType>(intialAtomReferenceContext);
