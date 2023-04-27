import { XY } from '@/types/type';

export const filterReconciledPoints = (points: XY[]) => {
  return filterRedundantPoints(filterAdjointUnique(points));
};

/**
 * Filter element which is aligned with the previous or next element along the x or y axis
 *
 * @param xys
 * @returns
 *
 */
export const filterAdjointUnique = (xys: XY[]) => {
  if (xys.length < 1) return xys;

  const ret = [xys[0]];
  for (let i = 1; i < xys.length; i++) {
    const item = xys[i];
    const nextItem = xys[i - 1];
    if (item.x !== nextItem.x || item.y !== nextItem.y) {
      ret.push(item);
    }
  }
  return ret;
};

export const filterRedundantPoints = (points: XY[]) => {
  let isExistRedundant = false;
  const maxLoop = 5;
  for (let i = 0; i < maxLoop; i++) {
    points = subroutine(points);
    if (!isExistRedundant) break;
    isExistRedundant = false;
  }
  return points;

  function subroutine(points: XY[]) {
    if (points.length < 3) return points;
    const ret = [points[0]];
    for (let i = 1; i < points.length - 1; i++) {
      const item = points[i];
      const nextItem = points[i + 1];
      const prevItem = points[i - 1];
      const isXAligned = item.x === nextItem.x && item.x === prevItem.x;
      const isYAligned = item.y === nextItem.y && item.y === prevItem.y;

      if (isXAligned || isYAligned) {
        isExistRedundant = true;
        continue;
      }
      ret.push(item);
    }
    ret.push(points[points.length - 1]);
    return ret;
  }
};
