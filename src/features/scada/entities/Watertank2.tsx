import { ReactComponent as Watertank } from '@/assets/watertank2.svg';
import { BBox } from '@/type';

type Props = {} & BBox;

const Watertank2 = ({ width, height, x, y }: Props) => {
  return <Watertank width={width} height={height} x={x} y={y}></Watertank>;
};

export default Watertank2;
