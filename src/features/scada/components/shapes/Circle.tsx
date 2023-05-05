import { ShapeProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type CircleProps = ShapeProperty & BBox;

const Circle = (props: CircleProps) => {
  const { width, height, fill, x, y } = props;
  const strokeWidth = props.strokeWidth ?? 0;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.max(Math.min(width / 2, height / 2) - strokeWidth, 0);

  return (
    <svg {...props}>
      <circle {...props} cx={cx} cy={cy} r={r} fill={fill} />
    </svg>
  );
};

export default Circle;
