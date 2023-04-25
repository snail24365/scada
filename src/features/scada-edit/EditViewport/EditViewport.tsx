import { useAppDispatch } from '@/store/hooks';
import onDragCallback, { MouseButton } from '@/util/onDragCallback';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { containerRefState, viewboxState, viewportState } from '@/features/scada/atom/scadaAtom';
import EditScene from './EditScene';
import { EditViewportContext } from './EditViewportContext';
import { unselectAll } from './editViewportSlice';
import Grid from './Grid';
import MiniMap from './MiniMap';
import SelectFrame from './SelectFrame';
import ToolButtonGroup from './ToolButtonGroup';

type Props = {
  resolutionX: number;
  resolutionY: number;
  width?: number;
  height?: number;
};

const EditViewport = (props: Props) => {
  const { resolutionX, resolutionY } = props;

  const rootDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);
  const container = containerRef.current;
  const dispatch = useAppDispatch();

  const [viewport, setViewport] = useRecoilState(viewportState);
  const [viewbox, setViewbox] = useRecoilState(viewboxState);
  const setContainerRef = useSetRecoilState(containerRefState);

  useEffect(() => {
    const rootDiv = rootDivRef.current;
    if (!rootDiv) return;

    const { width: containerWidth, height: containerHeight } = rootDiv.getBoundingClientRect();
    const width = props.width ?? (containerWidth || 0);
    const height = props.height ?? (containerHeight || 0);
    console.log(width, height);

    setViewport({ resolutionX, resolutionY, width, height });
    setViewbox({ width: resolutionX, height: resolutionY, x: 0, y: 0 });
    setContainerRef(containerRef);
    return () => {
      setContainerRef({ current: null });
    };
  }, []);

  const viewboxRef = useRef({ ...viewbox });

  const miniMapWidth = 200;
  const editViewportContextValue = {
    viewboxRef,
  };

  useEffect(() => {
    Object.assign(viewboxRef.current, viewbox);
  }, [viewbox]);

  useEffect(() => {
    setViewbox({ x: 0, y: 0, width: viewport.resolutionX, height: viewport.resolutionY });
  }, [viewport]);

  const zoom = (type: 'in' | 'out', amount: number = 1) => {
    const zoomLimitRatio = 4;
    const widthLowerBound = resolutionX / zoomLimitRatio;
    const heightLowerBound = resolutionY / zoomLimitRatio;
    const initialViewportRatio = resolutionY / resolutionX;

    const inOutSign = type === 'in' ? -1 : 1;
    const zoomSpeed = 10 * amount;
    const xDelta = zoomSpeed * inOutSign;
    const yDelta = xDelta * initialViewportRatio;

    setViewbox((prev) => {
      let newWidth = prev.width + 2 * xDelta;
      let newHeight = prev.height + 2 * yDelta;

      let newX = Math.max(prev.x - xDelta, 0);
      let newY = Math.max(prev.y - yDelta, 0);

      if (newX + newWidth > viewport.resolutionX) {
        newX = prev.x - 2 * xDelta;
      }

      if (newY + newHeight > viewport.resolutionY) {
        newY = prev.y - 2 * yDelta;
      }

      const isWidthValid = newWidth >= widthLowerBound && newWidth <= viewport.resolutionX;
      const isHeightValid = newHeight >= heightLowerBound && newHeight <= viewport.resolutionY;
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
      newX = _.clamp(newX, 0, viewport.resolutionX - viewbox.width);
      newY = _.clamp(newY, 0, viewport.resolutionY - viewbox.height);
      setViewbox((prev) => ({ ...prev, x: newX, y: newY }));
    },
    mouseButton: MouseButton.MIDDLE,
  });

  const zoomMagnification = 10;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const isEmptySpaceClicked = e.target === container;
    if (isEmptySpaceClicked) {
      dispatch(unselectAll());
    }
    onWheelDrag(e);
  };

  return (
    <EditViewportContext.Provider value={editViewportContextValue}>
      <div style={{ position: 'relative', minHeight: 0, height: '100%' }} ref={rootDivRef}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
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
            width={viewport.width}
            height={viewport.height}
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
