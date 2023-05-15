import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '@/types/type';
import { restSerivce } from '@/service/api';
import { SiteInfo } from './type';
import { RootState } from '@/store/store';

type SiteState = {
  sites: SiteInfo[];
  status: RequestStatus;
  error: string | null;
};
const initialState: SiteState = {
  sites: [],
  status: 'idle',
  error: null
};

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    updateSites: (state, action: PayloadAction<SiteInfo[]>) => {
      state.sites = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSites.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.sites = action.payload;
    });
    builder.addCase(fetchSites.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSites.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? null;
    });
  }
});

export const selectSites = (state: RootState) => state.sites.sites;

export const fetchSites = createAsyncThunk('site/fetchSite', async () => {
  const response = await restSerivce({ method: 'get', url: `/site` });
  return response as SiteInfo[];
});

export const { updateSites } = siteSlice.actions;

export default siteSlice.reducer;
