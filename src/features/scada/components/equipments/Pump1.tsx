import { ReactComponent as PumpSvg } from '@/assets/pump1.svg';
import { BoxProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Props = BoxProperty & BBox;

const Pump1 = ({ width, height, x, y }: Props) => {
  return <PumpSvg width={width} height={height} x={x} y={y}></PumpSvg>;
};

export default Pump1;
