import { zoomRatioState } from '@/features/scada/atom/scadaAtom';
import { useRecoilValue } from 'recoil';

const ZoomRatioDisplay = () => {
  const zoomRatio = useRecoilValue(zoomRatioState);
  return <span css={{ color: '#fff', marginRight: 10 }}>{`Zoom: ${(zoomRatio * 100).toFixed(0)}%`}</span>;
};

export default ZoomRatioDisplay;
