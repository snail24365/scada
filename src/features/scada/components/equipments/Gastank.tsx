import { ReactComponent as GastankSvg } from '@/assets/gastank.svg';
import { BoxProperty } from '@/types/schema/propertySchema';
import { BBox } from '@/types/type';

type GastankProps = BoxProperty & BBox;

const Gastank = ({ width, height, x, y }: GastankProps) => {
  return <GastankSvg width={width} height={height} x={x} y={y}></GastankSvg>;
};

export default Gastank;
