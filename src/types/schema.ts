export type PropertySchema = Readonly<{
  type: 'number' | 'string' | 'object' | 'array';
  category: 'number' | 'text' | 'color' | readonly string[] | `tag/${string}`;
  default?: number | string | boolean;
  validation?: (value: any) => boolean;
  hidden?: boolean;
  contraints?: {
    min?: number;
    max?: number;
    step?: number;
  };
}>;

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
  stroke: {
    type: 'color',
    default: '#eee'
  },
  strokeWidth: {
    type: 'number',
    default: 2
  }
} as const;

export const textPropertySchema = {
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
    },
    default: 32
  },
  fontFamily: {
    type: [
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
  fontWeight: {
    type: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    default: 'normal'
  },
  fontStyle: {
    type: ['normal', 'italic', 'oblique'],
    default: 'normal'
  },
  textDecoration: {
    type: ['none', 'underline', 'overline', 'line-through', 'blink'],
    default: 'none'
  },
  textAlign: {
    type: ['left', 'right', 'center', 'justify'],
    default: 'left'
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
    default: '#fff'
  },
  backgroundColor: {
    type: 'color',
    default: 'transparent'
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

type ComponentPropertyType<T extends Record<string, PropertySchema>> = {
  readonly [K in keyof T]+?: T[K]['category'] extends 'number'
    ? number
    : T[K]['category'] extends 'text'
    ? string
    : T[K]['category'] extends 'color'
    ? string
    : T[K]['category'] extends T[K]['default']
    ? T[K]['category']
    : never;
};

type WithRequiredProperty<Type, U extends keyof Type> = Type & {
  [Property in U]-?: Type[Property];
};

type BBoxRequiredProperty = 'width' | 'height' | 'x' | 'y';
export type BoxProperty = WithRequiredProperty<ComponentPropertyType<typeof boxPropertySchema>, BBoxRequiredProperty>;
export type LineProperty = ComponentPropertyType<typeof linePropertySchema>;
export type TextProperty = WithRequiredProperty<ComponentPropertyType<typeof textPropertySchema>, BBoxRequiredProperty>;
export type ShapeProperty = WithRequiredProperty<
  ComponentPropertyType<typeof boxShapePropertySchema>,
  BBoxRequiredProperty
>;
