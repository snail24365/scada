import React, { useEffect, useRef, useState } from 'react';
import MonitorScene from './MonitorScene';
import { darkBlue, darkBlue2, darkBlueGrey1 } from '@/assets/color';
import { useRecoilValue } from 'recoil';
import { computeViewportSizeState, resolutionState } from '@/features/scada/atom/scadaAtom';
import { flexCenter } from '@/style/style';

const MonitorViewport = () => {
  const computeViewportSize = useRecoilValue(computeViewportSizeState);
  const resolution = useRecoilValue(resolutionState);
  const { resolutionX, resolutionY } = resolution;

  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    const size = computeViewportSize(containerWidth, containerHeight);
    setViewportSize(size);
  }, [containerRef.current]);

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
      <svg {...viewportSize} viewBox={`0 0 ${resolutionX} ${resolutionY}`}>
        <MonitorScene />
      </svg>
    </div>
  );
};

export default MonitorViewport;
