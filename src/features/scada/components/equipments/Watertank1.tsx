import { ReactComponent as Watertank } from '@/assets/watertank1.svg';
import { BBox, BoxEntityProps } from '@/types/type';

type Props = React.SVGProps<SVGElement>;

const Watertank1 = ({ width, height, x, y }: Props) => {
  return <Watertank width={width} height={height} x={x} y={y}></Watertank>;
};

export default Watertank1;
