import { scadaEditUtil } from "@/features/scada/atom/scadaAtom";
import { scadaComponentsType } from "@/features/scada/componentMap";
import useDrag from "@/hooks/useDrag";
import { useAppDispatch } from "@/store/hooks";
import { flexCenter } from "@/style/style";
import { Entity, Size } from "@/types/type";
import React, { useContext, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { addBoxEntity } from "../EditViewport/editSceneSlice";
import EntityDragDropSticker from "./DragDropSticker";
import { EditViewportContext } from "../EditViewport/EditViewportContext";
import { EditSectionContext } from "../EditSectionContext";

type Prop = {
  component: React.ReactElement<Size & Omit<Entity, "uuid">>;
  stickerSize: number;
  type: scadaComponentsType;
};

const DragDropItem = ({ component, stickerSize, type }: Prop) => {
  const body = useRef<HTMLElement>(document.body);
  const [cursor, setCursor] = useState({ left: 50, top: 150 });
  const [stickerSizeState, setStickerSizeState] = useState({
    width: 0,
    height: 0,
  });

  const stickerOffsetX = 10;
  const stickerOffsetY = 10;

  const dispatch = useAppDispatch();
  const { getXY, reducedScaleState } = useRecoilValue(scadaEditUtil);
  const { rootSvgRef } = useContext(EditSectionContext);
  const updateCursor = (e: React.MouseEvent) => {
    setCursor({
      left: e.clientX + stickerOffsetX,
      top: e.clientY + stickerOffsetY,
    });
  };

  const onMouseDownDrag = useDrag({
    containerRef: body,
    upElementRef: rootSvgRef,
    onMouseDown: (e) => {
      updateCursor(e);
    },
    onMouseMove: (e) => {
      setStickerSizeState({
        width: stickerSize,
        height: stickerSize,
      });
      updateCursor(e);
    },
    onMouseUp: (e) => {
      setStickerSizeState({ width: 0, height: 0 });
      const clientX = e.clientX + stickerOffsetX;
      const clientY = e.clientY + stickerOffsetY;
      const { x, y } = getXY({
        clientX,
        clientY,
      });
      console.log(x, y);

      dispatch(
        addBoxEntity({
          ...component.props,
          uuid: uuidv4(),
          type: type,
          width: component.props.width * reducedScaleState.x,
          height: component.props.height * reducedScaleState.y,
          x,
          y,
        })
      );
    },
  });

  const { width: buttonW, height: buttonH } = component.props;

  const svgWrappedComponent = (
    <svg width={buttonW} height={buttonH} viewBox={`0 0 ${buttonW} ${buttonH}`}>
      {component}
    </svg>
  );

  return (
    <div css={[flexCenter]} onMouseDown={onMouseDownDrag}>
      <svg
        width={buttonW}
        height={buttonH}
        viewBox={`0 0 ${buttonW} ${buttonH}`}
      >
        {svgWrappedComponent}
      </svg>
      <EntityDragDropSticker
        left={cursor.left}
        top={cursor.top}
        thumbnail={component}
        width={stickerSizeState.width}
        height={stickerSizeState.height}
      />
    </div>
  );
};

export default DragDropItem;
