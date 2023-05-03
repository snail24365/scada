import { boxPropertySchema, linePropertySchema } from '@/types/schema';
import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

export const shapeComponentsMap = {
  Circle: {
    component: Circle,
    propertySchema: boxPropertySchema
  },
  Line: {
    component: Line,
    propertySchema: linePropertySchema
  },
  Rectangle: {
    component: Rectangle,
    propertySchema: boxPropertySchema
  },
  Ellipse: {
    component: Ellipse,
    propertySchema: boxPropertySchema
  },
  Diamond: {
    component: Diamond,
    propertySchema: boxPropertySchema
  },
  Triangle: {
    component: Triangle,
    propertySchema: boxPropertySchema
  }
};

export type shapeComponents = keyof typeof shapeComponentsMap;

export default shapeComponentsMap;
