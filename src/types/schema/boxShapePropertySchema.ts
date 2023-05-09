import { boxPropertySchema } from './boxPropertySchema';

export const boxShapePropertySchema = {
  ...boxPropertySchema,
  ...({
    fill: {
      type: 'color',
      default: 'transparent'
    },
    stroke: {
      type: 'color',
      default: '#eee'
    },
    strokeWidth: {
      type: 'number',
      validation: (value: number) => value >= 0,
      default: 2
    }
  } as const)
};
