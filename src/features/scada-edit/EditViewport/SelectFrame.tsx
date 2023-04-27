import { isEditingState, scadaEditUtil } from "@/features/scada/atom/scadaAtom";
import useDrag from "@/hooks/useDrag";
import useRefObjectSync from "@/hooks/useRefObjectSync";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UUID } from "@/types/type";
import { AABBTest, toVec2, toXY } from "@/util/util";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Vector2 } from "three";
import { selectItems, unselectAll } from "../scadaEditSlice";
import { selectEditBoxes, selectEditLines } from "./editSceneSlice";
import { EditViewportContext } from "./EditViewportContext";
import { EditSectionContext } from "../EditSectionContext";

const SelectFrame = () => {
  const [selectionRect, setSelectionRect] = useState({
    x: -1,
    y: -1,
    width: 0,
    height: 0,
  });
  const selectonRectRef = useRef({ ...selectionRect });
  useRefObjectSync(selectonRectRef, selectionRect);

  const { rootSvgRef } = useContext(EditSectionContext);
  const { getXY } = useRecoilValue(scadaEditUtil);
  const setIsEditing = useSetRecoilState(isEditingState);
  const dispatch = useAppDispatch();

  const lines = useAppSelector(selectEditLines);
  const entities = useAppSelector(selectEditBoxes);

  let downXY = new Vector2();
  const onMouseDownDrag = useDrag({
    containerRef: rootSvgRef,
    onMouseDown: (e) => {
      const rootSvg = rootSvgRef.current;
      if (!rootSvg) return;
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
      const newSelectionRect = { x, y, width, height };
      setSelectionRect(newSelectionRect);
    },
    onMouseUp: (e) => {
      setIsEditing(false);
      const selectionRect = selectonRectRef.current;
      let selectedUUIDs: UUID[] = [];

      const seelctionBBox = {
        min: { x: selectionRect.x, y: selectionRect.y },
        max: {
          x: selectionRect.x + selectionRect.width,
          y: selectionRect.y + selectionRect.height,
        },
      };

      lines.forEach((line) => {
        line.points.forEach((current, index) => {
          if (index === 0) {
            return;
          }
          const curr = toVec2(current);
          const prev = toVec2(line.points[index - 1]);
          const minPoint = toXY(prev.clone().min(curr));
          const maxPoint = toXY(prev.clone().max(curr));
          const lineBBox = { min: minPoint, max: maxPoint };

          if (AABBTest(seelctionBBox, lineBBox)) {
            selectedUUIDs.push(line.uuid);
          }
        });
      });

      entities.forEach((entity) => {
        const entityBBox = {
          min: { x: entity.x, y: entity.y },
          max: { x: entity.x + entity.width, y: entity.y + entity.height },
        };

        if (AABBTest(entityBBox, seelctionBBox)) {
          selectedUUIDs.push(entity.uuid);
        }
      });

      setSelectionRect({ x: -1, y: -1, width: 0, height: 0 });
      dispatch(unselectAll());
      dispatch(selectItems({ uuids: selectedUUIDs }));
      selectedUUIDs = [];
    },
  });

  useEffect(() => {
    const rootSvg = rootSvgRef.current;
    if (!rootSvg) return;
    rootSvg.addEventListener("mousedown", onMouseDownDrag as any);
    return () => {
      rootSvg.removeEventListener("mousedown", onMouseDownDrag as any);
    };
  }, [rootSvgRef, dispatch, lines, entities, selectonRectRef, getXY]);

  return (
    <rect
      opacity={0.3}
      fill="#8833ff"
      stroke={"blue"}
      strokeWidth={3}
      {...selectionRect}
    />
  );
};

export default SelectFrame;
