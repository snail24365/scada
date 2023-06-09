import { TextProperty } from '@/types/schema/propertySchema';
import { BBox } from '@/types/type';

export type TextProps = TextProperty & BBox;

const Text = (props: TextProps) => {
  const { x, y, width, height } = props;
  const text = props.text || '';

  return (
    <svg x={x} y={y} width={width} height={height} pointerEvents={'none'}>
      <foreignObject width="100%" height="100%">
        <div style={{ pointerEvents: 'all', width, height }}>
          <p css={{ ...props }}>{text}</p>
        </div>
      </foreignObject>
    </svg>
  );
};

export default Text;
