import { boxPropertySchema, linePropertySchema, boxShapePropertySchema } from '@/types/schema';
import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

export const shapeComponentsMap = {
  Circle: {
    component: Circle,
    propertySchema: boxShapePropertySchema
  },
  Line: {
    component: Line,
    propertySchema: linePropertySchema
  },
  Rectangle: {
    component: Rectangle,
    propertySchema: boxShapePropertySchema
  },
  Ellipse: {
    component: Ellipse,
    propertySchema: boxShapePropertySchema
  },
  Diamond: {
    component: Diamond,
    propertySchema: boxShapePropertySchema
  },
  Triangle: {
    component: Triangle,
    propertySchema: boxShapePropertySchema
  }
};

export type shapeComponents = keyof typeof shapeComponentsMap;

export default shapeComponentsMap;
