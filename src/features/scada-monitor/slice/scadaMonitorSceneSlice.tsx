import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { ScadaSceneState, UUID } from '../../../types/type';
import { restSerivce } from '@/service/api';

const initialState: ScadaSceneState = {
  lines: [],
  boxes: [],
  texts: []
};

export const scadaMonitorSceneSlice = createSlice({
  name: 'monitorScene',
  initialState,
  reducers: {
    // updateMonitorScene: (state, action: PayloadAction<ScadaSceneState>) => {
    //   Object.assign(state, action.payload);
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchScadaMonitorScene.fulfilled, (state, action) => {
      console.log('fetchScadaMonitorScene.fulfilled', action.payload);

      const scene = action.payload;
      if (scene === null) {
        state.boxes = [];
        state.lines = [];
        state.texts = [];
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

// export const { updateMonitorScene } = scadaMonitorSceneSlice.actions;

export default scadaMonitorSceneSlice.reducer;
