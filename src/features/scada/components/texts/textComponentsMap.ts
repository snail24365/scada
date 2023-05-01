import Text from './Text';

export const textComponentsMap = {
  Text: Text
};

export type TextComponentsType = keyof typeof textComponentsMap;

export default textComponentsMap;
