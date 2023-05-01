import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store/store';
import { BBox, LineEntity, ScadaSceneState, UUID, XY } from '../../../types/type';

const initialState: ScadaSceneState = {
  lines: [],
  boxes: [],
  texts: []
};

export const scadaMonitorSceneSlice = createSlice({
  name: 'monitorScene',
  initialState,
  reducers: {
    updateMonitorScene: (state, action: PayloadAction<ScadaSceneState>) => {
      Object.assign(state, action.payload);
    }
  }
});

export const selectMonitorScene = (state: RootState) => state.monitorScene;

export const { updateMonitorScene } = scadaMonitorSceneSlice.actions;

export default scadaMonitorSceneSlice.reducer;
