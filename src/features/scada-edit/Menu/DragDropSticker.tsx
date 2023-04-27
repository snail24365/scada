import { Size } from "@/types/type";
import React from "react";
import ReactDOM from "react-dom";
type Props<T extends Size> = {
  left: number;
  top: number;
  width: number;
  height: number;
  thumbnail: React.ReactElement<T>;
};

const EntityDragDropSticker = <T extends Size>({
  left,
  top,
  width,
  height,
  thumbnail: component,
}: Props<T>) => {
  const thumbnailComponent = React.cloneElement(component, {
    ...component.props,
    width,
    height,
  });

  return ReactDOM.createPortal(
    <div
      css={{
        position: "absolute",
        left,
        top,
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {thumbnailComponent}
      </svg>
    </div>,
    document.getElementById("drag-drop-layer") as HTMLElement
  );
};

export default EntityDragDropSticker;
