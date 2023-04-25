import { useRecoilValue } from 'recoil';
import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';

type Props = {
  // gap: number;
};

const Grid = ({}: Props) => {
  const { gridUnit: gap, viewport } = useRecoilValue(scadaEditUtil);
  let d = '';

  for (let i = 0; i < viewport.resolutionX; i += gap) {
    d += `M ${i} 0 L ${i} ${viewport.resolutionY} `;
  }
  for (let i = 0; i < viewport.resolutionY; i += gap) {
    d += `M 0 ${i} L ${viewport.resolutionX} ${i} `;
  }
  return <path d={d} fill="transparent" stroke="silver" strokeWidth={0.5} />;
};

export default Grid;
