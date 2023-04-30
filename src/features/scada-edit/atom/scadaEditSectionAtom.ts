import { atom, selector } from 'recoil';

export const selectedEditMenuIndexState = atom({
  key: 'selectedMenu',
  default: -1
});

export const editContextMenuState = atom({
  key: 'editContextMenu',
  default: {
    isOpen: false,
    left: 0,
    top: 0
  }
});

export const propertyModalState = atom({
  key: 'propertyModal',
  default: {
    isOpen: false
  }
});
