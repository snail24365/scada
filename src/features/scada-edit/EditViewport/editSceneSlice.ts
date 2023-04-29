import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store/store';
import { BBox, BoxEntityProps, LineEntityProps, UUID, XY } from '../../../types/type';

type LineState = LineEntityProps;
type BoxState = BoxEntityProps;

interface EditSceneState {
  lines: LineState[];
  boxes: BoxState[];
}

const initialState: EditSceneState = {
  lines: [],
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

export const editSceneSlice = createSlice({
  name: 'editScene',
  initialState,
  reducers: {
    deleteEntities: (state, action: PayloadAction<UUID[]>) => {
      state.boxes = state.boxes.filter((entity) => !action.payload.includes(entity.uuid));
      state.lines = state.lines.filter((line) => !action.payload.includes(line.uuid));
    },
    addLine: (state, action: PayloadAction<Omit<LineState, 'type'>>) => {
      const uuid = action.payload.uuid ?? uuidv4();
      state.lines.push({
        ...action.payload,
        uuid,
        type: 'line'
      });
    },
    addBoxEntity: (state, action: PayloadAction<BoxState>) => {
      state.boxes.push(action.payload);
    },
    updateLinePoint: (state, action: PayloadAction<{ uuid: UUID; points: XY[] }>) => {
      const line = state.lines.find((line) => line.uuid === action.payload.uuid);
      if (!line) return;
      Object.assign(line, action.payload);
    },
    updateBoxBound: (state, action: PayloadAction<{ uuid: UUID } & BBox>) => {
      const entity = state.boxes.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      Object.assign(entity, action.payload);
    },
    translateBoxEntity: (state, action: PayloadAction<{ uuid: UUID } & XY>) => {
      const entity = state.boxes.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      Object.assign(entity, action.payload);
    }
  }
});

export const { addLine, addBoxEntity, updateBoxBound, translateBoxEntity, updateLinePoint, deleteEntities } =
  editSceneSlice.actions;

export const selectEditLines = (state: RootState) => state.editScene.lines;
export const selectEditLine = (uuid: UUID) => {
  return (state: RootState) => state.editScene.lines.find((line) => line.uuid === uuid);
};
export const selectEditBoxes = (state: RootState) => state.editScene.boxes;
export const isSelectedSelector = (uuid: UUID) => {
  return (state: RootState) => state.editViewport.selectionLookup[uuid] ?? false;
};

export default editSceneSlice.reducer;
