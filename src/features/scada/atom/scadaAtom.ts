import { ScadaMode } from '@/type';
import { RefObject } from 'react';
import { atom, selector } from 'recoil';
import { Vector2 } from 'three';

export const gridUnitState = atom({
  key: 'gridUnit',
  default: 10,
});

export const viewboxState = atom({
  key: 'viewbox',
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const viewportState = atom({
  key: 'viewport',
  default: {
    resolutionX: 0,
    resolutionY: 0,
    width: 0,
    height: 0,
  },
});

export const containerRefState = atom<RefObject<SVGSVGElement>>({
  key: 'containerRef',
  default: { current: null },
});

export const clampFunc = selector({
  key: 'clamp',
  get: ({ get }) => {
    const unit = get(gridUnitState);
    return (value: number) => Math.floor(value / unit) * unit;
  },
});

export const getXYFunc = selector({
  key: 'getXY',
  get: ({ get }) => {
    const viewbox = get(viewboxState);
    const viewport = get(viewportState);
    const containerRef = get(containerRefState);

    return (e: React.MouseEvent<Element, MouseEvent>) => {
      const container = containerRef.current;
      if (!container) {
        return new Vector2(0, 0);
      }

      const { x: offsetX, y: offsetY } = container.getBoundingClientRect();
      const { clientX, clientY } = e;
      const x = viewbox.x + (clientX - offsetX) * (viewbox.width / viewport.resolutionX);
      const y = viewbox.y + (clientY - offsetY) * (viewbox.height / viewport.resolutionY);
      return new Vector2(x, y);
    };
  },
});

export const isEditingState = atom({
  key: 'isEditing',
  default: false,
});

export const scadaEditUtil = selector({
  key: 'scadaEditUtil',
  get: ({ get }) => {
    return {
      viewport: get(viewportState),
      viewbox: get(viewboxState),
      gridUnit: get(gridUnitState),
      containerRef: get(containerRefState),
      clamp: get(clampFunc),
      getXY: get(getXYFunc),
      isEditing: get(isEditingState),
    };
  },
});

export const selectionMousedownState = atom({
  key: 'selectionMousedown',
  default: {
    x: 0,
    y: 0,
  },
});

export const selectionBoxState = atom({
  key: 'selectBox',
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const scadaMode = atom<ScadaMode>({
  key: 'scada-mode',
  default: 'monitor',
});
