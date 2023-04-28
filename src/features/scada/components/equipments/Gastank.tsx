import { ReactComponent as GastankSvg } from '@/assets/gastank.svg';

type Props = React.SVGProps<SVGElement>;

const Gastank = ({ width, height, x, y }: Props) => {
  return <GastankSvg width={width} height={height} x={x} y={y}></GastankSvg>;
};

export default Gastank;
