import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UUID, XY } from '@/type';
import onDragCallback from '@/util/onDragCallback';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Vector2 } from 'three';
import { containerRefState, scadaEditUtil, isEditingState } from '../atom/scadaAtom';
import { selectEditEntities, selectEditLines } from './editSceneSlice';
import { selectItems, unselectAll } from './editViewportSlice';

type Props = {};

const SelectFrame = (props: Props) => {
  const containerRef = useRecoilValue(containerRefState);
  const [selectionBox, setSelectionBox] = useState({ x: -1, y: -1, width: 0, height: 0 });

  const selectonBoxRef = useRef({ ...selectionBox });
  useEffect(() => {
    Object.assign(selectonBoxRef.current, selectionBox);
  }, [selectionBox]);

  const { getXY } = useRecoilValue(scadaEditUtil);
  const setIsEditing = useSetRecoilState(isEditingState);
  const dispatch = useAppDispatch();

  const lines = useAppSelector(selectEditLines);
  const entities = useAppSelector(selectEditEntities);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    let downXY = new Vector2();
    const onMousedown = onDragCallback({
      moveTarget: containerRef,
      onMouseDown: (e) => {
        const isBlankSpaceClicked = e.target === container;
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

    container.addEventListener('mousedown', onMousedown);
    return () => {
      container.removeEventListener('mousedown', onMousedown);
    };
  }, [containerRef, dispatch, lines, entities, selectonBoxRef]);

  return <rect opacity={0.3} fill="#8833ff" stroke={'blue'} strokeWidth={3} {...selectionBox} />;
};

export default SelectFrame;
