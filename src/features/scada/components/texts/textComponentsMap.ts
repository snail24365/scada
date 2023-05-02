import Text from './Text';

const textPropertySchema = {
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
    type: 'string',
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
  fontFamily: {
    type: 'string',
    default: 'Arial'
  },
  fontWeight: {
    type: 'category',
    cateory: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    default: 'normal'
  },
  fontStyle: {
    type: 'category',
    cateory: ['normal', 'italic', 'oblique'],
    default: 'normal'
  },
  textDecoration: {
    type: 'category',
    cateory: ['none', 'underline', 'overline', 'line-through', 'blink'],
    default: 'none'
  },
  textAlign: {
    type: 'category',
    cateory: ['left', 'right', 'center', 'justify'],
    default: 'left'
  },
  textBaseline: {
    type: 'category',
    cateory: ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'],
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
    type: 'string',
    default: '#000000',
    validation: (value: string) => {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    }
  },
  backgroundColor: {
    type: 'string',
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
};

export const textComponentsMap = {
  Text: {
    component: Text,
    propertySchema: textPropertySchema
  }
};

export type TextComponentsType = keyof typeof textComponentsMap;

export default textComponentsMap;
