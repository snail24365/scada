import { ReactComponent as PumpSvg } from '@/assets/pump2.svg';
import { BoxProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Props = BoxProperty & BBox;

const Pump2 = ({ width, height, x, y }: Props) => {
  return <PumpSvg width={width} height={height} x={x} y={y}></PumpSvg>;
};

export default Pump2;
