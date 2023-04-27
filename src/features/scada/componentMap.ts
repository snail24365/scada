import equipmentsMap from './components/equipments/equipmentsMap';
import shapesMap from './components/shapes/shapesMap';

export const scadaComponentsMap = {
  ...equipmentsMap,
  ...shapesMap,
};

export type scadaComponentsType = keyof typeof scadaComponentsMap;