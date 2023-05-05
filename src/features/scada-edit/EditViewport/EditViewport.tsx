import { darkBlue2, darkBlue4, borderColor1, borderColor2 } from '@/assets/color';
import {
  computeViewportSizeState,
  editViewportOffset,
  resolutionState,
  viewboxState,
  viewboxZoomActionState,
  viewportSizeState
} from '@/features/scada/atom/scadaAtom';
import { MouseButton } from '@/hooks/useDrag';
import useResizeListener from '@/hooks/useResizeListener';
import { useAppDispatch } from '@/store/hooks';
import onDragCallback from '@/util/onDragCallback';
import { Paper } from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import EditContextMenu from '../EditContextMenu/EditContextMenu';
import { EditSectionContext } from '../EditSectionContext';
import EquipmentPanel from '../EquipmentPanel/EquipmentPanel';
import { editContextMenuState, selectedEditMenuIndexState } from '../atom/scadaEditSectionAtom';
import { unselectAll } from '../slice/scadaEditSelectionSlice';
import EditScene from './EditScene';
import { EditViewportContext } from './EditViewportContext';
import Grid from './Grid';
import MiniMap from './MiniMap';
import SelectFrame from './SelectFrame';
import { useEditViewportKeyControl } from './useEditViewportKeyControl';

const EditViewport = () => {
  const dispatch = useAppDispatch();
  const { rootDivRef, rootSvgRef } = useContext(EditSectionContext);
  const setEditViewportOffset = useSetRecoilState(editViewportOffset);
  const [viewportSize, setViewportSize] = useRecoilState(viewportSizeState);
  const [viewbox, setViewbox] = useRecoilState(viewboxState);
  const setSelectedMenuIndex = useSetRecoilState(selectedEditMenuIndexState);
  const resolution = useRecoilValue(resolutionState);
  const { x: resolutionX, y: resolutionY } = resolution;
  const editScene = useMemo(() => <EditScene />, []);
  const computeViewportSize = useRecoilValue(computeViewportSizeState);
  const setEditContextMenu = useSetRecoilState(editContextMenuState);

  const grid = useMemo(() => <Grid />, []);

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
    if (!container) return;
    setViewbox({
      x: 0,
      y: 0,
      width: resolutionX,
      height: resolutionY
    });
  }, []);

  useResizeListener(rootDivRef, ({ x, y, width, height }) => {
    setViewportSize(computeViewportSize(width, height));
  });

  useResizeListener(rootDivRef, () => {
    const rootSvg = rootSvgRef.current;
    if (!rootSvg) return;
    const { x, y } = rootSvg.getBoundingClientRect();
    setEditViewportOffset({ x, y });
  });

  const viewboxZoomAction = useRecoilValue(viewboxZoomActionState);

  const onWheelDrag = onDragCallback({
    moveTarget: rootSvgRef,
    onMouseMove: (e) => {
      const viewbox = viewboxRef.current;
      const speed = 5;
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
      setEditContextMenu((prev) => {
        return {
          ...prev,
          isOpen: false
        };
      });
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
      <div
        style={{
          position: 'relative',
          minHeight: 0,
          height: '100%',
          flex: 1,
          minWidth: 1200
        }}
        ref={rootDivRef}
      >
        <Paper elevation={3} sx={{ backgroundColor: darkBlue4, width: '100%', height: '100%' }}>
          <div
            tabIndex={0}
            css={{
              position: 'relative',
              width: '100%',
              height: '100%',
              zIndex: 10,
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
                border: `3px solid ${'#222'}`,
                zIndex: 15,
                backgroundColor: darkBlue4
              }}
            >
              {grid}
              {editScene}
              <SelectFrame />
            </svg>
          </div>
          <MiniMap width={miniMapWidth} />
          <EquipmentPanel />
          <EditContextMenu />
        </Paper>
      </div>
    </EditViewportContext.Provider>
  );
};

export default EditViewport;
