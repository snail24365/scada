import { ReactComponent as GastankSvg } from '@/assets/gastank.svg';
import { BBox, BoxEntityProps } from '@/type';

type Props = {} & BoxEntityProps;

const Gastank = ({ width, height, x, y }: Props) => {
  return <GastankSvg width={width} height={height} x={x} y={y}></GastankSvg>;
};

export default Gastank;
