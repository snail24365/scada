import React, { ComponentType, useEffect, useRef } from 'react';
import useDrag from '../../../hook/useDrag';
import { ClientRect } from '../../../type';

type WithEditProps = ClientRect;

function withEdit<T extends WithEditProps>(WrappedComponent: ComponentType<T>) {
  const WithEdit: React.FC<T> = (props) => {
    const { width, height, x, y } = props;
    const margin = 10;

    const pointsCoordinate = [];
    for (const px of [-margin, width / 2, width + margin].map((a) => a + x)) {
      for (const py of [-margin, height / 2, height + margin].map((a) => a + y)) {
        if (px === width / 2 + x && py === height / 2 + y) continue;
        pointsCoordinate.push({ x: px, y: py });
      }
    }

    const controlPoints = pointsCoordinate.map(({ x, y }) => {
      return (
        <circle
          cx={x}
          cy={y}
          r={4}
          fill="blue"
          stroke="silver"
          strokeWidth={2}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        />
      );
    });

    return (
      <g>
        <WrappedComponent {...props} />
        {controlPoints}
        <g>
          <rect strokeDasharray={'4 4'} x={x - margin} y={y - margin} width={width + 2 * margin} height={height + 2 * margin} fill="transparent" stroke="blue" strokeWidth={1} />
        </g>
      </g>
    );
  };

  return WithEdit;
}

export default withEdit;
