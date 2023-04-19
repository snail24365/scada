import React, { ComponentType, useContext, useEffect, useMemo, useRef, useState } from 'react';
import onDragCallback, { MouseButton } from '../../../util/onDragCallback';
import { ClientRect, StateSetter } from '../../../type';
import { EditViewportContext } from './EditViewportContext';
import { clampByGridSize, getAbsoluteCoordinate } from '../../../util/util';

type WithEditProps<T extends ClientRect> = T & { setClientRect: StateSetter<ClientRect> };

type DirectionInfo = {
  dx: number;
  dy: number;
  cursor: string;
};

function withEdit<T extends ClientRect>(WrappedComponent: ComponentType<T>) {
  const WithEdit: React.FC<WithEditProps<T>> = (props) => {
    const a = { ...props } as T;

    return (
      <g>
        <WrappedComponent {...a} />
        <MouseEventHandler {...props} />
        <ScalePoints {...props} />
      </g>
    );
  };

  return WithEdit;
}

const MouseEventHandler = ({ width, height, x, y, setClientRect }: WithEditProps<ClientRect>) => {
  const ref = useRef<SVGRectElement>(null);
  const [cursor, setCursor] = useState('pointer');
  const { containerRef, viewport, viewbox, gridUnit } = useContext(EditViewportContext);

  let downClientX = 0;
  let downClientY = 0;
  let downX = 0;
  let downY = 0;

  const onDrag = onDragCallback(ref, {
    onMouseDown: (e) => {
      const container = containerRef.current;
      if (!container) return;
      //const { x, y } = getAbsoluteCoordinate(container, e, viewbox, viewport);
      downClientX = e.clientX;
      downClientY = e.clientY;
      downX = x;
      downY = y;
    },
    onMouseMove: (e) => {
      const container = containerRef.current;
      if (!container) return;
      setCursor('move');

      const dx = (e.clientX - downClientX) * (viewbox.width / viewport.width);
      const dy = (e.clientY - downClientY) * (viewbox.height / viewport.height);

      const newX = clampByGridSize(downX + dx, gridUnit);
      const newY = clampByGridSize(downY + dy, gridUnit);

      setClientRect((prev) => {
        return { ...prev, x: newX, y: newY };
      });
    },
    onMouseUp: (e) => {
      setCursor('pointer');
    },
    onMouseLeave: (e) => {
      setCursor('pointer');
    },
  });

  return <rect ref={ref} onMouseDown={onDrag} cursor={cursor} strokeDasharray={'4 4'} x={x} y={y} width={width} height={height} fill="transparent" stroke="blue" strokeWidth={1} />;
};

const ScalePoints = (props: WithEditProps<ClientRect>) => {
  const { containerRef, viewport, viewbox, gridUnit } = useContext(EditViewportContext);
  const { width, height, x, y } = props;
  const scalePointsRef = useRef<(SVGCircleElement | null)[]>([]);

  const eightDirectionInfos: Array<DirectionInfo> = [
    { dx: -1, dy: -1, cursor: 'nwse-resize' },
    { dx: 0, dy: -1, cursor: 'ns-resize' },
    { dx: 1, dy: -1, cursor: 'nesw-resize' },
    { dx: 1, dy: 0, cursor: 'ew-resize' },
    { dx: 1, dy: 1, cursor: 'nwse-resize' },
    { dx: 0, dy: 1, cursor: 'ns-resize' },
    { dx: -1, dy: 1, cursor: 'nesw-resize' },
    { dx: -1, dy: 0, cursor: 'ew-resize' },
  ];
  const r = 5;
  const scalePoints = eightDirectionInfos.map(({ dx, dy, cursor }, i) => {
    let cx = x + ((dx + 1) * width) / 2;
    let cy = y + ((dy + 1) * height) / 2;

    const onDrag = onDragCallback(() => scalePointsRef.current[i], {
      onMouseMove: (e) => {
        const container = containerRef.current;
        if (!container) return;
        const { x: pivotX, y: pivotY } = getAbsoluteCoordinate(container, e, viewbox, viewport);

        type key = `${number},${number}`;
        const corners: Record<key, { x: number; y: number }> = {
          '-1,-1': {
            x,
            y,
          },
          '-1,1': {
            x,
            y: y + height,
          },
          '1,-1': {
            x: x + width,
            y,
          },
          '1,1': {
            x: x + width,
            y: y + height,
          },
        };

        if (dx === 0) {
          corners[`${dx - 1},${dy}`].y = pivotY;
          corners[`${dx + 1},${dy}`].y = pivotY;
        } else if (dy === 0) {
          corners[`${dx},${dy - 1}`].x = pivotX;
          corners[`${dx},${dy + 1}`].x = pivotX;
        } else {
          corners[`${-dx},${dy}`].y = pivotY;
          corners[`${dx},${-dy}`].x = pivotX;
          corners[`${dx},${dy}`].x = pivotX;
          corners[`${dx},${dy}`].y = pivotY;
        }

        const getCorner = (type: 'min' | 'max') => {
          const func = type === 'min' ? Math.min : Math.max;
          return Object.values(corners).reduce(({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
            x: func(x1, x2),
            y: func(y1, y2),
          }));
        };
        const minCorner = getCorner('min');
        const maxCorner = getCorner('max');
        minCorner.x = clampByGridSize(minCorner.x, gridUnit);
        minCorner.y = clampByGridSize(minCorner.y, gridUnit);
        maxCorner.x = clampByGridSize(maxCorner.x, gridUnit);
        maxCorner.y = clampByGridSize(maxCorner.y, gridUnit);

        props.setClientRect((prev) => {
          return { x: minCorner.x, y: minCorner.y, width: maxCorner.x - minCorner.x, height: maxCorner.y - minCorner.y };
        });
      },
      moveElementRef: containerRef,
      leaveElementRef: containerRef,
      upElementRef: containerRef,
      mouseButton: MouseButton.LEFT,
    });

    return (
      <circle
        cursor={cursor}
        key={i}
        ref={(element) => {
          scalePointsRef.current[i] = element;
        }}
        cx={cx}
        cy={cy}
        r={r}
        fill="blue"
        stroke="silver"
        strokeWidth={2}
        onMouseDown={onDrag}
      />
    );
  });

  return <>{scalePoints}</>;
};

export default withEdit;
