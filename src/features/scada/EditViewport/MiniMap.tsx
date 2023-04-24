import React, { useContext, useEffect, useRef, useState } from 'react';
import onDragCallback, { MouseButton } from '../../../util/onDragCallback';
import { EditViewportContext } from './EditViewportContext';
import { Viewbox } from '../../../type';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { containerRefState, viewboxState, viewportState } from '../atom/scadaAtom';

type Props = { width: number };

const MiniMap = ({ width }: Props) => {
  const container = useRecoilValue(containerRefState);
  const miniMapContainerRef = useRef<HTMLDivElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const zoomAreaRef = useRef<HTMLDivElement>(null);

  const bgCanvas = backgroundCanvasRef.current;

  const viewport = useRecoilValue(viewportState);
  const [viewbox, setViewbox] = useRecoilState(viewboxState);

  const editViewportSvg = container.current;
  const miniMapContainer = miniMapContainerRef.current;

  const viewportRatio = viewport.height / viewport.width;
  const viewboxRatio = viewbox.height / viewbox.width;

  const height = viewportRatio * width;

  const [display, setDisplay] = useState<'none' | 'block'>('none');
  const [zoomBox, setZoomBox] = useState({ left: 0, top: 0, width, height: width * viewboxRatio });
  const zoomBoxRef = useRef({ ...zoomBox });

  useEffect(() => {
    zoomBoxRef.current.left = zoomBox.left;
    zoomBoxRef.current.top = zoomBox.top;
    zoomBoxRef.current.width = zoomBox.width;
    zoomBoxRef.current.height = zoomBox.height;
  }, [zoomBox]);

  useEffect(() => {
    updateZoomArea();
    drawSvg();

    function updateZoomArea() {
      const isZoomed = viewport.width !== viewbox.width || viewport.height !== viewbox.height;
      setDisplay(isZoomed ? 'block' : 'none');
      setZoomBox({
        width: (viewbox.width / viewport.width) * width,
        height: (viewbox.height / viewport.height) * height,
        left: (viewbox.x / viewport.width) * width,
        top: (viewbox.y / viewport.height) * height,
      });
    }
  }, [viewbox]);

  useEffect(() => {
    const interval = setInterval(() => {
      drawSvg();
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function drawSvg() {
    if (!(editViewportSvg && bgCanvas)) return;
    const originSVg = editViewportSvg.cloneNode(true) as SVGSVGElement;
    originSVg.setAttribute('viewBox', `0 0 ${viewport.width} ${viewport.height}`);
    const originSvgSerialized = new XMLSerializer().serializeToString(originSVg);
    const img = new Image();
    img.src = 'data:image/svg+xml,' + encodeURIComponent(originSvgSerialized);
    img.onload = () => {
      const ctx = bgCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      ctx.drawImage(img, 0, 0, bgCanvas.width, bgCanvas.height);
    };
  }

  const onDrag = (() => {
    const getUpdatedXYOnMousedown = (miniMapContainer: HTMLDivElement, e: React.MouseEvent) => {
      const { x: offsetX, y: offsetY } = miniMapContainer.getBoundingClientRect();
      console.log(offsetX, offsetY, e.clientX - offsetX, e.clientY - offsetY);

      const clampedX = _.clamp(e.clientX - offsetX - zoomBox.width / 2, 0, width - zoomBox.width);
      const clampedY = _.clamp(
        e.clientY - offsetY - zoomBox.height / 2,
        0,
        height - zoomBox.height,
      );
      const x = (clampedX / width) * viewport.width;
      const y = (clampedY / height) * viewport.height;
      return { x, y };
    };

    const getUpdatedXYOnMousemove = (miniMapContainer: HTMLDivElement, e: React.MouseEvent) => {
      const { x: miniMapOffsetX, y: miniMapOffsetY } = miniMapContainer.getBoundingClientRect();
      const relativeContainerX = e.clientX - miniMapOffsetX;
      const relativeContainerY = e.clientY - miniMapOffsetY;
      const clampedX = _.clamp(relativeContainerX - zoomBox.width / 2, 0, width - zoomBox.width);
      const clampedY = _.clamp(relativeContainerY - zoomBox.height / 2, 0, height - zoomBox.height);
      const x = (clampedX / width) * viewport.width;
      const y = (clampedY / height) * viewport.height;
      return { x, y };
    };

    const onMouseDown = (e: React.MouseEvent) => {
      if (!miniMapContainer) return;
      const { x, y } = getUpdatedXYOnMousedown(miniMapContainer, e);
      setViewbox((prev) => ({ ...prev, x, y }));
      miniMapContainer.style.pointerEvents = 'none';
    };

    const onMouseMove = (e: React.MouseEvent) => {
      if (!miniMapContainer) return;
      const { x, y } = getUpdatedXYOnMousemove(miniMapContainer, e);
      setViewbox((prev) => ({ ...prev, x, y }));
    };

    const onMouseUp = () => {
      if (!miniMapContainer) return;
      miniMapContainer.style.pointerEvents = 'auto';
    };

    return onDragCallback({
      moveTarget: container,
      leaveTarget: container,
      mouseButton: MouseButton.LEFT,
      onMouseDown,
      onMouseMove,
      onMouseUp,
    });
  })();

  if (viewport.width === 0 || viewbox.width === 0) return <></>;

  return (
    <div
      ref={miniMapContainerRef}
      // onMouseMove={(e) => {
      //   console.log(e.target);
      // }}
      onMouseDown={onDrag}
      style={{
        display,
        position: 'absolute',
        right: 60,
        bottom: 20,
        width,
        height,
        zIndex: 300,
        backgroundColor: 'white',
        border: '1px solid #ddd',
      }}>
      <div
        ref={zoomAreaRef}
        style={{
          background: '#eeeeeeaa',
          border: '2px solid #6666fa',
          position: 'absolute',
          ...zoomBox,
        }}></div>
      <canvas
        ref={backgroundCanvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}></canvas>
    </div>
  );
};

export default MiniMap;
