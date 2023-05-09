import { textPropertySchema } from '@/types/schema/textPropertySchema';
import { equipmentComponents, equipmentPropertySchema } from './equipments/equipmentComponents';
import { shapeComponents, shapePropertySchema } from './shapes/shapeComponentsMap';
import { textComponents } from './texts/textComponentsMap';

export const scadaComponents = {
  ...equipmentComponents,
  ...shapeComponents,
  ...textComponents
};

export type ScadaComponents = keyof typeof scadaComponents;

export const scadaPropertySchema = {
  ...equipmentPropertySchema,
  ...shapePropertySchema,
  ...textPropertySchema
};

export const boxComponents = {
  ...equipmentComponents,
  ...shapeComponents
};
export type BoxComponents = keyof typeof boxComponents;
