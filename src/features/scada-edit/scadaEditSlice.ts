import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { UUID } from '../../types/type';

// Define a type for the slice state
interface ScadaEditState {
  selectionLookup: Record<UUID, boolean | undefined>;
}

const initialState: ScadaEditState = {
  selectionLookup: {},
};

export const scadaEditSlice = createSlice({
  name: 'scadaEditSlice',
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
} = scadaEditSlice.actions;

export const selectSelectionLookup = (state: RootState) => state.editViewport.selectionLookup;
export const selectSelectedEntitiesUUID = (state: RootState) => {
  const selectedUUIDs = [];
  for (let key in state.editViewport.selectionLookup) {
    if (state.editViewport.selectionLookup[key]) {
      selectedUUIDs.push(key);
    }
  }
  return selectedUUIDs;
};

export default scadaEditSlice.reducer;
