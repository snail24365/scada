import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UUID, XY } from '@/type';
import onDragCallback from '@/util/onDragCallback';
import _ from 'lodash';
import { MouseEventHandler, ReactElement, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Vector2 } from 'three';
import { isEditingState, scadaEditUtil } from '../../atom/scadaAtom';
import { isSelectedSelector, updateLinePoint } from '../editSceneSlice';
import { exclusiveSelect } from '../editViewportSlice';
import { filterReconciledPoints } from '../util';

type Props = {
  points: XY[];
  uuid: UUID;
  pointRadius: number;
};

const InnerControlWrapper = ({ points, uuid, pointRadius }: Props) => {
  const lineWrappers: ReactElement[] = [];
  const lineWrappersRef = useRef<(SVGRectElement | null)[]>([]);

  const midPoints: ReactElement[] = [];
  const midPointsRef = useRef<(SVGCircleElement | null)[]>([]);

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(isSelectedSelector(uuid));

  const { containerRef, getXY, clamp } = useRecoilValue(scadaEditUtil);
  const setIsEditing = useSetRecoilState(isEditingState);

  const pointVectors = points.map((point) => new Vector2(point.x, point.y));

  const wrapperWidth = 4;
  for (let i = 0; i < pointVectors.length - 1; i++) {
    const onMidPointDrag = createModifyingDrag();
    const onLineWrapperDrag = createLineWrapperDrag();

    const here = pointVectors[i];
    const next = pointVectors[i + 1];
    const isHorizontal = next.y === here.y;
    const cursor = isHorizontal ? 'row-resize' : 'col-resize';

    lineWrappers.push(createLineWrapper(isHorizontal, here, next, i, onLineWrapperDrag));
    midPoints.push(createMidPoint(here, next, cursor, onMidPointDrag, i));

    function createModifyingDrag() {
      return onDragCallback({
        onMouseDown: () => {
          setIsEditing(true);
          dispatch(exclusiveSelect({ uuid }));
        },
        onMouseMove: (e) => {
          const container = containerRef.current;
          if (!container) return;
          points = _.cloneDeep(points);

          const updateAlongAxis = (point: { x: number; y: number }) => {
            const { x: mouseX, y: mouseY } = getXY(e);
            const updateValue = isHorizontal ? clamp(mouseY) : clamp(mouseX);
            const updateAxis = isHorizontal ? 'y' : 'x';
            point[updateAxis] = updateValue;
          };

          updateAlongAxis(points[i]);
          updateAlongAxis(points[i + 1]);

          dispatch(
            updateLinePoint({
              uuid,
              points: filterReconciledPoints(points),
            }),
          );
        },
        onMouseUp: () => {
          setIsEditing(false);
        },
        moveTarget: containerRef,
        upTarget: containerRef,
      });
    }

    function createLineWrapperDrag() {
      let downX = 0;
      let downY = 0;
      let downPoints = _.cloneDeep(points);

      return onDragCallback({
        onMouseDown: (e) => {
          setIsEditing(true);
          dispatch(exclusiveSelect({ uuid }));
          const xyOnDown = getXY(e);
          downX = xyOnDown.x;
          downY = xyOnDown.y;
        },
        onMouseMove: (e) => {
          const xyOnMove = getXY(e);
          const deltaX = xyOnMove.x - downX;
          const deltaY = xyOnMove.y - downY;
          const translatedPoints = downPoints.map((point) => {
            return {
              x: clamp(point.x + deltaX),
              y: clamp(point.y + deltaY),
            };
          });
          dispatch(
            updateLinePoint({
              uuid,
              points: filterReconciledPoints(translatedPoints),
            }),
          );
        },
        onMouseUp: () => {
          setIsEditing(false);
        },
        moveTarget: containerRef,
      });
    }
  }

  return (
    <>
      {lineWrappers}
      {midPoints}
    </>
  );

  function createLineWrapper(
    isHorizontal: boolean,
    here: Vector2,
    next: Vector2,
    index: number,
    onDrag: any,
  ) {
    const normal = isHorizontal ? new Vector2(0, 1) : new Vector2(1, 0);
    const offset = normal.multiplyScalar(wrapperWidth);
    const p1 = new Vector2().addVectors(here, offset);
    const p2 = new Vector2().addVectors(next, offset);
    const p3 = new Vector2().subVectors(next, offset);
    const p4 = new Vector2().subVectors(here, offset);

    const minPoint = [p1, p2, p3, p4].reduce((acc, cur) => {
      return new Vector2(Math.min(acc.x, cur.x), Math.min(acc.y, cur.y));
    });
    const maxPoint = [p1, p2, p3, p4].reduce((acc, cur) => {
      return new Vector2(Math.max(acc.x, cur.x), Math.max(acc.y, cur.y));
    });

    const width = maxPoint.x - minPoint.x;
    const height = maxPoint.y - minPoint.y;
    const { x, y } = minPoint;
    const key = `${index}_${x}_${y}_${width}_${height}}`;
    const rect = (
      <rect
        onMouseDown={onDrag}
        key={key}
        x={x}
        y={y}
        width={width}
        height={height}
        fill="transparent"
        cursor={'move'}
        ref={(el) => {
          lineWrappersRef.current[index] = el;
        }}
      />
    );
    return rect;
  }

  function createMidPoint(
    here: Vector2,
    next: Vector2,
    cursor: string,
    onDrag: MouseEventHandler,
    index: number,
  ) {
    const midPoint = here.clone().add(next).multiplyScalar(0.5);
    const { x: cx, y: cy } = midPoint;
    return (
      <circle
        display={isSelected ? 'block' : 'none'}
        ref={(el) => {
          midPointsRef.current[index] = el;
        }}
        key={`${index}_${cx}_${cy}`}
        cx={cx}
        cy={cy}
        r={pointRadius}
        fill="blue"
        cursor={cursor}
        onMouseDown={onDrag}
      />
    );
  }
};

export default InnerControlWrapper;
