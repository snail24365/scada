import { equipmentComponents, equipmentPropertySchema } from './equipments/equipmentComponentsMap';
import { shapeComponents, shapePropertySchema } from './shapes/shapeComponentsMap';
import textComponentsMap from './texts/textComponentsMap';

export const scadaComponents = {
  ...equipmentComponents,
  ...shapeComponents
};

export type ScadaComponents = keyof typeof scadaComponents;

export const scadaPropertySchema = {
  ...equipmentPropertySchema,
  ...shapePropertySchema,
  ...textComponentsMap
};

export const boxComponents = {
  ...equipmentComponents,
  ...shapeComponents
};
export type BoxComponents = keyof typeof boxComponents;
