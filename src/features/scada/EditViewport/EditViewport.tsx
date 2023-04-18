import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import useDrag, { MouseButton } from '../../../hook/useDrag';
import Pump from '../Pump';
import Rectangle from '../Rectangle';
import { EditViewportContext } from './EditViewportContext';
import Grid from './Grid';
import MiniMap from './MiniMap';
import ToolButtonGroup from './ToolButtonGroup';
import withEdit from './withEdit';

type Props = {
  width: number;
  height: number;
};

const EditViewport = ({ width, height }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const editViewportSvgRef = useRef<SVGSVGElement>(null);

  const [viewport, setViewport] = useState({ width, height });
  const [viewbox, setViewbox] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const viewboxRef = useRef({ ...viewbox });

  const canvas = ref.current;

  const gridUnit = 10;
  const miniMapWidth = 200;

  const editViewportContextValue = { viewbox, viewport, setViewbox, setViewport, editViewportSvgRef, viewboxRef };

  useEffect(() => {
    viewboxRef.current.x = viewbox.x;
    viewboxRef.current.y = viewbox.y;
    viewboxRef.current.width = viewbox.width;
    viewboxRef.current.height = viewbox.height;
  }, [viewbox]);

  useEffect(() => {
    canvas?.style.setProperty('width', `${viewport.width}px`);
    canvas?.style.setProperty('height', `${viewport.height}px`);
    setViewbox({ x: 0, y: 0, width: viewport.width, height: viewport.height });
  }, [viewport]);

  const zoom = (type: 'in' | 'out', amount: number = 1) => {
    const zoomLimitRatio = 4;
    const widthLowerBound = width / zoomLimitRatio;
    const heightLowerBound = height / zoomLimitRatio;
    const initialViewportRatio = height / width;

    const inOutSign = type === 'in' ? -1 : 1;
    const zoomSpeed = 10 * amount;
    const xDelta = zoomSpeed * inOutSign;
    const yDelta = xDelta * initialViewportRatio;

    setViewbox((prev) => {
      let newWidth = prev.width + 2 * xDelta;
      let newHeight = prev.height + 2 * yDelta;

      let newX = prev.x - xDelta;
      let newY = prev.y - yDelta;

      newX = Math.max(newX, 0);
      newY = Math.max(newY, 0);

      if (newX + newWidth > viewport.width) {
        newX = prev.x - 2 * xDelta;
      }

      if (newY + newHeight > viewport.height) {
        newY = prev.y - 2 * yDelta;
      }

      const isWidthValid = newWidth >= widthLowerBound && newWidth <= viewport.width;
      const isHeightValid = newHeight >= heightLowerBound && newHeight <= viewport.height;
      const isValid = isWidthValid && isHeightValid;
      if (!isValid) return prev;

      return { width: newWidth, height: newHeight, x: newX, y: newY };
    });
  };

  const onWheelDrag = useDrag(containerRef, {
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

  const zoomAmount = 10;

  const EditablePump = withEdit(Pump);

  return (
    <EditViewportContext.Provider value={editViewportContextValue}>
      <div style={{ position: 'relative' }}>
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: viewport?.width,
            height: viewport?.height,
            zIndex: 1,
            border: '1px solid black',
          }}
          onMouseDown={onWheelDrag}
          onWheel={(e) => {
            Math.sign(e.deltaY) < 0 ? zoom('in') : zoom('out');
          }}>
          <svg
            ref={editViewportSvgRef}
            viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width ?? 0} ${viewbox.height ?? 0}`}
            width={'100%'}
            css={{
              zIndex: 5,
              backgroundColor: 'transparent',
            }}>
            <g>
              <Grid gap={gridUnit} />
              <rect x={10} y={10} width={300} height={300} fill="gold" cursor={'pointer'} />
              <rect x={10} y={10} width={100} height={100} fill="gold" />
              <Rectangle />
              <rect x={300} y={800} width={100} height={90} fill="red" />
              <EditablePump x={150} y={150} width={900} height={600} />
            </g>
          </svg>
        </div>

        <MiniMap width={miniMapWidth} />
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: 10,
            width: 50,
            height: 50,
            zIndex: 1,
          }}>
          <ToolButtonGroup
            onZoomIn={() => {
              zoom('in', zoomAmount);
            }}
            onZoomOut={() => {
              zoom('out', zoomAmount);
            }}
          />
        </div>
      </div>
    </EditViewportContext.Provider>
  );
};

export default EditViewport;
