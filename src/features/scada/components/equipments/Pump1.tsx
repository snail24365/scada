import { ReactComponent as PumpSvg } from '@/assets/pump1.svg';
import { BoxProperty } from '@/types/schema/propertySchema';
import { BBox } from '@/types/type';
import { useEffect, useRef } from 'react';

type Pump1Props = BoxProperty & BBox & { rotationSpeed?: number };

const Pump1 = ({ width, height, x, y, rotationSpeed = 0 }: Pump1Props) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const rotation = ref.current?.querySelector('[data-id="rotation"]');
    if (!rotation) return;

    const duration = rotationSpeed === 0 ? 0 : 10 / rotationSpeed;

    if (!rotation) return;
    const newRotation = rotation.cloneNode(true) as Element;
    newRotation.setAttribute('dur', `${duration}s`);
    console.log(rotation.parentNode);
    rotation.parentNode?.replaceChild(newRotation, rotation);
  }, [rotationSpeed]);

  return (
    <g ref={ref}>
      <PumpSvg width={width} height={height} x={x} y={y}></PumpSvg>
    </g>
  );
};

export default Pump1;
