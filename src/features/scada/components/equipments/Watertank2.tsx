import { ReactComponent as Watertank } from '@/assets/watertank2.svg';
import { BoxProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Watertank2Props = BoxProperty & BBox;

const Watertank2 = ({ width, height, x, y }: Watertank2Props) => {
  return <Watertank width={width} height={height} x={x} y={y}></Watertank>;
};

export default Watertank2;
