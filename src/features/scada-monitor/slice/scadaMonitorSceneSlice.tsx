import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { ScadaSceneState, UUID } from '../../../types/type';
import { restSerivce } from '@/service/api';

const initialState: ScadaSceneState = {
  entities: []
};

export const scadaMonitorSceneSlice = createSlice({
  name: 'monitorScene',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScadaMonitorScene.fulfilled, (state, action) => {
      const scene = action.payload;
      if (scene === null) {
        state.entities = [];
      } else {
        Object.assign(state, scene);
      }
    });
  }
});

export const fetchScadaMonitorScene = createAsyncThunk('scada/scene/fetchScadaMonitorScene', async (pageId: UUID) => {
  const response = await restSerivce({ method: 'get', url: `/scene?page-id=${pageId}` });
  return response as ScadaSceneState;
});

export const selectMonitorScene = (state: RootState) => state.monitorScene;

export default scadaMonitorSceneSlice.reducer;
