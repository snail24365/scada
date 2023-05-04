import { boxPropertySchema, linePropertySchema, shapePropertySchema } from '@/types/schema';
import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

export const shapeComponentsMap = {
  Circle: {
    component: Circle,
    propertySchema: shapePropertySchema
  },
  Line: {
    component: Line,
    propertySchema: shapePropertySchema
  },
  Rectangle: {
    component: Rectangle,
    propertySchema: shapePropertySchema
  },
  Ellipse: {
    component: Ellipse,
    propertySchema: shapePropertySchema
  },
  Diamond: {
    component: Diamond,
    propertySchema: shapePropertySchema
  },
  Triangle: {
    component: Triangle,
    propertySchema: shapePropertySchema
  }
};

export type shapeComponents = keyof typeof shapeComponentsMap;

export default shapeComponentsMap;
