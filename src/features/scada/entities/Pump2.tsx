import { ReactComponent as PumpSvg } from '@/assets/pump2.svg';
import { BBox } from '@/type';

type Props = {} & BBox;

const Pump2 = ({ width, height, x, y }: Props) => {
  return <PumpSvg width={width} height={height} x={x} y={y}></PumpSvg>;
};

export default Pump2;
