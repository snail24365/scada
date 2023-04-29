import { ReactComponent as ArrowEastSvg } from '@/assets/arrow_east.svg';
import { ReactComponent as ArrowNorthSvg } from '@/assets/arrow_north.svg';
import { ReactComponent as ArrowSouthSvg } from '@/assets/arrow_south.svg';
import { ReactComponent as ArrowWestSvg } from '@/assets/arrow_west.svg';
import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import { useAppDispatch } from '@/store/hooks';
import { BoxState } from '@/types/type';
import { manhattanDistance, mapVector2, toVec2 } from '@/util/util';
import { useContext, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Vector2 } from 'three';
import { v4 as uuidV4 } from 'uuid';
import { addLine, updateLinePoint } from '../editSceneSlice';
import { EditViewportContext } from '../EditViewportContext';
import { filterAdjointUnique } from '../util';
import { WithBoxEditContext } from './WithBoxEditContext';
import { EditSectionContext } from '../../EditSectionContext';

const LinkArrow = (props: BoxState) => {
  const { width, height, x, y, uuid: boxUUID } = props;
  const { rootSvgRef: containerRef } = useContext(EditSectionContext);

  const { gridUnit, getXY, clamp, isEditing } = useRecoilValue(scadaEditUtil);

  const { showArrow, isBoxEditing, isSelected } = useContext(WithBoxEditContext);

  const arrowHeight = 40;
  const arrowWidth = 40;

  const arrowInfos = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 }
  ];

  const halfW = width / 2;
  const halfH = height / 2;
  const sources = [
    { base: new Vector2(x + halfW, y), normal: new Vector2(0, -1) },
    { base: new Vector2(x + halfW, y + height), normal: new Vector2(0, 1) },
    { base: new Vector2(x, y + halfH), normal: new Vector2(-1, 0) },
    { base: new Vector2(x + width, y + halfH), normal: new Vector2(1, 0) }
  ];

  const dispatch = useAppDispatch();

  const arrowRef = useRef<SVGGElement>(null);

  let lineUUID = '';
  const onMouseDownDrag = useDrag({
    moveElementRef: containerRef,
    onMouseDown: () => {
      const container = containerRef.current;
      if (!container) return;
      lineUUID = uuidV4();
      dispatch(
        addLine({
          points: [
            { x: 0, y: 0 },
            { x: 1, y: 0 }
          ],
          uuid: lineUUID
        })
      );
    },
    onMouseMove: (e) => {
      const container = containerRef.current;
      if (!container) return;

      const target = toVec2(getXY(e));
      const source = sources.reduce((prev, curr) => {
        return manhattanDistance(target, curr.base) < manhattanDistance(target, prev.base) ? curr : prev;
      });

      const { base, normal } = source;
      const gap = mapVector2(new Vector2().subVectors(target, base), Math.abs);
      const clampedGap = mapVector2(gap, clamp);

      const isHorizontal = normal.y === 0;

      let mid1 = new Vector2().addVectors(base, normal.clone().multiplyScalar(0.5).multiply(clampedGap));

      let end = mapVector2(target, clamp);

      const normalDistance = isHorizontal ? Math.abs(target.y - base.y) : Math.abs(target.x - base.x);
      const threshold = gridUnit / 2;
      const isUnderThreshold = normalDistance < threshold;

      if (isUnderThreshold) {
        end = new Vector2().addVectors(base, normal.clone().multiply(clampedGap));
      }
      let mid2 = new Vector2(normal.x === 0 ? end.x : mid1.x, normal.y === 0 ? end.y : mid1.y);

      let points = [base, mid1, mid2, end].map((v) => ({ x: v.x, y: v.y }));
      const uniquePoints = filterAdjointUnique(points);

      dispatch(updateLinePoint({ uuid: lineUUID, points: uniquePoints }));
    }
  });

  const display = showArrow && !isBoxEditing && !isEditing ? 'block' : 'none';

  const Arrows = [ArrowWestSvg, ArrowEastSvg, ArrowNorthSvg, ArrowSouthSvg];

  const arrows = arrowInfos.map(({ dx, dy }, i) => {
    const pivotX = x + (width / 2) * (dx + 1);
    const pivotY = y + (height / 2) * (dy + 1);
    const rectX = pivotX + (arrowHeight * (dx - 1)) / 2;
    const rectY = pivotY + (arrowWidth * (dy - 1)) / 2;
    const ArrowSvg = Arrows[i];
    return (
      <svg
        key={i}
        x={rectX}
        y={rectY}
        width={arrowWidth}
        height={arrowHeight}
        cursor={'crosshair'}
        opacity={0.3}
        css={{
          '&:hover': {
            opacity: 1
          }
        }}
      >
        <g display={display}>
          <ArrowSvg width={arrowWidth} height={arrowHeight} />
        </g>
        <rect x={0} y={0} fill="transparent" width={arrowWidth} height={arrowWidth} onMouseDown={onMouseDownDrag} />
      </svg>
    );
  });

  return <g ref={arrowRef}>{arrows}</g>;
};

export default LinkArrow;
