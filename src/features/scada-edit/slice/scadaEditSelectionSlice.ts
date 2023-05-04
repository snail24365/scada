import { RootState } from '@/store/store';
import { UUID } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScadaEditSection = {
  selectionLookup: Record<UUID, boolean | undefined>;
  singleSelectionId: UUID | undefined;
};

const initialState: ScadaEditSection = {
  selectionLookup: {},
  singleSelectionId: undefined
};

export const scadaEditSelectionSlice = createSlice({
  name: 'editStateSlice',
  initialState,
  reducers: {
    selectItems: (state, action: PayloadAction<{ uuids: UUID[] }>) => {
      state.selectionLookup = {};
      action.payload.uuids.forEach((uuid) => {
        state.selectionLookup[uuid] = true;
      });

      if (action.payload.uuids.length === 1) {
        state.singleSelectionId = action.payload.uuids[0];
      }
    },
    unselectAll: (state) => {
      state.selectionLookup = {};
      state.singleSelectionId = undefined;
    },
    exclusiveSelect: (state, action: PayloadAction<{ uuid: UUID }>) => {
      state.selectionLookup = {};
      state.selectionLookup[action.payload.uuid] = true;
      state.singleSelectionId = action.payload.uuid;
    }
  }
});

export const { selectItems, exclusiveSelect, unselectAll } = scadaEditSelectionSlice.actions;

export const getSelectedUUIDs = (state: RootState) => {
  const selectedUUIDs = [];
  for (let key in state.editSelection.selectionLookup) {
    if (state.editSelection.selectionLookup[key]) {
      selectedUUIDs.push(key);
    }
  }
  return selectedUUIDs;
};

export const getSingleSelectionId = (state: RootState) => {
  return state.editSelection.singleSelectionId;
};

export default scadaEditSelectionSlice.reducer;
