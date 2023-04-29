import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { UUID } from '../../types/type';

export type AlarmLevel = 0 | 1 | 2 | 3;

type PageType = {
  pageId: UUID;
  title: string;
  alarmLevel: AlarmLevel;
};

type ScadaPageState = {
  pages: PageType[];
};

const initialState: ScadaPageState = {
  pages: [
    {
      pageId: '1',
      title: 'Floor 1, Computer room',
      alarmLevel: 1
    },
    {
      pageId: '2',
      title: 'Floor 1, manufacturing room',
      alarmLevel: 2
    }
  ]
};

export const scadaPageStateSlice = createSlice({
  name: 'scadaPageStateSlice',
  initialState,
  reducers: {
    updatePages: (state, action: PayloadAction<PageType[]>) => {
      state.pages = action.payload;
    }
  }
});

export const { updatePages } = scadaPageStateSlice.actions;

export const selectPages = (state: RootState) => state.scadaPage.pages;

export default scadaPageStateSlice.reducer;
