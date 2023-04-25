import { ReactComponent as Watertank } from '@/assets/watertank2.svg';
import { BoxEntityProps } from '@/type';

type Props = {} & BoxEntityProps;

const Watertank2 = ({ width, height, x, y }: Props) => {
  return <Watertank width={width} height={height} x={x} y={y}></Watertank>;
};

export default Watertank2;
