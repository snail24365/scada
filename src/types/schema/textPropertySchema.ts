export const textPropertySchema = {
  Text: {
    width: {
      type: 'number',
      default: 100
    },
    height: {
      type: 'number',
      default: 100
    },
    x: {
      type: 'number',
      default: 0
    },
    y: {
      type: 'number',
      default: 0
    },
    text: {
      type: 'text',
      default: 'Text'
    },
    fontSize: {
      type: 'number',
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
      default: 1
    }
  }
} as const;
