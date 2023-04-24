import { useAppDispatch } from '@/store/hooks';
import { XY } from '@/type';
import onDragCallback from '@/util/onDragCallback';
import { normalize } from '@/util/util';
import _ from 'lodash';
import { useContext, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { scadaEditUtil } from '../../atom/scadaAtom';
import { updateLinePoint } from '../editSceneSlice';
import { EditViewportContext } from '../EditViewportContext';
type Props = {};

export const EdgeControlPoint = ({
  points,
  uuid,
  radius,
  edge,
}: {
  points: XY[];
  uuid: string;
  radius: number;
  edge: 'start' | 'end';
}) => {
  const ref = useRef(null);
  const { containerRef, viewport, viewbox, clamp, getXY } = useRecoilValue(scadaEditUtil);

  const dispatch = useAppDispatch();

  const index = edge === 'start' ? 0 : points.length - 1;
  const { x: cx, y: cy } = points[index];
  const onDrag = onDragCallback({
    onMouseMove: (e) => {
      const container = containerRef.current;

      if (!container) return;
      const { x: absoluteX, y: absoulteY } = getXY(e);

      const clonedPoints = _.cloneDeep(points);
      const edgePoint = clonedPoints[index];
      const adjointPoint = clonedPoints[index + (edge === 'start' ? 1 : -1)];

      const updatedEdgePoint = { x: clamp(absoluteX), y: clamp(absoulteY) };
      const isChanged = updatedEdgePoint.x !== edgePoint.x || updatedEdgePoint.y !== edgePoint.y;

      if (!isChanged) return;

      const isHorizontal = edgePoint.y === adjointPoint.y;
      const anchorPoint = isHorizontal
        ? { x: updatedEdgePoint.x, y: edgePoint.y }
        : { x: edgePoint.x, y: updatedEdgePoint.y };

      if (edge === 'start') {
        clonedPoints.unshift(anchorPoint);
        clonedPoints.unshift(updatedEdgePoint);
      } else {
        clonedPoints.push(anchorPoint);
        clonedPoints.push(updatedEdgePoint);
      }

      const updatedPoints = normalize(clonedPoints);
      dispatch(updateLinePoint({ uuid, points: updatedPoints }));
    },
    moveTarget: containerRef,
    upTarget: containerRef,
  });
  return (
    <circle onMouseDown={onDrag} ref={ref} cx={cx} cy={cy} r={radius} fill="red" cursor="pointer" />
  );
};
export default EdgeControlPoint;
