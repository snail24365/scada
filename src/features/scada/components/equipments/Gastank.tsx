import { ReactComponent as GastankSvg } from '@/assets/gastank.svg';
import { BoxProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Props = BoxProperty & BBox;

const Gastank = ({ width, height, x, y }: Props) => {
  return <GastankSvg width={width} height={height} x={x} y={y}></GastankSvg>;
};

export default Gastank;
