import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { motion } from 'framer-motion';
import Rectangle from './features/scada/Rectangle';
import { ButtonGroup, Button } from '@blueprintjs/core';
import _ from 'lodash';
import useDrag, { MouseButton } from './hook/useDrag';

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const eventContainerRef = useRef<HTMLDivElement>(null);
  const scadaEditViewportRef = useRef<SVGSVGElement>(null);

  const miniMapRef = useRef<HTMLDivElement>(null);
  const miniMapCanvasRef = useRef<HTMLCanvasElement>(null);
  const miniMapViewboxRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const [viewbox, setViewbox] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const viewboxRef = useRef(viewbox);

  const canvas = ref.current;

  const initialViewportWidth = 1500;
  const initialViewportHeight = 1200;
  const gridUnit = 10;

  const miniMapWidth = 200;
  const miniMapHeight = miniMapWidth * (viewport.height / viewport.width);

  const miniMap = miniMapRef.current;
  const miniMapCanvas = miniMapCanvasRef.current;
  const scadaViewport = scadaEditViewportRef.current;
  const miniMapViewbox = miniMapViewboxRef.current;

  // TODO : This function will implemented after refactored
  const onDragMiniViewport = useDrag(miniMapViewbox, {
    onMouseMove: (e) => {
      // if (!miniMapViewbox) return;
      // const speed = 2;
      // let newX = parseFloat(miniMapViewbox.style.left) + e.movementX * speed;
      // let newY = parseFloat(miniMapViewbox.style.top) + e.movementY * speed;
      // newX = _.clamp(newX, 0, miniMapWidth);
      // newY = _.clamp(newY, 0, parseFloat(miniMapViewbox.style.height) - miniMapHeight);
      // console.log(newX, newY);
      // miniMapViewbox.style.left = newX + 'px';
      // miniMapViewbox.style.top = newY + 'px';
    },
    mouseButton: MouseButton.LEFT,
  });

  useEffect(() => {
    viewboxRef.current.x = viewbox.x;
    viewboxRef.current.y = viewbox.y;
    viewboxRef.current.width = viewbox.width;
    viewboxRef.current.height = viewbox.height;

    if (!(miniMapCanvas && miniMap && scadaViewport && miniMapViewbox)) return;

    const isZoomed = viewport.width !== viewbox.width || viewport.height !== viewbox.height;
    miniMap.style.display = isZoomed ? 'block' : 'none';

    // TODO : this logic can be moved to inline style
    miniMapViewbox.style.width = (viewbox.width / viewport.width) * miniMapWidth + 'px';
    miniMapViewbox.style.height = (viewbox.height / viewport.height) * miniMapHeight + 'px';

    miniMapViewbox.style.top = (viewbox.y / viewport.height) * miniMapHeight + 'px';
    miniMapViewbox.style.left = (viewbox.x / viewport.width) * miniMapWidth + 'px';

    const fullSizeViewport = scadaViewport.cloneNode(true) as SVGSVGElement;
    fullSizeViewport.setAttribute('viewBox', `0 0 ${viewport.width} ${viewport.height}`);
    const fullSizeViewportData = new XMLSerializer().serializeToString(fullSizeViewport);
    const img = new Image();
    img.src = 'data:image/svg+xml,' + encodeURIComponent(fullSizeViewportData);
    img.onload = function () {
      const ctx = miniMapCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
      ctx.drawImage(img, 0, 0, miniMapCanvas.width, miniMapCanvas.height);
    };
  }, [viewbox]);

  useEffect(() => {
    if (!eventContainerRef.current) return;
    //const { width, height } = containerRef.current.getClientRects()[0];
    setViewport({ width: initialViewportWidth, height: initialViewportHeight });
  }, []);

  useEffect(() => {
    canvas?.style.setProperty('width', `${viewport.width}px`);
    canvas?.style.setProperty('height', `${viewport.height}px`);
    setViewbox({ x: 0, y: 0, width: viewport.width, height: viewport.height });
  }, [viewport]);

  const zoom = (type: 'in' | 'out') => {
    const zoomLimitRatio = 4;
    const lowerWidthLimit = initialViewportWidth / zoomLimitRatio;
    const lowerHeightLimit = initialViewportHeight / zoomLimitRatio;
    const initialViewportRatio = initialViewportHeight / initialViewportWidth;

    const inOutSign = type === 'in' ? -1 : 1;
    const zoomSpeed = 10;
    const xDelta = zoomSpeed * inOutSign;
    const yDelta = xDelta * initialViewportRatio;

    setViewbox((prev) => {
      let nextWidth = prev.width + 2 * xDelta;
      let nextHeight = prev.height + 2 * yDelta;

      let nextX = prev.x - xDelta;
      let nextY = prev.y - yDelta;

      if (nextX < 0) {
        nextX = 0;
      }

      if (nextY < 0) {
        nextY = 0;
      }

      if (nextX + nextWidth > viewport.width) {
        nextX = prev.x - 2 * xDelta;
      }

      if (nextY + nextHeight > viewport.height) {
        nextY = prev.y - 2 * yDelta;
      }

      if (nextWidth < lowerWidthLimit || nextWidth > viewport.width) {
        return prev;
      }

      if (nextHeight < lowerHeightLimit || nextHeight > viewport.height) {
        return prev;
      }

      return { width: nextWidth, height: nextHeight, x: nextX, y: nextY };
    });
  };

  const onWheelDrag = useDrag(eventContainerRef.current, {
    onMouseMove: (e) => {
      const viewbox = viewboxRef.current;
      const speed = 2;
      let newX = viewbox.x + e.movementX * speed;
      let newY = viewbox.y + e.movementY * speed;
      newX = _.clamp(newX, 0, viewport.width - viewbox.width);
      newY = _.clamp(newY, 0, viewport.height - viewbox.height);
      setViewbox((prev) => ({ ...prev, x: newX, y: newY }));
    },
    mouseButton: MouseButton.MIDDLE,
  });

  let gridPath = '';
  for (let n = 0; n < viewport.width; n += gridUnit) {
    gridPath += `M ${n} 0 L ${n} ${viewport.height} `;
  }
  for (let n = 0; n < viewport.height; n += gridUnit) {
    gridPath += `M 0 ${n} L ${viewport.width} ${n} `;
  }

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <div>
        <ul>icon</ul>
        <ul>icon</ul>
        <ul>icon</ul>
      </div>
      <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', height: '50px' }}>
          <div>Item</div>
          <div>Item</div>
          <div>Item</div>
          <div>Item</div>
        </div>
        <div style={{ width: '100%', flex: '1 1 auto', position: 'relative', display: 'flex', minHeight: 0, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div
              ref={eventContainerRef}
              style={{ width: viewport?.width, height: viewport?.height, position: 'relative', zIndex: 1, border: '1px solid black' }}
              onMouseDown={onWheelDrag}
              onWheel={(e) => {
                Math.sign(e.deltaY) < 0 ? zoom('in') : zoom('out');
              }}></div>

            <div
              className="mini-map"
              ref={miniMapRef}
              onMouseDown={onDragMiniViewport}
              style={{
                display: 'none',
                position: 'absolute',
                right: 60,
                bottom: 20,
                width: miniMapWidth,
                height: miniMapHeight,
                zIndex: 10,
                backgroundColor: 'white',
                border: '1px solid #ddd',
              }}>
              <div ref={miniMapViewboxRef} style={{ background: '#eeeeeeaa', border: '2px solid #6666fa', position: 'absolute', left: 0, top: 0 }}></div>
              <canvas
                ref={miniMapCanvasRef}
                style={{
                  width: '100%',
                  height: '100%',
                }}></canvas>
            </div>

            <div
              style={{
                position: 'absolute',
                right: 60,
                top: 10,
                width: 50,
                height: 50,
                zIndex: 1,
              }}>
              <ButtonGroup minimal={false} style={{ display: 'flex' }}>
                <Button
                  icon="zoom-in"
                  onClick={() => {
                    zoom('in');
                  }}></Button>
                <Button
                  icon="zoom-out"
                  onClick={() => {
                    zoom('out');
                  }}></Button>
                {/* <AnchorButton rightIcon="caret-down">Options</AnchorButton> */}
              </ButtonGroup>
            </div>
            <svg
              ref={scadaEditViewportRef}
              viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width ?? 0} ${viewbox.height ?? 0}`}
              width={'100%'}
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                left: 0,
                top: 0,
              }}>
              <g>
                <path d={gridPath} fill="transparent" stroke="silver" strokeWidth={0.5} />
                <circle></circle>
                <Rectangle />
                <rect x={10} y={10} width={100} height={100} fill="gold" />
                <rect x={10} y={800} width={100} height={90} fill="red" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
