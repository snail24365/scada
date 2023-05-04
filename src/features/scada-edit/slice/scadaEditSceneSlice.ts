import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store/store';
import {
  BBox,
  BoxEntity,
  isBoxEntity,
  isLineEntity,
  isShapeEntity,
  isTextEntity,
  LineEntity,
  ScadaSceneState,
  TextEntity,
  UUID,
  XY
} from '../../../types/type';
import { restSerivce } from '@/service/api';
import { fetchScadaMonitorScene } from '@/features/scada-monitor/slice/scadaMonitorSceneSlice';

const initialState: ScadaSceneState = {
  entities: []
  // lines: [],
  // boxes: [],
  // texts: []
};

export const scadaEditSceneSlice = createSlice({
  name: 'editScene',
  initialState,
  reducers: {
    //TODO : remove any type
    updateEntity: (state, action: PayloadAction<{ uuid: UUID; newState: any }>) => {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      Object.assign(entity as any, action.payload.newState);
    },
    //TODO : remove any type
    addEntity: (state, action: PayloadAction<any>) => {
      state.entities.push(action.payload);
    },
    deleteEntities: (state, action: PayloadAction<UUID[]>) => {
      state.entities = state.entities.filter((entity) => !action.payload.includes(entity.uuid));
    },
    addLine: (state, action: PayloadAction<Omit<LineEntity, 'type'>>) => {
      const uuid = action.payload.uuid ?? uuidv4();
      state.entities.push({
        ...action.payload,
        uuid,
        type: 'Line'
      });
    },
    updateLinePoint: (state, action: PayloadAction<{ uuid: UUID; points: XY[] }>) => {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      if (isLineEntity(entity)) {
        Object.assign(entity, action.payload);
      }
    },
    updateBBox: (state, action: PayloadAction<{ uuid: UUID } & BBox>) => {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      if (isBoxEntity(entity)) {
        Object.assign(entity, action.payload);
      }
    },
    translateBoxEntity: (state, action: PayloadAction<{ uuid: UUID } & XY>) => {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      if (isBoxEntity(entity)) {
        Object.assign(entity, action.payload);
      }
    },
    updateEditScene: (state, action: PayloadAction<ScadaSceneState>) => {
      Object.assign(state, action.payload);
    },
    updateText(state, action: PayloadAction<{ uuid: UUID; text: string }>) {
      const text = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      if (!text) return;
      if (isTextEntity(text)) {
        text.text = action.payload.text;
      }
    },
    updateProperty(state, action: PayloadAction<{ uuid: UUID; property: string; value: any }>) {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
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
        state.entities = [];
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
  updateText,
  updateEditScene,

  deleteEntities,
  addEntity,
  updateEntity,
  updateProperty
} = scadaEditSceneSlice.actions;

export const getEditScene = (state: RootState) => state.editScene;
export const getEditText = (uuid: UUID) => (state: RootState) =>
  state.editScene.entities.find((entity) => entity.uuid === uuid);

export const getEditLines = (state: RootState) => state.editScene.entities.filter(isLineEntity);
export const getEntity = (uuid: UUID | undefined) => {
  return (state: RootState) => {
    if (!uuid) return undefined;
    return state.editScene.entities.find((entity) => entity.uuid === uuid);
  };
};

export const getProperty = (uuid: UUID, property: string) => {
  return (state: RootState) => {
    const entity = state.editScene.entities.find((entity) => entity.uuid === uuid);
    if (!entity) return undefined;
    return (entity as any)[property];
  };
};

export const selectEditBBoxEntity = (state: RootState) =>
  state.editScene.entities.filter((entity) => isBoxEntity(entity) || isTextEntity(entity) || isShapeEntity(entity));
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
