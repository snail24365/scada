import { darkBlueGrey1 } from '@/assets/color';
import Placeholder from '@/components/Placeholder';
import { computeViewportSizeState, resolutionState } from '@/features/scada/atom/scadaAtom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { flexCenter, full } from '@/style/style';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { fetchScadaMonitorScene, getIsEmptyScene } from '../slice/scadaMonitorSceneSlice';
import { selectCurrentPageId } from '../slice/scadaPageSlice';
import MonitorScene from './MonitorScene';

const MonitorViewport = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  fetchMonitorSceneAfterMounted();

  const resolution = useRecoilValue(resolutionState);
  const isEmptyScene = useAppSelector(getIsEmptyScene);
  const isFailed = useAppSelector((state) => state.monitorScene.status === 'failed');
  const isSucceeded = useAppSelector((state) => state.monitorScene.status === 'succeeded');

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  adjustViewportSize(containerRef, setViewport);

  let message = null;
  if (isEmptyScene && isSucceeded) {
    message = `No component in the scene.`;
  } else if (isFailed) {
    message = `Failed to load scene. Please check your network.`;
  }

  return (
    <div
      ref={containerRef}
      css={[
        flexCenter,
        full,
        {
          backgroundColor: darkBlueGrey1
        }
      ]}
    >
      {message ? (
        <Placeholder contents={message} />
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
