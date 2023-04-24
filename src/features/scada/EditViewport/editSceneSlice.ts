import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { BBox, BoxEntityProps, LineEntityProps, UUID, XY } from '../../../type';
import { v4 as uuidv4 } from 'uuid';
import { Vector2, Vector3 } from 'three';
import { normalize, throwIfDev } from '@/util/util';

type LineState = LineEntityProps & {
  startConnectedUUID?: UUID;
  endConnectedUUID?: UUID;
};
type EntityState = BoxEntityProps;

interface EditSceneState {
  lines: LineState[];
  entities: EntityState[];
}

const initialState: EditSceneState = {
  lines: [
    // {
    //   uuid: '1',
    //   type: 'line',
    //   points: [
    //     { x: 500, y: 500 },
    //     { x: 600, y: 500 },
    //     { x: 600, y: 600 },
    //     { x: 800, y: 600 },
    //   ],
    // },
  ],
  entities: [
    {
      uuid: '3',
      type: 'converter',
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    },
    // {
    //   uuid: '4',
    //   type: 'gastank',
    //   x: 200,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // },
    // {
    //   uuid: '5',
    //   type: 'heatExchanger',
    //   x: 300,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // },
    // {
    //   uuid: '6',
    //   type: 'pump1',
    //   x: 400,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // },
    // {
    //   uuid: '7',
    //   type: 'pump2',
    //   x: 500,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // },
    // {
    //   uuid: '8',
    //   type: 'watertank1',
    //   x: 600,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // },
    // {
    //   uuid: '9',
    //   type: 'watertank2',
    //   x: 700,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // },
  ],
};

export const editSceneSlice = createSlice({
  name: 'editScene',
  initialState,
  reducers: {
    addLine: (state, action: PayloadAction<Omit<LineState, 'type'>>) => {
      const uuid = action.payload.uuid ?? uuidv4();
      state.lines.push({
        ...action.payload,
        uuid,
        type: 'line',
      });
    },
    updateLinePoint: (state, action: PayloadAction<{ uuid: UUID; points: XY[] }>) => {
      const line = state.lines.find((line) => line.uuid === action.payload.uuid);
      if (!line) return;
      Object.assign(line, action.payload);
    },
    updateEntityBBox: (state, action: PayloadAction<{ uuid: UUID } & BBox>) => {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      Object.assign(entity, action.payload);
    },
    translateEntity: (state, action: PayloadAction<{ uuid: UUID } & XY>) => {
      const entity = state.entities.find((entity) => entity.uuid === action.payload.uuid);
      if (!entity) return;
      Object.assign(entity, action.payload);
    },
  },
});

export const { addLine, updateEntityBBox, translateEntity, updateLinePoint } =
  editSceneSlice.actions;

export const selectEditLines = (state: RootState) => state.editScene.lines;
export const selectEditEntities = (state: RootState) => state.editScene.entities;
export const isSelectedSelector = (uuid: UUID) => {
  return (state: RootState) => state.editViewport.selectionLookup[uuid] ?? false;
};

export default editSceneSlice.reducer;