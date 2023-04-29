import {
  computeViewportSizeState,
  editViewportOffset,
  resolutionState,
  viewboxState,
  viewboxZoomActionState,
  viewportSizeState
} from '@/features/scada/atom/scadaAtom';
import useDrag, { MouseButton } from '@/hooks/useDrag';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch } from '@/store/hooks';
import { throwIfDev, toXY } from '@/util/util';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { EditSectionContext } from '../EditSectionContext';
import EquipmentPanel from '../EquipmentPanel';
import { selectedEditMenuIndexState } from '../atom/scadaEditSectionAtom';
import { unselectAll } from '../scadaEditSlice';
import EditScene from './EditScene';
import { EditViewportContext } from './EditViewportContext';
import Grid from './Grid';
import MiniMap from './MiniMap';
import SelectFrame from './SelectFrame';
import { useEditViewportKeyControl } from './useEditViewportKeyControl';

const EditViewport = ({}) => {
  const dispatch = useAppDispatch();
  const { rootDivRef, rootSvgRef } = useContext(EditSectionContext);
  const setEditViewportOffset = useSetRecoilState(editViewportOffset);
  const [viewportSize, setViewportSize] = useRecoilState(viewportSizeState);
  const [viewbox, setViewbox] = useRecoilState(viewboxState);
  const setSelectedMenuIndex = useSetRecoilState(selectedEditMenuIndexState);
  const windowSize = useWindowSize();
  const resolution = useRecoilValue(resolutionState);
  const { resolutionX, resolutionY } = resolution;

  const computeViewportSize = useRecoilValue(computeViewportSizeState);

  const grid = useMemo(() => <Grid />, []);

  useEffect(() => {
    const container = rootDivRef.current;
    if (!container) return;
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    const size = computeViewportSize(containerWidth, containerHeight);
    setViewportSize(size);
  }, [rootDivRef.current, windowSize]);

  const viewboxRef = useRef({ ...viewbox });

  const miniMapWidth = 200;
  const editViewportContextValue = {
    viewboxRef
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
    setViewbox({
      x: 0,
      y: 0,
      width: resolutionX,
      height: resolutionY
    });
    setEditViewportOffset(toXY(container.getBoundingClientRect()));
  }, [resolution]);

  const viewboxZoomAction = useRecoilValue(viewboxZoomActionState);

  const onWheelDrag = useDrag({
    moveElementRef: rootSvgRef,
    onMouseMove: (e) => {
      const viewbox = viewboxRef.current;
      const speed = 2;
      let newX = viewbox.x + e.movementX * speed;
      let newY = viewbox.y + e.movementY * speed;
      newX = _.clamp(newX, 0, resolutionX - viewbox.width);
      newY = _.clamp(newY, 0, resolutionY - viewbox.height);
      setViewbox((prev) => ({ ...prev, x: newX, y: newY }));
    },
    mouseButton: MouseButton.MIDDLE
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // selection reset
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

  const zoomIn = () => {
    setViewbox(viewboxZoomAction('in'));
  };
  const zoomOut = () => {
    setViewbox(viewboxZoomAction('out'));
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
            zIndex: 10,
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:focus': {
              outline: 'none'
            }
          }}
          onKeyDown={controls.onKeyDown}
          onMouseDown={onMouseDown}
        >
          <svg
            ref={rootSvgRef}
            onWheel={(e) => {
              Math.sign(e.deltaY) < 0 ? zoomIn() : zoomOut();
            }}
            viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width ?? 0} ${viewbox.height ?? 0}`}
            width={viewportSize.width}
            height={viewportSize.height}
            css={{
              zIndex: 15,
              backgroundColor: 'transparent'
            }}
          >
            {grid}
            <EditScene />
            <SelectFrame />
          </svg>
        </div>
        <MiniMap width={miniMapWidth} />
        <EquipmentPanel />
      </div>
    </EditViewportContext.Provider>
  );
};

export default EditViewport;
