import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

export const shapesMap = {
  Circle: Circle,
  Line: Line,
  Rectangle: Rectangle,
  Ellipse: Ellipse,
  Diamond: Diamond,
  Triangle: Triangle
};

export type shapesType = keyof typeof shapesMap;

export default shapesMap;
