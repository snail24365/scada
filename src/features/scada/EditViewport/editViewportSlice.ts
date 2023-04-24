import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { BoxEntityProps, LineEntityProps, UUID, XY } from '../../../type';
import { v4 as uuidv4 } from 'uuid';

// Define a type for the slice state
interface EditViewportState {
  selectionLookup: Record<UUID, boolean | undefined>;
}

const initialState: EditViewportState = {
  selectionLookup: {},
};

export const editViewportSlice = createSlice({
  name: 'editViewport',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<{ uuid: UUID }>) => {
      state.selectionLookup[action.payload.uuid] = true;
    },
    unselect: (state, action: PayloadAction<{ uuid: UUID }>) => {
      state.selectionLookup[action.payload.uuid] = false;
    },
    unselectItems: (state, action: PayloadAction<{ uuids: UUID[] }>) => {
      state.selectionLookup = {};
      action.payload.uuids.forEach((uuid) => {
        state.selectionLookup[uuid] = false;
      });
    },
    selectItems: (state, action: PayloadAction<{ uuids: UUID[] }>) => {
      state.selectionLookup = {};
      action.payload.uuids.forEach((uuid) => {
        state.selectionLookup[uuid] = true;
      });
    },
    unselectAll: (state) => {
      state.selectionLookup = {};
    },
    exclusiveSelect: (state, action: PayloadAction<{ uuid: UUID }>) => {
      state.selectionLookup = {};
      state.selectionLookup[action.payload.uuid] = true;
    },
    exclusiveUnselect: (state, action: PayloadAction<{ uuid: UUID }>) => {
      state.selectionLookup = {};
      state.selectionLookup[action.payload.uuid] = false;
    },
    exclusiveToggle: (state, action: PayloadAction<{ uuid: UUID }>) => {
      const toggled = !state.selectionLookup[action.payload.uuid];
      state.selectionLookup = {};
      state.selectionLookup[action.payload.uuid] = toggled;
    },
  },
});

export const {
  select,
  unselect,
  selectItems,
  unselectItems,
  exclusiveToggle,
  exclusiveSelect,
  unselectAll,
} = editViewportSlice.actions;

export const selectSelectionLookup = (state: RootState) => state.editViewport.selectionLookup;

export default editViewportSlice.reducer;
