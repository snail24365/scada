import { useAppDispatch } from '@/store/hooks';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import onDragCallback, { MouseButton } from '@/util/onDragCallback';
import {
  containerRefState,
  scadaEditUtil,
  selectionBoxState,
  selectionMousedownState,
  viewboxState,
  viewportState,
} from '../atom/scadaAtom';
import EditScene from './EditScene';
import { EditViewportContext } from './EditViewportContext';
import Grid from './Grid';
import MiniMap from './MiniMap';
import SelectFrame from './SelectFrame';
import ToolButtonGroup from './ToolButtonGroup';
import { unselectAll } from './editViewportSlice';

type Props = {
  width: number;
  height: number;
};

const EditViewport = ({ width, height }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  const dispatch = useAppDispatch();

  const [viewport, setViewport] = useRecoilState(viewportState);
  const [viewbox, setViewbox] = useRecoilState(viewboxState);
  const setContainerRef = useSetRecoilState(containerRefState);

  useEffect(() => {
    setViewport({ width, height });
    setViewbox({ width, height, x: 0, y: 0 });
    setContainerRef(containerRef);
    return () => {
      setContainerRef({ current: null });
    };
  }, []);

  const viewboxRef = useRef({ ...viewbox });

  const canvas = ref.current;

  const miniMapWidth = 200;
  const editViewportContextValue = {
    viewboxRef,
  };

  useEffect(() => {
    viewboxRef.current.x = viewbox.x;
    viewboxRef.current.y = viewbox.y;
    viewboxRef.current.width = viewbox.width;
    viewboxRef.current.height = viewbox.height;
  }, [viewbox]);

  useEffect(() => {
    canvas?.style.setProperty('width', `${viewport.width}px`);
    canvas?.style.setProperty('height', `${viewport.height}px`);
    console.log(viewport.width, viewport.height);
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

      let newX = Math.max(prev.x - xDelta, 0);
      let newY = Math.max(prev.y - yDelta, 0);

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

  const onWheelDrag = onDragCallback({
    moveTarget: containerRef,
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

  const zoomMagnification = 10;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const isEmptySpaceClicked = e.target === containerRef.current;
    if (isEmptySpaceClicked) {
      dispatch(unselectAll());
    }
    onWheelDrag(e);
  };

  return (
    <EditViewportContext.Provider value={editViewportContextValue}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            width: viewport?.width,
            height: viewport?.height,
            zIndex: 200,
            border: '1px solid black',
          }}
          onMouseDown={onMouseDown}>
          <svg
            ref={containerRef}
            onWheel={(e) => {
              Math.sign(e.deltaY) < 0 ? zoom('in') : zoom('out');
            }}
            viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width ?? 0} ${viewbox.height ?? 0}`}
            width={'100%'}
            css={{
              zIndex: 100,
              backgroundColor: 'transparent',
            }}>
            <Grid />
            <EditScene />
            <SelectFrame />
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
            zIndex: 250,
          }}>
          <ToolButtonGroup
            onZoomIn={() => {
              zoom('in', zoomMagnification);
            }}
            onZoomOut={() => {
              zoom('out', zoomMagnification);
            }}
          />
        </div>
      </div>
    </EditViewportContext.Provider>
  );
};

export default EditViewport;
