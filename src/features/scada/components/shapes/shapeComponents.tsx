import { boxShapePropertySchema } from '@/types/schema/boxShapePropertySchema';
import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import { linePropertySchema } from '@/types/schema/linePropertySchema';

export const shapePropertyMap = {
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

export type ShapeComponents = keyof typeof shapeComponents;
