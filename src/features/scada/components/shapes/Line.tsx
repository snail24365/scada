import { XY } from '../../../../types/type';

export type LineProps = {
  points: XY[];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

const Line = ({ points }: LineProps) => {
  let d = 'M';
  if (points[0]) {
    d += `${points[0].x},${points[0].y}`;
  }
  for (let i = 1; i < points.length; i++) {
    d += ` L${points[i].x},${points[i].y}`;
  }
  return <path d={d} stroke="#eee" fill="transparent" />;
};

export default Line;
