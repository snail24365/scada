import BasicText from './BasicText';

export const textsMap = {
  BasicText: BasicText
};

export type textsType = keyof typeof textsMap;

export default textsMap;
