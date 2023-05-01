import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store/store';
import { BBox, BoxEntity, LineEntity, ScadaSceneState, UUID, XY } from '../../../types/type';

const initialState: ScadaSceneState = {
  lines: [],
  boxes: [],
  texts: []
};

export const editSceneSlice = createSlice({
  name: 'editScene',
  initialState,
  reducers: {
    addEntity: (state, action: PayloadAction<any>) => {
      // TODO : replace type any with Components type
      if (action.payload.type === 'Line') {
        state.lines.push(action.payload);
      } else if (action.payload.type === 'Text') {
        state.texts.push(action.payload);
      } else {
        state.boxes.push(action.payload);
      }
    },
    deleteEntities: (state, action: PayloadAction<UUID[]>) => {
      state.boxes = state.boxes.filter((entity) => !action.payload.includes(entity.uuid));
      state.lines = state.lines.filter((line) => !action.payload.includes(line.uuid));
    },
    addLine: (state, action: PayloadAction<Omit<LineEntity, 'type'>>) => {
      const uuid = action.payload.uuid ?? uuidv4();
      state.lines.push({
        ...action.payload,
        uuid,
        type: 'Line'
      });
    },
    addBoxEntity: (state, action: PayloadAction<BoxEntity>) => {
      state.boxes.push(action.payload);
    },
    updateLinePoint: (state, action: PayloadAction<{ uuid: UUID; points: XY[] }>) => {
      const line = state.lines.find((line) => line.uuid === action.payload.uuid);
      if (!line) return;
      Object.assign(line, action.payload);
    },
    updateBBox: (state, action: PayloadAction<{ uuid: UUID } & BBox>) => {
      const entity = [...state.boxes, ...state.texts].find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      Object.assign(entity, action.payload);
    },
    translateBoxEntity: (state, action: PayloadAction<{ uuid: UUID } & XY>) => {
      const entity = [...state.boxes, ...state.texts].find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      Object.assign(entity, action.payload);
    },
    updateEditScene: (state, action: PayloadAction<ScadaSceneState>) => {
      state = action.payload;
    }
  }
});

export const {
  addLine,
  addBoxEntity,
  updateBBox,
  translateBoxEntity,
  updateLinePoint,
  deleteEntities,
  updateEditScene,
  addEntity
} = editSceneSlice.actions;

export const selectEditScene = (state: RootState) => state.editScene;
export const selectEditLines = (state: RootState) => state.editScene.lines;
export const selectEntity = (uuid: UUID) => {
  return (state: RootState) => {
    const line = state.editScene.lines.find((line) => line.uuid === uuid);
    if (line) return line;
    const entity = state.editScene.boxes.find((entity) => entity.uuid === uuid);
    if (entity) return entity;
    return null;
  };
};
export const selectEditBoxes = (state: RootState) => state.editScene.boxes;
export const isSelectedSelector = (uuid: UUID) => {
  return (state: RootState) => state.editViewport.selectionLookup[uuid] ?? false;
};

export default editSceneSlice.reducer;
