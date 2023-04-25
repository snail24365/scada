import { ReactComponent as ConverterSvg } from '@/assets/converter.svg';
import { BBox } from '@/type';
import { BoxEntityProps } from '../../../type';

type Props = {} & BoxEntityProps;

const Converter = ({ width, height, x, y }: Props) => {
  return <ConverterSvg width={width} height={height} x={x} y={y}></ConverterSvg>;
};

export default Converter;
