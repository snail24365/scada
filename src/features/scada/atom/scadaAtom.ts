import { ScadaMode, UUID, Viewbox, XY } from '@/types/type';
import { atom, selector } from 'recoil';
import { Vector2 } from 'three';

export const gridUnitState = atom({
  key: 'gridUnit',
  default: 10
});

export const viewboxState = atom({
  key: 'viewbox',
  default: {
    x: 0,
    y: 0,
    width: 1,
    height: 1
  }
});

export const resolutionState = atom({
  key: 'resolution',
  default: {
    resolutionX: 1,
    resolutionY: 1
  }
});

export const viewportSizeState = atom({
  key: 'viewportSize',
  default: {
    width: 1,
    height: 1
  }
});

export const clampFunc = selector({
  key: 'clamp',
  get: ({ get }) => {
    const unit = get(gridUnitState);
    return (value: number) => Math.floor(value / unit) * unit;
  }
});

export const getXYFunc = selector({
  key: 'getXY',
  get: ({ get }) => {
    const viewbox = get(viewboxState);
    const { width: viewportWidth, height: viewportHeight } = get(viewportSizeState);
    const { x: offsetX, y: offsetY } = get(editViewportOffset);
    return <T extends { clientX: number; clientY: number }>(e: React.MouseEvent<Element, MouseEvent> | T) => {
      let x = 0;
      let y = 0;

      const { clientX, clientY } = e;
      x = clientX - offsetX;
      y = clientY - offsetY;

      const svgXCoordinate = viewbox.x + (x / viewportWidth) * viewbox.width;
      const svgYCoordinate = viewbox.y + (y / viewportHeight) * viewbox.height;
      return new Vector2(svgXCoordinate, svgYCoordinate);
    };
  }
});

export const isEditingState = atom({
  key: 'isEditing',
  default: false
});

export const scadaEditUtil = selector({
  key: 'scadaEditUtil',
  get: ({ get }) => {
    return {
      viewportSize: get(viewportSizeState),
      resolution: get(resolutionState),
      viewbox: get(viewboxState),
      gridUnit: get(gridUnitState),
      clamp: get(clampFunc),
      getXY: get(getXYFunc),
      isEditing: get(isEditingState),
      reducedScale: get(reducedScaleState)
    };
  }
});

export const selectionMousedownState = atom({
  key: 'selectionMousedown',
  default: {
    x: 0,
    y: 0
  }
});

export const selectionBoxState = atom({
  key: 'selectBox',
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
});

export const scadaMode = atom<ScadaMode>({
  key: 'scada-mode',
  default: 'monitor'
});

export const editViewportOffset = atom<XY>({
  key: 'edit-viewport-offset',
  default: {
    x: 0,
    y: 0
  }
});

export const reducedScaleState = selector({
  key: 'reducedScale',
  get: ({ get }) => {
    const { width, height } = get(viewportSizeState);
    const { resolutionX, resolutionY } = get(resolutionState);
    return {
      x: resolutionX / width,
      y: resolutionY / height
    };
  }
});

export const isEquipmentPanelOpenState = atom({
  key: 'isEquipmentPanelOpen',
  default: false
});

export const zoomRatioState = selector({
  key: 'zoomRatio',
  get: ({ get }) => {
    const { resolutionX } = get(resolutionState);
    const viewbox = get(viewboxState);
    return resolutionX / viewbox.width;
  }
});

export const viewboxZoomActionState = selector({
  key: 'zoom',
  get: ({ get }) => {
    const { resolutionX, resolutionY } = get(resolutionState);
    const zoom = (type: 'in' | 'out', amount: number = 1) => {
      const zoomLimitRatio = 4;
      const widthLowerBound = resolutionX / zoomLimitRatio;
      const heightLowerBound = resolutionY / zoomLimitRatio;
      const initialViewportRatio = resolutionY / resolutionX;

      const inOutSign = type === 'in' ? -1 : 1;
      const zoomSpeed = 10 * amount;
      const xDelta = zoomSpeed * inOutSign;
      const yDelta = xDelta * initialViewportRatio;

      return (prev: Viewbox) => {
        let newWidth = prev.width + 2 * xDelta;
        let newHeight = prev.height + 2 * yDelta;

        let newX = Math.max(prev.x - xDelta, 0);
        let newY = Math.max(prev.y - yDelta, 0);

        if (newX + newWidth > resolutionX) {
          newX = Math.max(prev.x - 2 * xDelta, 0);
        }

        if (newY + newHeight > resolutionY) {
          newY = Math.max(prev.y - 2 * yDelta, 0);
        }

        newWidth = Math.min(newWidth, resolutionX);
        newHeight = Math.min(newHeight, resolutionY);

        const isWidthValid = newWidth > widthLowerBound;
        const isHeightValid = newHeight > heightLowerBound;
        const isValid = isWidthValid && isHeightValid;
        if (!isValid) return prev;

        return { width: newWidth, height: newHeight, x: newX, y: newY };
      };
    };
    return zoom;
  }
});

export const currentScadaPageIdState = atom<UUID | null>({
  key: 'currentPageId',
  default: null
});

export const computeViewportSizeState = selector({
  key: 'getViewportSize',
  get: ({ get }) => {
    const { resolutionX, resolutionY } = get(resolutionState);
    return (containerWidth: number, containerHeight: number) => {
      const resolutionRatio = resolutionX / resolutionY;
      const stretchedWidth = resolutionRatio * containerHeight;
      const stretchedHeight = containerWidth / resolutionRatio;

      if (stretchedWidth > containerWidth) {
        const width = containerWidth;
        const height = stretchedHeight;
        return { width, height };
      } else {
        const width = stretchedWidth;
        const height = containerHeight;
        return { width, height };
      }
    };
  }
});
