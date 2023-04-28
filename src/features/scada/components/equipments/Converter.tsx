import { ReactComponent as ConverterSvg } from '@/assets/converter.svg';

type Props = React.SVGProps<SVGElement>;

const Converter = ({ width, height, x, y }: Props) => {
  return <ConverterSvg width={width} height={height} x={x} y={y}></ConverterSvg>;
};

export default Converter;
