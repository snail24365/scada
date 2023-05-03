import { ShapeProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Props = ShapeProperty & BBox;

const Circle = (props: Props) => {
  const { width, height, fill, x, y } = props;
  const strokeWidth = props.strokeWidth ?? 0;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.max(Math.min(width / 2, height / 2) - strokeWidth, 0);

  return (
    <svg x={props.x} y={props.y} width={props.width} height={props.height}>
      <circle {...props} cx={cx} cy={cy} r={r} fill={fill} />
    </svg>
  );
};

export default Circle;
