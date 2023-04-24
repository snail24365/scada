import { ReactComponent as ConverterSvg } from '@/assets/converter.svg';
import { BBox } from '@/type';

type Props = {} & BBox;

const Converter = ({ width, height, x, y }: Props) => {
  return <ConverterSvg width={width} height={height} x={x} y={y}></ConverterSvg>;
};

export default Converter;
