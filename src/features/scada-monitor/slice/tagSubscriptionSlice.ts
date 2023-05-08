import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from '../../../types/type';
import { RootState } from '@/store/store';
import { restSerivce } from '@/service/api';

type TagSubscription = Record<string, EntityProperty[]>;
export type EntityProperty = {
  uuid: UUID;
  property: string;
};
const initialState: TagSubscription = {};

export const tagSubscriptionSlice = createSlice({
  name: 'tagSubscription',
  initialState,
  reducers: {
    subscribeTag: (state, action: PayloadAction<{ uuid: UUID; property: string; tag: string }>) => {
      const { uuid, property, tag } = action.payload;

      if (state[tag] === undefined) {
        state[tag] = [];
      }

      const preExistingIndex = state[tag].findIndex((item) => item.uuid === uuid && item.property === property);
      if (preExistingIndex !== -1) {
        state[tag].splice(preExistingIndex, 1);
      }
      state[tag].push({ uuid, property });
    },
    unsubscribeTag: (state, action: PayloadAction<{ uuid: UUID; property: string; tag: string }>) => {
      const { uuid, property, tag } = action.payload;

      if (state[tag] === undefined) {
        return;
      }

      const preExistingIndex = state[tag].findIndex((item) => item.uuid === uuid && item.property === property);
      if (preExistingIndex !== -1) {
        state[tag].splice(preExistingIndex, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTagSubscription.fulfilled, (state, action) => {
      if (!action.payload) return;
      state = action.payload;
      return action.payload;
    });
  }
});

export const saveTagSubscription = createAsyncThunk<TagSubscription, void, { state: RootState }>(
  'scada/saveTagSubscription',
  async (_, thunkAPI) => {
    const tagSubscription = thunkAPI.getState().tagSubscription;
    const response = await restSerivce({ method: 'post', url: `/tag-subscription`, data: tagSubscription });
    return response as TagSubscription;
  }
);

export const fetchTagSubscription = createAsyncThunk<TagSubscription, void, { state: RootState }>(
  'scada/fetchTagSubscription',
  async () => {
    const response = await restSerivce({ method: 'get', url: `/tag-subscription` });
    return response as TagSubscription;
  }
);

export const { subscribeTag } = tagSubscriptionSlice.actions;

export default tagSubscriptionSlice.reducer;
