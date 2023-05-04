import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { AlarmLevel, ScadaPage, UUID } from '@/types/type';
import { restSerivce } from '@/service/api';

type ScadaPageInfo = {
  currentPageId: UUID | null;
  pages: ScadaPage[];
};

const initialState: ScadaPageInfo = {
  currentPageId: null,
  pages: []
};

const replaceWithNewPageInfo = (state: ScadaPageInfo, action: PayloadAction<ScadaPage[]>) => {
  const newPages = action.payload;
  if (newPages === undefined || newPages === null) {
    return;
  }
  const oldSelectedPageId = state.currentPageId;
  const oldIndex = state.pages.findIndex((page) => page.pageId === state.currentPageId);

  state.pages = newPages;

  if (newPages.length === 0) {
    state.currentPageId = null;
  } else if (newPages.some((page) => page.pageId === oldSelectedPageId)) {
    state.currentPageId = oldSelectedPageId;
  } else {
    state.currentPageId = newPages[Math.max(Math.min(oldIndex, newPages.length - 1), 0)].pageId;
  }
};

export const scadaPageSlice = createSlice({
  name: 'scadaPage',
  initialState,
  reducers: {
    updateCurrentPageId: (state, action: PayloadAction<UUID>) => {
      state.currentPageId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchScadaPages.fulfilled, replaceWithNewPageInfo);
    builder.addCase(addScadaPage.fulfilled, replaceWithNewPageInfo);
    builder.addCase(deleteScadaPage.fulfilled, replaceWithNewPageInfo);
    builder.addCase(updateScadaPage.fulfilled, replaceWithNewPageInfo);
  }
});

export const selectScadaPages = (state: RootState) => state.scadaPage.pages;
export const selectCurrentPageId = (state: RootState) => {
  return state.scadaPage.currentPageId;
};

export const fetchScadaPages = createAsyncThunk('scada/pages/fetchScadaPages', async () => {
  const response = await restSerivce({ method: 'get', url: `/scada/pages` });
  return response as ScadaPage[];
});

export const addScadaPage = createAsyncThunk('scada/pages/addScadaPage', async (page: ScadaPage) => {
  const response = await restSerivce({ method: 'post', url: `/scada/pages/${page.pageId}`, data: page });
  return response as ScadaPage[];
});

export const deleteScadaPage = createAsyncThunk('scada/pages/deleteScadaPage', async (pageId: UUID) => {
  const response = await restSerivce({ method: 'delete', url: `/scada/pages/${pageId}` });
  return response as ScadaPage[];
});

export const updateScadaPage = createAsyncThunk('scada/pages/updateScadaPage', async (scadaPage: ScadaPage) => {
  const response = await restSerivce({ method: 'put', url: `/scada/pages/${scadaPage.pageId}`, data: scadaPage });
  return response as ScadaPage[];
});

export const { updateCurrentPageId } = scadaPageSlice.actions;

export const selectPage = (pageId: UUID) => (state: RootState) => {
  return state.scadaPage.pages.find((page) => page.pageId === pageId);
};

export default scadaPageSlice.reducer;
