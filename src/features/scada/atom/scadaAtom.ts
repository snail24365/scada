import { ScadaMode, XY } from '@/type';
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
    const { x: offsetX, y: offsetY } = get(editViewportOffset);
    return (e: React.MouseEvent<Element, MouseEvent>) => {
      // TODO : manage offset, offsetY as recoil value;
      //container.getBoundingClientRect(); need to introduce new atom
      const { clientX, clientY } = e;
      const x = clientX - offsetX;
      const y = clientY - offsetY;

      const svgXCoordinate = viewbox.x + (x / viewport.width) * viewbox.width;
      const svgYCoordinate = viewbox.y + (y / viewport.height) * viewbox.height;
      return new Vector2(svgXCoordinate, svgYCoordinate);
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

export const editViewportOffset = atom<XY>({
  key: 'edit-viewport-offset',
  default: {
    x: 0,
    y: 0,
  },
});
