import { textPropertySchema } from '@/types/schema/textPropertySchema';
import Text from './Text';

export const textComponentsMap = {
  Text: {
    component: Text,
    propertySchema: textPropertySchema
  }
};

export type TextComponentsType = keyof typeof textComponentsMap;

export default textComponentsMap;
