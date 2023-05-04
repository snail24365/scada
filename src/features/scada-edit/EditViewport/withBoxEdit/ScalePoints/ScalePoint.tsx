import { primaryBlue } from '@/assets/color';
import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import { useAppDispatch } from '@/store/hooks';
import { BBox, UUID } from '@/types/type';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { updateBBox } from '../../../slice/scadaEditSceneSlice';
import { EditViewportContext } from '../../EditViewportContext';
import { WithBoxEditContext } from '../WithBoxEditContext';
import { EditSectionContext } from '@/features/scada-edit/EditSectionContext';

export enum ScalePointDirection {
  nw = 'nw',
  n = 'n',
  ne = 'ne',
  e = 'e',
  se = 'se',
  s = 's',
  sw = 'sw',
  w = 'w'
}

type Props = {
  boundBox: BBox;
  direction: ScalePointDirection;
  r: number;
  entityUUID: UUID;
};

type DirectionInfo = {
  dx: number;
  dy: number;
  cursor: string;
};

const eightDirectionInfos: Record<ScalePointDirection, DirectionInfo> = {
  nw: { dx: -1, dy: -1, cursor: 'nwse-resize' },
  n: { dx: 0, dy: -1, cursor: 'ns-resize' },
  ne: { dx: 1, dy: -1, cursor: 'nesw-resize' },
  e: { dx: 1, dy: 0, cursor: 'ew-resize' },
  se: { dx: 1, dy: 1, cursor: 'nwse-resize' },
  s: { dx: 0, dy: 1, cursor: 'ns-resize' },
  sw: { dx: -1, dy: 1, cursor: 'nesw-resize' },
  w: { dx: -1, dy: 0, cursor: 'ew-resize' }
};

const ScalePoint = ({ boundBox, r, direction, entityUUID }: Props) => {
  const { rootSvgRef } = useContext(EditSectionContext);
  const { setIsBoxEditing: setIsEditing } = useContext(WithBoxEditContext);
  const { clamp, getXY } = useRecoilValue(scadaEditUtil);
  const { dx, dy, cursor } = eightDirectionInfos[direction];
  const { x, y, width, height } = boundBox;
  const dispatch = useAppDispatch();

  const cx = x + ((dx + 1) * width) / 2;
  const cy = y + ((dy + 1) * height) / 2;

  const onMouseDownDrag = useDrag({
    moveElementRef: rootSvgRef,
    onMouseDown: (e) => {
      setIsEditing(true);
      document.body.style.cursor = cursor;
    },
    onMouseUp: (e) => {
      setIsEditing(false);
      document.body.style.cursor = 'default';
    },
    onMouseMove: (e) => {
      const container = rootSvgRef.current;
      if (!container) return;
      const { x: pivotX, y: pivotY } = getXY(e);

      type key = `${number},${number}`;
      const corners: Record<key, { x: number; y: number }> = {
        '-1,-1': {
          x,
          y
        },
        '-1,1': {
          x,
          y: y + height
        },
        '1,-1': {
          x: x + width,
          y
        },
        '1,1': {
          x: x + width,
          y: y + height
        }
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
          y: func(y1, y2)
        }));
      };
      const minCorner = getCorner('min');
      const maxCorner = getCorner('max');
      minCorner.x = clamp(minCorner.x);
      minCorner.y = clamp(minCorner.y);
      maxCorner.x = clamp(maxCorner.x);
      maxCorner.y = clamp(maxCorner.y);

      dispatch(
        updateBBox({
          uuid: entityUUID,
          x: minCorner.x,
          y: minCorner.y,
          width: maxCorner.x - minCorner.x,
          height: maxCorner.y - minCorner.y
        })
      );
    }
  });

  return (
    <circle
      cursor={cursor}
      onMouseDown={onMouseDownDrag}
      cx={cx}
      cy={cy}
      r={r}
      fill={primaryBlue}
      stroke={'#eee'}
      strokeWidth={2}
    />
  );
};

export default ScalePoint;
