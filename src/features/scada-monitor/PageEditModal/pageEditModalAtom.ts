import { UUID } from '@/types/type';
import { atom } from 'recoil';

export const pageEditModalState = atom<{ isOpen: boolean; pageId: UUID }>({
  key: 'pageEditModal',
  default: {
    isOpen: false,
    pageId: ''
  }
});
