import { boxShapePropertySchema } from '@/types/schema/boxShapePropertySchema';
import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import { linePropertySchema } from '@/types/schema/linePropertySchema';

export const shapePropertySchema = {
  Circle: boxShapePropertySchema,
  Line: linePropertySchema,
  Rectangle: boxShapePropertySchema,
  Ellipse: boxShapePropertySchema,
  Diamond: boxShapePropertySchema,
  Triangle: boxShapePropertySchema
};

export const shapeComponents = {
  Circle,
  Line,
  Rectangle,
  Ellipse,
  Diamond,
  Triangle
} as const;

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
