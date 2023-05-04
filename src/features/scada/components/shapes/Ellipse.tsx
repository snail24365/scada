import { ShapeProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Props = ShapeProperty & BBox;

const Ellipse = (props: Props) => {
  const { width, height } = props;
  const cx = width / 2;
  const cy = height / 2;
  const strokeWidth = props.strokeWidth ?? 0;
  const rx = Math.max(width / 2 - strokeWidth, 1);
  const ry = Math.max(height / 2 - strokeWidth, 1);
  return (
    <svg {...props}>
      <ellipse {...props} cx={cx} cy={cy} rx={rx} ry={ry} strokeWidth={3} preserveAspectRatio="none" x={0} y={0} />
    </svg>
  );
};

export default Ellipse;
