import equipmentsMap from './components/equipments/equipmentsMap';
import shapesMap from './components/shapes/shapesMap';
import textsMap from './components/texts/textsMap';

export const scadaComponentsMap = {
  ...equipmentsMap,
  ...shapesMap,
  ...textsMap
};

export type ScadaComponentsType = keyof typeof scadaComponentsMap;
