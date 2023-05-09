import { ReactComponent as HeatExchangerSvg } from '@/assets/heatExchanger.svg';
import { BoxProperty } from '@/types/schema/propertySchema';
import { BBox, Size } from '@/types/type';
import { useEffect, useRef } from 'react';

type HeatExchangerProps = BoxProperty &
  BBox & {
    speed?: number;
    speed_tag?: string | null;
  };

const HeatExchanger = ({ speed = 0, width, height, x, y }: HeatExchangerProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const rotation = ref.current?.querySelector('[data-id="rotation"]');
    const duration = speed === 0 ? 0 : 10 / speed;

    if (!rotation) return;
    const newRotation = rotation.cloneNode(true) as Element;
    newRotation.setAttribute('dur', `${duration}s`);
    rotation.parentNode?.replaceChild(newRotation, rotation);
  }, [speed]);

  return (
    <g ref={ref}>
      <HeatExchangerSvg width={width} height={height} x={x} y={y}></HeatExchangerSvg>
    </g>
  );
};

export default HeatExchanger;
