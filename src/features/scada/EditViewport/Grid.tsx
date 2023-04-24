import { useRecoilValue } from 'recoil';
import { scadaEditUtil } from '../atom/scadaAtom';

type Props = {
  // gap: number;
};

const Grid = ({}: Props) => {
  const { gridUnit: gap, viewport } = useRecoilValue(scadaEditUtil);
  let d = '';

  for (let i = 0; i < viewport.width; i += gap) {
    d += `M ${i} 0 L ${i} ${viewport.height} `;
  }
  for (let i = 0; i < viewport.height; i += gap) {
    d += `M 0 ${i} L ${viewport.width} ${i} `;
  }
  return <path d={d} fill="transparent" stroke="silver" strokeWidth={0.5} />;
};

export default Grid;
