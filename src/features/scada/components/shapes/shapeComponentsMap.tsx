import { bboxPropertySchema } from '../equipments/equipmentComponentsMap';
import Circle from './Circle';
import Diamond from './Diamond';
import Ellipse from './Ellipse';
import Line from './Line';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

export const shapeComponentsMap = {
  Circle: {
    component: Circle,
    propertySchema: bboxPropertySchema
  },
  Line: {
    component: Line,
    propertySchema: {
      ...bboxPropertySchema,
      fill: {
        type: 'string',
        validation: (value: string) => value.match(/^#[0-9a-f]{6}$/i) !== null,
        default: 'transparent'
      },
      stroke: {
        type: 'string',
        validation: (value: string) => value.match(/^#[0-9a-f]{6}$/i) !== null,
        default: '#eee'
      },
      strokeWidth: {
        type: 'number',
        validation: (value: number) => value >= 0,
        default: 2
      },
      storkeDasharray: {
        type: 'string',
        validation: (value: string) => value.match(/^(\d+)(\s*,\s*\d+)*$/) !== null,
        default: ''
      }
    }
  },
  Rectangle: {
    component: Rectangle,
    propertySchema: bboxPropertySchema
  },
  Ellipse: {
    component: Ellipse,
    propertySchema: bboxPropertySchema
  },
  Diamond: {
    component: Diamond,
    propertySchema: bboxPropertySchema
  },
  Triangle: {
    component: Triangle,
    propertySchema: bboxPropertySchema
  }
};

export type shapeComponents = keyof typeof shapeComponentsMap;

export default shapeComponentsMap;
