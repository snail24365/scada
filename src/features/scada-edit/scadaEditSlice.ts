import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { UUID } from '../../types/type';

// Define a type for the slice state
interface ScadaEditState {
  selectionLookup: Record<UUID, boolean | undefined>;
}

const initialState: ScadaEditState = {
  selectionLookup: {}
};

export const scadaEditStateSlice = createSlice({
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

export const { selectItems, exclusiveSelect, unselectAll } = scadaEditStateSlice.actions;

export const getSelectedUUIDs = (state: RootState) => {
  const selectedUUIDs = [];
  for (let key in state.editViewport.selectionLookup) {
    if (state.editViewport.selectionLookup[key]) {
      selectedUUIDs.push(key);
    }
  }
  return selectedUUIDs;
};

export default scadaEditStateSlice.reducer;
