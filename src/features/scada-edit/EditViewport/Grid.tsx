import { useRecoilValue } from 'recoil';
import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';

const Grid = () => {
  const { gridUnit, viewport } = useRecoilValue(scadaEditUtil);
  let d = '';
  for (let i = 0; i < viewport.resolutionX; i += gridUnit) {
    d += `M ${i} 0 L ${i} ${viewport.resolutionY} `;
  }
  for (let i = 0; i < viewport.resolutionY; i += gridUnit) {
    d += `M 0 ${i} L ${viewport.resolutionX} ${i} `;
  }
  return <path d={d} fill="transparent" stroke="silver" strokeWidth={0.1} />;
};

export default Grid;
