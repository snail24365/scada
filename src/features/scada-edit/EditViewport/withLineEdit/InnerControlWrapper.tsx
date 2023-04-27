import { UUID, XY } from '@/type';
import { toVec2 } from '@/util/util';
import { ReactElement } from 'react';
import { Vector2 } from 'three';
import ControlPoint from './ControlPoint';
import LineMoveWrapper from './LineMoveWrapper';

type Props = {
  points: XY[];
  uuid: UUID;
  pointRadius: number;
};

const InnerControlWrapper = ({ points, uuid, pointRadius }: Props) => {
  const lineWrappers: ReactElement[] = [];
  const midPoints: ReactElement[] = [];

  const wrapperWidth = 4;
  for (let i = 0; i < points.length - 1; i++) {
    lineWrappers.push(createLineMoveWrapper(points, i));
    midPoints.push(createMidPoint(points, i));
  }

  return (
    <>
      {lineWrappers}
      {midPoints}
    </>
  );

  function createLineMoveWrapper(points: XY[], index: number) {
    const here = toVec2(points[index]);
    const next = toVec2(points[index + 1]);
    const isHorizontal = next.y === here.y;

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
    return (
      <LineMoveWrapper
        key={`${uuid}-${index}-mid-${here.x}-${here.y}-${next.x}-${next.y}}`}
        x={x}
        y={y}
        width={width}
        height={height}
        points={points}
        uuid={uuid}
      />
    );
  }

  function createMidPoint(points: XY[], index: number) {
    const here = points[index];
    const next = points[index + 1];
    const midPoint = toVec2(here).clone().add(toVec2(next)).multiplyScalar(0.5);
    const isHorizontal = next.y === here.y;
    const { x: cx, y: cy } = midPoint;
    return (
      <ControlPoint
        key={`${uuid}-${index}-mid-${here.x}-${here.y}-${next.x}-${next.y}}`}
        points={points}
        index={index}
        uuid={uuid}
        cx={cx}
        cy={cy}
        r={pointRadius}
        isHorizontal={isHorizontal}
      />
    );
  }
};

export default InnerControlWrapper;
