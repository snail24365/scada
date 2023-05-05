import { ReactComponent as Watertank } from '@/assets/watertank1.svg';
import { BoxProperty } from '@/types/schema';
import { BBox, BoxEntity } from '@/types/type';

type Watertank1Props = BoxProperty & BBox;

const Watertank1 = ({ width, height, x, y }: Watertank1Props) => {
  return <Watertank width={width} height={height} x={x} y={y}></Watertank>;
};

export default Watertank1;
