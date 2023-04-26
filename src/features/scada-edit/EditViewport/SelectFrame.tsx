import { isEditingState, scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UUID, XY } from '@/type';
import onDragCallback from '@/util/onDragCallback';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Vector2 } from 'three';
import { selectEditBoxes, selectEditLines } from './editSceneSlice';
import { EditViewportContext } from './EditViewportContext';
import { selectItems, unselectAll } from '../scadaEditSlice';

type Props = {};

const SelectFrame = (props: Props) => {
  const { rootSvgRef } = useContext(EditViewportContext);
  const [selectionBox, setSelectionBox] = useState({ x: -1, y: -1, width: 0, height: 0 });

  const selectonBoxRef = useRef({ ...selectionBox });
  useEffect(() => {
    Object.assign(selectonBoxRef.current, selectionBox);
  }, [selectionBox]);

  const { getXY } = useRecoilValue(scadaEditUtil);
  const setIsEditing = useSetRecoilState(isEditingState);
  const dispatch = useAppDispatch();

  const lines = useAppSelector(selectEditLines);
  const entities = useAppSelector(selectEditBoxes);

  useEffect(() => {
    const rootSvg = rootSvgRef.current;
    if (!rootSvg) {
      return;
    }
    let downXY = new Vector2();
    const onMousedown = onDragCallback({
      moveTarget: rootSvgRef,
      onMouseDown: (e) => {
        const isBlankSpaceClicked = e.target === rootSvg;
        if (!isBlankSpaceClicked) return true;

        downXY = getXY(e);
      },
      onMouseMove: (e) => {
        setIsEditing(true);
        const xy = getXY(e);
        const x = Math.min(downXY.x, xy.x);
        const y = Math.min(downXY.y, xy.y);
        const width = Math.abs(downXY.x - xy.x);
        const height = Math.abs(downXY.y - xy.y);
        const newSelectionBox = { x, y, width, height };
        setSelectionBox(newSelectionBox);
      },
      onMouseUp: (e) => {
        setIsEditing(false);

        const intersectTest = (min1: XY, max1: XY, min2: XY, max2: XY) => {
          return max1.x > min2.x && max2.x > min1.x && max1.y > min2.y && max2.y > min1.y;
        };
        const selectionBox = selectonBoxRef.current;
        let selectedUUIDs: UUID[] = [];
        const selectionMin = { x: selectionBox.x, y: selectionBox.y };
        const selectionMax = {
          x: selectionBox.x + selectionBox.width,
          y: selectionBox.y + selectionBox.height,
        };

        lines.forEach((line) => {
          let isIntersected = false;
          line.points.forEach((current, index) => {
            if (index === 0) return;
            const prev = line.points[index - 1];
            const entityMin = { x: Math.min(prev.x, current.x), y: Math.min(prev.y, current.y) };
            const entityMax = { x: Math.max(prev.x, current.x), y: Math.max(prev.y, current.y) };
            isIntersected =
              isIntersected || intersectTest(entityMin, entityMax, selectionMin, selectionMax);

            if (isIntersected) {
              selectedUUIDs.push(line.uuid);
            }
          });
        });

        entities.forEach((entity) => {
          const entityMin = { x: entity.x, y: entity.y };
          const entityMax = { x: entity.x + entity.width, y: entity.y + entity.height };

          const isIntersected = intersectTest(entityMin, entityMax, selectionMin, selectionMax);

          if (isIntersected) {
            selectedUUIDs.push(entity.uuid);
          }
        });

        setSelectionBox({ x: -1, y: -1, width: 0, height: 0 });
        dispatch(unselectAll());
        dispatch(selectItems({ uuids: selectedUUIDs }));
        selectedUUIDs = [];
      },
    }) as any;

    rootSvg.addEventListener('mousedown', onMousedown);
    return () => {
      rootSvg.removeEventListener('mousedown', onMousedown);
    };
  }, [rootSvgRef, dispatch, lines, entities, selectonBoxRef, getXY]);

  return <rect opacity={0.3} fill="#8833ff" stroke={'blue'} strokeWidth={3} {...selectionBox} />;
};

export default SelectFrame;
