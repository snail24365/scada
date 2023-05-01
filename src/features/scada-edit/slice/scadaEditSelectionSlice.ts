import { RootState } from '@/store/store';
import { UUID } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScadaEditSection = {
  selectionLookup: Record<UUID, boolean | undefined>;
};

const initialState: ScadaEditSection = {
  selectionLookup: {}
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
    },
    unselectAll: (state) => {
      state.selectionLookup = {};
    },
    exclusiveSelect: (state, action: PayloadAction<{ uuid: UUID }>) => {
      state.selectionLookup = {};
      state.selectionLookup[action.payload.uuid] = true;
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

export default scadaEditSelectionSlice.reducer;
