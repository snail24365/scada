import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { RequestStatus, ScadaSceneState, UUID } from '../../../types/type';
import { restSerivce } from '@/service/api';

const initialState: ScadaSceneState & RequestStatus = {
  lines: [],
  boxes: [],
  texts: [],
  status: 'idle'
};

export const scadaMonitorSceneSlice = createSlice({
  name: 'monitorScene',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScadaMonitorScene.fulfilled, (state, action) => {
      const scene = action.payload;
      if (scene === null) {
        state.boxes = [];
        state.lines = [];
        state.texts = [];
      } else {
        Object.assign(state, scene);
      }
      state.status = 'succeeded';
    });
    builder.addCase(fetchScadaMonitorScene.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchScadaMonitorScene.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export const fetchScadaMonitorScene = createAsyncThunk('scada/scene/fetchScadaMonitorScene', async (pageId: UUID) => {
  const response = await restSerivce({ method: 'get', url: `/scene?page-id=${pageId}` });
  return response as ScadaSceneState;
});

export const getIsEmptyScene = (state: any) => {
  const scene = selectMonitorScene(state);
  return scene.lines.length === 0 && scene.boxes.length === 0 && scene.texts.length === 0;
};

export const selectMonitorScene = (state: RootState) => state.monitorScene;

// export const { updateMonitorScene } = scadaMonitorSceneSlice.actions;

export default scadaMonitorSceneSlice.reducer;
