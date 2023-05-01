import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store/store';
import { BBox, LineEntity, ScadaSceneState, UUID, XY } from '../../../types/type';

const initialState: ScadaSceneState = {
  lines: [],
  boxes: [],
  texts: []
};

export const scadaEditSceneSlice = createSlice({
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
      state.texts = state.texts.filter((text) => !action.payload.includes(text.uuid));
    },
    addLine: (state, action: PayloadAction<Omit<LineEntity, 'type'>>) => {
      const uuid = action.payload.uuid ?? uuidv4();
      state.lines.push({
        ...action.payload,
        uuid,
        type: 'Line'
      });
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
    },
    updateText(state, action: PayloadAction<{ uuid: UUID; text: string }>) {
      const text = state.texts.find((text) => text.uuid === action.payload.uuid);
      if (!text) return;
      text.text = action.payload.text;
    }
  }
});

export const {
  addLine,
  updateBBox,
  translateBoxEntity,
  updateLinePoint,
  deleteEntities,
  updateEditScene,
  addEntity,
  updateText
} = scadaEditSceneSlice.actions;

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
export const selectEditBBoxEntity = (state: RootState) => [...state.editScene.boxes, ...state.editScene.texts];
export const isSelectedSelector = (uuid: UUID) => {
  return (state: RootState) => state.editSelection.selectionLookup[uuid] ?? false;
};

export default scadaEditSceneSlice.reducer;
