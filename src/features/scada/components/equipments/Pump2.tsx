import { ReactComponent as PumpSvg } from '@/assets/pump2.svg';
import { BoxProperty } from '@/types/schema/propertySchema';
import { BBox } from '@/types/type';

type Pump2Props = BoxProperty & BBox;

const Pump2 = ({ width, height, x, y }: Pump2Props) => {
  return <PumpSvg width={width} height={height} x={x} y={y}></PumpSvg>;
};

export default Pump2;
