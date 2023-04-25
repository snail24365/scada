import { ReactComponent as HeatExchangerSvg } from '@/assets/heatExchanger.svg';
import { BBox, BoxEntityProps } from '@/type';
import { useEffect, useState } from 'react';
import { Vector2 } from 'three';

type Props = {
  speed: number;
} & BoxEntityProps;

const HeatExchanger = ({ width, height, x, y, speed }: Props) => {
  speed = speed ?? 1;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const r = Math.min(width, height) / 5;
  const s = r / 2;

  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((rotate) => rotate - ((2 * Math.PI) / 180) * speed);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  let d = '';
  for (let i = 0; i < 4; i++) {
    const p1 = new Vector2(s, 0).rotateAround(new Vector2(0, 0), rotate + (Math.PI / 2) * i);
    const p2 = new Vector2(0, s).rotateAround(new Vector2(0, 0), rotate + (Math.PI / 2) * i);
    d += `M${cx} ${cy} l${p1.x} ${p1.y} l ${p2.x} ${p2.y}z`;
  }

  return (
    <g>
      <HeatExchangerSvg width={width} height={height} x={x} y={y}></HeatExchangerSvg>
      <circle cx={cx} cy={cy} r={r} fill={'grey'} stroke="silver" strokeWidth={5} />
      <path d={d} fill="gold" />
    </g>
  );
};

export default HeatExchanger;
