import { ShapeProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type DiamondProps = ShapeProperty & BBox;

const Diamond = (props: DiamondProps) => {
  const { width, height } = props;
  const strokeWidth = props.strokeWidth ?? 0;
  const p1 = { x: width / 2, y: 0 };
  const p2 = { x: width, y: 0 + height / 2 };
  const p3 = { x: width / 2, y: height };
  const p4 = { x: 0, y: height / 2 };
  const d = `M${p1.x} ${p1.y} L${p2.x} ${p2.y} L${p3.x} ${p3.y} L${p4.x} ${p4.y} Z`;
  return (
    <svg {...props}>
      <path {...props} d={d} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default Diamond;
