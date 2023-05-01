import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

export const shapeComponentsMap = {
  Circle: Circle,
  Line: Line,
  Rectangle: Rectangle,
  Ellipse: Ellipse,
  Diamond: Diamond,
  Triangle: Triangle
};

export type shapeComponents = keyof typeof shapeComponentsMap;

export default shapeComponentsMap;
