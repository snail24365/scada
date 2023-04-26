import { useAppDispatch } from '@/store/hooks';
import onDragCallback, { MouseButton } from '@/util/onDragCallback';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editViewportOffset, viewboxState, viewportState } from '@/features/scada/atom/scadaAtom';
import EditScene from './EditScene';
import { EditViewportContext } from './EditViewportContext';
import { unselectAll } from '../scadaEditSlice';
import Grid from './Grid';
import MiniMap from './MiniMap';
import SelectFrame from './SelectFrame';
import ToolButtonGroup from './ToolButtonGroup';
import { throwIfDev, toXY } from '@/util/util';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useEditViewportKeyControl } from './useEditViewportKeyControl';
import { selectedEditMenuIndexState } from '../atom/scadaEditSectionAtom';

type Props = {
  resolutionX: number;
  resolutionY: number;
};

const EditViewport = (props: Props) => {
  const { resolutionX, resolutionY } = props;

  const rootDivRef = useRef<HTMLDivElement>(null);
  const rootSvgRef = useRef<SVGSVGElement>(null);

  const dispatch = useAppDispatch();

  const setEditViewportOffset = useSetRecoilState(editViewportOffset);
  const [viewport, setViewport] = useRecoilState(viewportState);
  const [viewbox, setViewbox] = useRecoilState(viewboxState);
  const setSelectedMenuIndex = useSetRecoilState(selectedEditMenuIndexState);
  const windowSize = useWindowSize();

  function setViewportSize() {
    const rootDiv = rootDivRef.current;
    if (!rootDiv) {
      throwIfDev('rootDiv or container is null');
      return;
    }

    const { width: containerWidth, height: containerHeight } = rootDiv.getBoundingClientRect();
    const resolutionRatio = resolutionX / resolutionY;
    const stretchedWidth = resolutionRatio * containerHeight;
    const stretchedHeight = containerWidth / resolutionRatio;

    if (stretchedWidth > containerWidth) {
      const width = containerWidth;
      const height = stretchedHeight;
      setViewport({ resolutionX, resolutionY, width, height });
    } else {
      const width = stretchedWidth;
      const height = containerHeight;
      setViewport({ resolutionX, resolutionY, width, height });
    }
    setViewbox({ width: resolutionX, height: resolutionY, x: 0, y: 0 });
  }
  useEffect(() => {
    setViewportSize();
  }, []);

  useEffect(() => {
    setViewportSize();
  }, [windowSize]);

  const viewboxRef = useRef({ ...viewbox });

  const miniMapWidth = 200;
  const editViewportContextValue = {
    viewboxRef,
    rootSvgRef,
    rootDivRef,
  };

  useEffect(() => {
    Object.assign(viewboxRef.current, viewbox);
  }, [viewbox]);

  useEffect(() => {
    const container = rootSvgRef.current;
    if (!container) {
      throwIfDev('container is null');
      return;
    }
    setViewbox({ x: 0, y: 0, width: viewport.resolutionX, height: viewport.resolutionY });
    setEditViewportOffset(toXY(container.getBoundingClientRect()));
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
    moveTarget: rootSvgRef,
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
    // selection rset
    const container = rootSvgRef.current;
    const isEmptySpaceClicked = e.target === container;
    if (isEmptySpaceClicked) {
      dispatch(unselectAll());
    }

    // wheel move
    onWheelDrag(e);

    // menu collapse reset
    setSelectedMenuIndex(-1);
  };

  const controls = useEditViewportKeyControl();

  return (
    <EditViewportContext.Provider value={editViewportContextValue}>
      <div style={{ position: 'relative', minHeight: 0, height: '100%' }} ref={rootDivRef}>
        <div
          tabIndex={0}
          css={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: 200,
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:focus': {
              outline: 'none',
            },
          }}
          onKeyDown={controls.onKeyDown}
          onMouseDown={onMouseDown}>
          <svg
            ref={rootSvgRef}
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
