import Text from './Text';

export const textsMap = {
  Text: Text
};

export type textsType = keyof typeof textsMap;

export default textsMap;
