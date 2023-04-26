import { atom, selector } from 'recoil';

export const selectedEditMenuIndexState = atom({
  key: 'selectedMenu',
  default: -1,
});
