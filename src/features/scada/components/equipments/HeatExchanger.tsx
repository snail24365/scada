import { ReactComponent as HeatExchangerSvg } from '@/assets/heatExchanger.svg';
import { BoxProperty } from '@/types/schema';
import { BBox, Size } from '@/types/type';
import { useEffect, useState } from 'react';
import { Vector2 } from 'three';

type HeatExchangerProps = BoxProperty &
  BBox & {
    speed?: number;
  } & Size;

const HeatExchanger = (props: HeatExchangerProps) => {
  const { width, height, speed = 1 } = props;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 5;
  const halfRadius = radius / 2;

  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((rotate) => rotate - ((2 * Math.PI) / 180) * speed);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  let d = '';
  for (let i = 0; i < 4; i++) {
    const p1 = new Vector2(halfRadius, 0).rotateAround(new Vector2(0, 0), rotate + (Math.PI / 2) * i);
    const p2 = new Vector2(0, halfRadius).rotateAround(new Vector2(0, 0), rotate + (Math.PI / 2) * i);
    d += `M${cx} ${cy} l${p1.x} ${p1.y} l ${p2.x} ${p2.y}z`;
  }

  return (
    <svg {...props}>
      <HeatExchangerSvg width={width} height={height}></HeatExchangerSvg>
      <circle cx={cx} cy={cy} r={radius} fill={'grey'} stroke="silver" strokeWidth={5} />
      <path d={d} fill="gold" />
    </svg>
  );
};

export default HeatExchanger;
