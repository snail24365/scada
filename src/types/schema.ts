export const boxPropertySchema = {
  width: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 100
  },
  height: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 100
  },
  x: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 0
  },
  y: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 0
  }
} as const;

export const linePropertySchema = {
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
  },
  storkeDasharray: {
    type: 'string',
    validation: (value: string) => value.match(/^(\d+)(\s*,\s*\d+)*$/) !== null,
    default: ''
  }
} as const;

export const textPropertySchema = {
  fontFamily: {
    type: 'category',
    category: [
      'Arial',
      'Verdana',
      'Helvetica',
      'Tahoma',
      'Trebuchet MS',
      'Times New Roman',
      'Georgia',
      'Garamond',
      'Courier New',
      'Brush Script MT'
    ],
    default: 'Arial'
  },
  width: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 100
  },
  height: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 100
  },
  x: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 0
  },
  y: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 0
  },
  text: {
    type: 'text',
    default: 'Text'
  },
  fontSize: {
    type: 'number',
    contraints: {
      min: 0,
      max: 200,
      step: 1
    }
  },
  fontWeight: {
    type: 'category',
    category: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    default: 'normal'
  },
  fontStyle: {
    type: 'category',
    category: ['normal', 'italic', 'oblique'],
    default: 'normal'
  },
  textDecoration: {
    type: 'category',
    category: ['none', 'underline', 'overline', 'line-through', 'blink'],
    default: 'none'
  },
  textAlign: {
    type: 'category',
    category: ['left', 'right', 'center', 'justify'],
    default: 'left'
  },
  textBaseline: {
    type: 'category',
    category: ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'],
    default: 'top'
  },
  lineHeight: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 1.2
  },
  color: {
    type: 'color',
    default: '#000000'
  },
  backgroundColor: {
    type: 'color',
    default: '#ffffff'
  },
  opacity: {
    type: 'number',
    contraints: {
      min: 0,
      max: 1,
      step: 0.1
    },
    default: 1
  }
} as const;

export const shapePropertySchema = {
  ...boxPropertySchema,
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
  },
  storkeDasharray: {
    type: 'string',
    validation: (value: string) => value.match(/^(\d+)(\s*,\s*\d+)*$/) !== null,
    default: ''
  }
};

type ScadaComponentProp<T> = {
  [K in keyof T]?: any;
};

export type BoxProperty = ScadaComponentProp<typeof boxPropertySchema>;
export type LineProperty = ScadaComponentProp<typeof linePropertySchema>;
export type TextProperty = ScadaComponentProp<typeof textPropertySchema>;
export type ShapeProperty = ScadaComponentProp<typeof shapePropertySchema>;
