import Text from './Text';

export const textComponents = {
  Text: Text
};

export type TextType = keyof typeof textComponents;
