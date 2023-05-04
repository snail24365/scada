import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store/store';
import { BBox, BoxEntity, LineEntity, ScadaSceneState, TextEntity, UUID, XY } from '../../../types/type';
import { restSerivce } from '@/service/api';
import { fetchScadaMonitorScene } from '@/features/scada-monitor/slice/scadaMonitorSceneSlice';

const initialState: ScadaSceneState = {
  lines: [],
  boxes: [],
  texts: []
};

export const scadaEditSceneSlice = createSlice({
  name: 'editScene',
  initialState,
  reducers: {
    updateEntity: (state, action: PayloadAction<{ uuid: UUID; newState: any }>) => {
      const entity = [...state.lines, ...state.boxes, ...state.texts].find(
        (entity) => entity.uuid === action.payload.uuid
      );
      // TODO : replace type any with Components type
      Object.assign(entity as any, action.payload.newState);
    },
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
      Object.assign(state, action.payload);
    },
    updateText(state, action: PayloadAction<{ uuid: UUID; text: string }>) {
      const text = state.texts.find((text) => text.uuid === action.payload.uuid);
      if (!text) return;
      text.text = action.payload.text;
    },
    updateProperty(state, action: PayloadAction<{ uuid: UUID; property: string; value: any }>) {
      const entity = [...state.lines, ...state.boxes, ...state.texts].find(
        (entity) => entity.uuid === action.payload.uuid
      );
      if (!entity) return;
      (entity as any)[action.payload.property] = action.payload.value;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchScadaEditScene.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
    builder.addCase(fetchScadaMonitorScene.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.lines = [];
        state.boxes = [];
        state.texts = [];
        return;
      }
      Object.assign(state, action.payload);
    });
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
  updateText,
  updateEntity,
  updateProperty
} = scadaEditSceneSlice.actions;

export const getEditScene = (state: RootState) => state.editScene;
export const getEditText = (uuid: UUID) => (state: RootState) =>
  state.editScene.texts.find((text) => text.uuid === uuid);
export const getEditLines = (state: RootState) => state.editScene.lines;
export const getEntity = (uuid: UUID | undefined) => {
  return (state: RootState) => {
    if (!uuid) return undefined;
    const { lines, boxes, texts } = state.editScene;
    return [...lines, ...boxes, ...texts].find((entity) => entity.uuid === uuid);
  };
};

export const getProperty = (uuid: UUID, property: string) => {
  return (state: RootState) => {
    const { lines, boxes, texts } = state.editScene;
    const entity = [...lines, ...boxes, ...texts].find((entity) => entity.uuid === uuid);
    if (!entity) return undefined;
    return (entity as any)[property];
  };
};

export const selectEditBBoxEntity = (state: RootState) => [...state.editScene.boxes, ...state.editScene.texts];
export const isSelectedSelector = (uuid: UUID) => {
  return (state: RootState) => state.editSelection.selectionLookup[uuid] ?? false;
};

export const fetchScadaEditScene = createAsyncThunk('scada/scene/fetchScadaEditScene', async (pageId: UUID) => {
  const response = await restSerivce({ method: 'get', url: `/scene?page-id=${pageId}` });
  return response as ScadaSceneState;
});

export const saveScadaScene = createAsyncThunk<ScadaSceneState, void, { state: RootState }>(
  'scada/scene/saveScadaScene',
  async (_, thunkAPI) => {
    const pageId = thunkAPI.getState().scadaPage.currentPageId;
    const scene = thunkAPI.getState().editScene;
    const response = await restSerivce({ method: 'post', url: `/scene?page-id=${pageId}`, data: scene });
    return response as ScadaSceneState;
  }
);

export default scadaEditSceneSlice.reducer;
