import { useAppDispatch } from '@/store/hooks';
import { useContext, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { BoxEntityProps } from '../../../../type';
import onDragCallback, { MouseButton } from '../../../../util/onDragCallback';
import { scadaEditUtil } from '../../atom/scadaAtom';
import { updateEntityBBox } from '../editSceneSlice';
import { WithBoxEditContext } from './WithBoxEditContext';

type DirectionInfo = {
  dx: number;
  dy: number;
  cursor: string;
};

const ScalePoints = (props: BoxEntityProps) => {
  const { containerRef, viewport, viewbox, clamp, getXY } = useRecoilValue(scadaEditUtil);
  const { setIsBoxEditing: setIsEditing } = useContext(WithBoxEditContext);
  const { width, height, x, y } = props;
  const scalePointsRef = useRef<(SVGCircleElement | null)[]>([]);
  const dispatch = useAppDispatch();

  const eightDirectionInfos: Array<DirectionInfo> = [
    { dx: -1, dy: -1, cursor: 'nwse-resize' },
    { dx: 0, dy: -1, cursor: 'ns-resize' },
    { dx: 1, dy: -1, cursor: 'nesw-resize' },
    { dx: 1, dy: 0, cursor: 'ew-resize' },
    { dx: 1, dy: 1, cursor: 'nwse-resize' },
    { dx: 0, dy: 1, cursor: 'ns-resize' },
    { dx: -1, dy: 1, cursor: 'nesw-resize' },
    { dx: -1, dy: 0, cursor: 'ew-resize' },
  ];
  const r = 5;
  const scalePoints = eightDirectionInfos.map(({ dx, dy, cursor }, i) => {
    let cx = x + ((dx + 1) * width) / 2;
    let cy = y + ((dy + 1) * height) / 2;

    const onDrag = onDragCallback({
      onMouseDown: (e) => {
        setIsEditing(true);
      },
      onMouseUp: (e) => {
        setIsEditing(false);
      },
      onMouseMove: (e) => {
        const container = containerRef.current;
        if (!container) return;
        const { x: pivotX, y: pivotY } = getXY(e);

        type key = `${number},${number}`;
        const corners: Record<key, { x: number; y: number }> = {
          '-1,-1': {
            x,
            y,
          },
          '-1,1': {
            x,
            y: y + height,
          },
          '1,-1': {
            x: x + width,
            y,
          },
          '1,1': {
            x: x + width,
            y: y + height,
          },
        };

        if (dx === 0) {
          corners[`${dx - 1},${dy}`].y = pivotY;
          corners[`${dx + 1},${dy}`].y = pivotY;
        } else if (dy === 0) {
          corners[`${dx},${dy - 1}`].x = pivotX;
          corners[`${dx},${dy + 1}`].x = pivotX;
        } else {
          corners[`${-dx},${dy}`].y = pivotY;
          corners[`${dx},${-dy}`].x = pivotX;
          corners[`${dx},${dy}`].x = pivotX;
          corners[`${dx},${dy}`].y = pivotY;
        }

        const getCorner = (type: 'min' | 'max') => {
          const func = type === 'min' ? Math.min : Math.max;
          return Object.values(corners).reduce(({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
            x: func(x1, x2),
            y: func(y1, y2),
          }));
        };
        const minCorner = getCorner('min');
        const maxCorner = getCorner('max');
        minCorner.x = clamp(minCorner.x);
        minCorner.y = clamp(minCorner.y);
        maxCorner.x = clamp(maxCorner.x);
        maxCorner.y = clamp(maxCorner.y);

        dispatch(
          updateEntityBBox({
            uuid: props.uuid,
            x: minCorner.x,
            y: minCorner.y,
            width: maxCorner.x - minCorner.x,
            height: maxCorner.y - minCorner.y,
          }),
        );
      },
      moveTarget: containerRef,
      leaveTarget: containerRef,
      upTarget: containerRef,
      mouseButton: MouseButton.LEFT,
    });

    return (
      <circle
        cursor={cursor}
        key={i}
        ref={(element) => {
          scalePointsRef.current[i] = element;
        }}
        cx={cx}
        cy={cy}
        r={r}
        fill="blue"
        stroke="silver"
        strokeWidth={2}
        onMouseDown={onDrag}
      />
    );
  });

  return <>{scalePoints}</>;
};

export default ScalePoints;
