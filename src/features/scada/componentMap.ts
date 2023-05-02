import equipmentComponentsMap from './components/equipments/equipmentComponentsMap';
import shapeComponentsMap from './components/shapes/shapeComponentsMap';
import textComponentsMap from './components/texts/textComponentsMap';

export const boxComponentsMap = {
  ...equipmentComponentsMap,
  ...shapeComponentsMap
};

export const scadaComponentsMap = {
  ...equipmentComponentsMap,
  ...shapeComponentsMap,
  ...textComponentsMap
};

export type ScadaComponentsMap = typeof scadaComponentsMap;

export type BoxComponents = keyof typeof boxComponentsMap;
export type ScadaComponents = keyof typeof scadaComponentsMap;
