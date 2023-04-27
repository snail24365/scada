import Circle from './Circle';
import Line from './Line';
import Rectangle from './Rectangle';

export const shapesMap = {
  Circle: Circle,
  Line: Line,
  Rectangle: Rectangle,
};

export type shapesType = keyof typeof shapesMap;

export default shapesMap;
