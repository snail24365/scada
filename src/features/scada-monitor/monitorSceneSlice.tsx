import { RootState } from '@/store/store';
import { BoxEntityProps, LineEntityProps, UUID } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type LineState = LineEntityProps;
type BoxState = BoxEntityProps;

interface MonitorSceneState {
  lines: LineState[];
  boxes: BoxState[];
}

const initialState: MonitorSceneState = {
  lines: [
    // {
    //   uuid: '1',
    //   type: 'line',
    //   points: [
    //     { x: 500, y: 500 },
    //     { x: 600, y: 500 },
    //     { x: 600, y: 600 },
    //     { x: 800, y: 600 }
    //   ]
    // }
  ],
  boxes: [
    // {
    //   uuid: '3',
    //   type: 'Converter',
    //   x: 0,
    //   y: 0,
    //   width: 200,
    //   height: 200
    // }
  ]
};

export const monitorSceneSlice = createSlice({
  name: 'monitorScene',
  initialState,
  reducers: {
    updateMonitorScene: (state, action: PayloadAction<MonitorSceneState>) => {
      state = action.payload;
    }
  }
});

export const {} = monitorSceneSlice.actions;

export const selectLines = (state: RootState) => state.monitorScene.lines;
export const selectBoxes = (state: RootState) => state.monitorScene.boxes;

export default monitorSceneSlice.reducer;
