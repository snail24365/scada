import { ReactComponent as ConverterSvg } from '@/assets/converter.svg';
import { BoxProperty } from '@/types/schema/propertySchema';
import { BBox } from '@/types/type';

type ConverterProps = BoxProperty & BBox;

const Converter = ({ width, height, x, y }: ConverterProps) => {
  return <ConverterSvg width={width} height={height} x={x} y={y}></ConverterSvg>;
};

export default Converter;
