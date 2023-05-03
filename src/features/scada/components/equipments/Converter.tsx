import { ReactComponent as ConverterSvg } from '@/assets/converter.svg';
import { BoxProperty } from '@/types/schema';
import { BBox } from '@/types/type';

type Props = BoxProperty & BBox;

const Converter = ({ width, height, x, y }: Props) => {
  return <ConverterSvg width={width} height={height} x={x} y={y}></ConverterSvg>;
};

export default Converter;
