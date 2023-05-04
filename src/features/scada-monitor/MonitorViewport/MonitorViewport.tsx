import React, { useEffect, useRef, useState } from 'react';
import MonitorScene, { getIsEmptyScene } from './MonitorScene';
import { darkBlue, darkBlue2, darkBlueGrey1 } from '@/assets/color';
import { useRecoilValue } from 'recoil';
import { computeViewportSizeState, resolutionState } from '@/features/scada/atom/scadaAtom';
import { flexCenter } from '@/style/style';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentPageId } from '../slice/scadaPageSlice';
import { fetchScadaMonitorScene } from '../slice/scadaMonitorSceneSlice';
import EmptyScenePlaceholder from './EmptyScenePlaceholder';

const MonitorViewport = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  fetchMonitorSceneAfterMounted();

  const resolution = useRecoilValue(resolutionState);
  const isEmptyScene = useAppSelector(getIsEmptyScene);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  adjustViewportSize(containerRef, setViewport);

  return (
    <div
      ref={containerRef}
      css={[
        {
          width: '100%',
          height: '100%',
          backgroundColor: darkBlueGrey1
        },
        flexCenter
      ]}
    >
      {isEmptyScene ? (
        <EmptyScenePlaceholder />
      ) : (
        <MonitorScene width={viewport.width} height={viewport.height} resolution={resolution} />
      )}
    </div>
  );
};

export default MonitorViewport;
function adjustViewportSize(
  containerRef: React.RefObject<HTMLDivElement>,
  setViewportSize: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>
) {
  const computeViewportSize = useRecoilValue(computeViewportSizeState);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    const size = computeViewportSize(containerWidth, containerHeight);
    setViewportSize(size);
  }, [containerRef.current]);
}

function fetchMonitorSceneAfterMounted() {
  const dispatch = useAppDispatch();
  const currentScadaPageId = useAppSelector(selectCurrentPageId);

  useEffect(() => {
    (async () => {
      if (!currentScadaPageId) return;
      await dispatch(fetchScadaMonitorScene(currentScadaPageId));
    })();
  }, [currentScadaPageId]);
}
