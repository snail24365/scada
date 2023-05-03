import { useRecoilValue } from 'recoil';
import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';

const Grid = () => {
  const { gridUnit, resolution } = useRecoilValue(scadaEditUtil);
  const { resolutionX, resolutionY } = resolution;
  let d = '';
  for (let i = 0; i < resolutionX; i += gridUnit) {
    d += `M ${i} 0 L ${i} ${resolutionY} `;
  }
  for (let i = 0; i < resolutionY; i += gridUnit) {
    d += `M 0 ${i} L ${resolutionX} ${i} `;
  }
  return <path d={d} fill="transparent" stroke="#222" strokeWidth={0.5} />;
};

export default Grid;
