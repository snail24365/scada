import { ReactComponent as GastankSvg } from '@/assets/gastank.svg';
import { BBox } from '@/type';

type Props = {} & BBox;

const Gastank = ({ width, height, x, y }: Props) => {
  return <GastankSvg width={width} height={height} x={x} y={y}></GastankSvg>;
};

export default Gastank;
