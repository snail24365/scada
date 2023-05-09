export const linePropertySchema = {
  stroke: {
    type: 'color',
    default: '#eee'
  },
  strokeWidth: {
    type: 'number',
    default: 2
  }
} as const;
