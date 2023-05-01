import { getService } from '@/service/api';
import { selector } from 'recoil';
import { currentScadaPageIdState } from '../scada/atom/scadaAtom';
import { MonitorSceneState, ScadaPage } from '@/types/type';

export const scadaPagesState = selector({
  key: 'scadaPages',
  get: async () => {
    const response = await getService('/pages');
    return response.data as ScadaPage[];
  }
});

export const scadaSceneState = selector<MonitorSceneState>({
  key: 'scadaScene',
  get: async ({ get }) => {
    const currentScadaPageId = get(currentScadaPageIdState);
    if (!currentScadaPageId) return { lines: [], boxes: [], texts: [] };

    const response = await getService(`/scene/${get(currentScadaPageIdState)}`);
    return response.data as MonitorSceneState;
  }
});
