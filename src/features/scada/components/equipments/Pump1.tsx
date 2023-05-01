import { ReactComponent as PumpSvg } from '@/assets/pump1.svg';
import { BBox, BoxEntity } from '@/types/type';

type Props = React.SVGProps<SVGElement>;

const Pump1 = ({ width, height, x, y }: Props) => {
  return <PumpSvg width={width} height={height} x={x} y={y}></PumpSvg>;
};

export default Pump1;
