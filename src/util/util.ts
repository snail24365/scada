import { Viewbox, Viewport } from '../type';

export const getAbsoluteCoordinate = (container: Element, e: React.MouseEvent, viewbox: Viewbox, viewport: Viewport) => {
  const { x: offsetX, y: offsetY } = container.getBoundingClientRect();
  const { clientX, clientY } = e;
  const deltaX = clientX - offsetX;
  const deltaY = clientY - offsetY;
  const x = viewbox.x + deltaX * (viewbox.width / viewport.width);
  const y = viewbox.y + deltaY * (viewbox.height / viewport.height);
  return { x, y };
};

export const clampByGridSize = (x: number, gridSize: number) => {
  return Math.round(x / gridSize) * gridSize;
};
