import { textsPropertyMap } from '@/types/schema/textPropertySchema';
import { equipmentComponents, equipmentsPropertyMap } from './equipments/equipmentComponents';
import { shapeComponents, shapePropertyMap } from './shapes/shapeComponents';
import { textComponents } from './texts/textComponentsMap';

export const scadaComponents = {
  ...equipmentComponents,
  ...shapeComponents,
  ...textComponents
};

export type ScadaComponents = keyof typeof scadaComponents;

export const scadaPropertySchema = {
  ...equipmentsPropertyMap,
  ...shapePropertyMap,
  ...textsPropertyMap
};

export const boxComponents = {
  ...equipmentComponents,
  ...shapeComponents
};
export type BoxComponents = keyof typeof boxComponents;
