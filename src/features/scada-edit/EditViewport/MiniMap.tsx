import { resolutionState, viewboxState } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import useInterval from '@/hooks/useInterval';
import useRefObjectSync from '@/hooks/useRefObjectSync';
import { fitParent } from '@/style/style';
import { DisplayStyle } from '@/types/type';
import { drawNodeOnCanvas, toVec2, toXY } from '@/util/util';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Vector2 } from 'three';
import { EditSectionContext } from '../EditSectionContext';
import { darkBlue2, primaryBlue, primaryGrey } from '@/assets/color';

type Props = { width: number };

const MiniMap = ({ width }: Props) => {
  const { rootSvgRef, rootDivRef } = useContext(EditSectionContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomFrameRef = useRef<HTMLDivElement>(null);

  const resolution = useRecoilValue(resolutionState);
  const { x: resolutionX, y: resolutionY } = resolution;
  const [viewbox, setViewbox] = useRecoilState(viewboxState);

  const viewportRatio = resolutionY / resolutionX;
  const viewboxRatio = viewbox.height / viewbox.width;
  const height = viewportRatio * width;

  const widthRatio = width / resolutionX;
  const heightRatio = height / resolutionY;

  const [display, setDisplay] = useState<DisplayStyle>('none');
  const [zoomBox, setZoomBox] = useState({
    left: 0,
    top: 0,
    width,
    height: width * viewboxRatio
  });
  const zoomBoxRef = useRef({ ...zoomBox });
  const renderPeriod = 300;

  useRefObjectSync(zoomBoxRef, zoomBox);

  useEffect(() => {
    updateZoom();
  }, [resolution, viewbox]);

  useEffect(() => {
    drawMinimap();
  }, [resolution, viewbox]);

  useInterval(drawMinimap, renderPeriod, [drawMinimap]);

  const onMouseDownDrag = useDrag({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    moveElementRef: rootDivRef
  });

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDownDrag}
      css={{
        display,
        position: 'absolute',
        right: 60,
        bottom: 20,
        width,
        height,
        zIndex: 30,
        backgroundColor: darkBlue2,
        opacity: 0.9,
        border: `1px solid ${primaryGrey}`
      }}
    >
      <div
        ref={zoomFrameRef}
        css={{
          background: '#eeeeee33',
          border: `2px solid ${primaryBlue}`,
          position: 'absolute',
          ...zoomBox
        }}
      ></div>
      <canvas ref={canvasRef} css={fitParent}></canvas>
    </div>
  );

  function drawMinimap() {
    const rootSvg = rootSvgRef.current;
    const canvas = canvasRef.current;

    if (!(rootSvg && canvas)) return;

    const shrinkedRootSvg = rootSvg.cloneNode(true) as SVGSVGElement;
    shrinkedRootSvg.setAttribute('viewBox', `0 0 ${resolutionX} ${resolutionY}`);
    drawNodeOnCanvas(shrinkedRootSvg, canvas);
  }

  function updateZoom() {
    const isZoomed = resolutionX !== viewbox.width || resolutionY !== viewbox.height;
    setDisplay(isZoomed ? 'block' : 'none');
    setZoomBox({
      width: viewbox.width * widthRatio,
      height: viewbox.height * heightRatio,
      left: viewbox.x * widthRatio,
      top: viewbox.y * heightRatio
    });
  }

  function calculateNextViewboxXY(container: HTMLDivElement, e: React.MouseEvent) {
    const offset = toVec2(container.getBoundingClientRect());
    const nextXY = new Vector2(e.clientX, e.clientY)
      .sub(offset)
      .sub(new Vector2(zoomBox.width / 2, zoomBox.height / 2))
      .clamp(new Vector2(0, 0), new Vector2(width - zoomBox.width, height - zoomBox.height))
      .divide(new Vector2(width, height))
      .multiply(new Vector2(resolutionX, resolutionY));
    return toXY(nextXY);
  }

  function onMouseDown(e: React.MouseEvent) {
    const container = containerRef.current;
    if (!container) return;
    const { x, y } = calculateNextViewboxXY(container, e);
    setViewbox((prev) => ({ ...prev, x, y }));
    container.style.pointerEvents = 'none';
  }

  function onMouseMove(e: React.MouseEvent) {
    const container = containerRef.current;
    if (!container) return;
    const { x, y } = calculateNextViewboxXY(container, e);
    setViewbox((prev) => ({ ...prev, x, y }));
  }

  function onMouseUp() {
    const container = containerRef.current;
    if (!container) return;
    container.style.pointerEvents = 'auto';
  }
};

export default MiniMap;
