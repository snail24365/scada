import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { RequestStatus, ScadaSceneState, UUID } from '../../../types/type';
import { restSerivce } from '@/service/api';

const initialState: ScadaSceneState & { status: RequestStatus } = {
  lines: [],
  boxes: [],
  texts: [],
  status: 'idle'
};

export const scadaMonitorSceneSlice = createSlice({
  name: 'monitorScene',
  initialState,
  reducers: {
    updateMonitorEntityProperty(state, action: PayloadAction<{ uuid: UUID; property: string; value: any }>) {
      const entity = [...state.lines, ...state.boxes, ...state.texts].find(
        (entity) => entity.uuid === action.payload.uuid
      );
      if (!entity) return;
      (entity as any)[action.payload.property] = action.payload.value;
    }
  },
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

// TODO need to be refactored
export const selectTagSubscriptionMap = (state: RootState) => {
  const entities = [...state.monitorScene.boxes, ...state.monitorScene.lines, ...state.monitorScene.texts];
  const tagSubscriptionMap: Record<string, { uuid: UUID; property: string }[]> = {};
  for (const entity of entities) {
    for (const property of Object.keys(entity)) {
      if (property.endsWith('_tag')) {
        const tag = (entity as any)[property];

        if (tag === null) {
          continue;
        }

        if (!tagSubscriptionMap[tag]) {
          tagSubscriptionMap[tag] = [];
        }
        tagSubscriptionMap[tag].push({ uuid: entity.uuid, property: property.replace('_tag', '') });
      }
    }
  }
  return tagSubscriptionMap;
};

export const { updateMonitorEntityProperty } = scadaMonitorSceneSlice.actions;

export default scadaMonitorSceneSlice.reducer;
