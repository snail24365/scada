import { BBox, XY } from '@/types/type';
import { Vector2 } from 'three';

export const throwIfDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(message);
  }
  console.error(message);
};

export const unwrapStateSetter = <T>(state: T, setState: (state: T) => void) => {
  return (newState: Partial<T>) => {
    setState({ ...state, ...newState });
  };
};

export const toVec2 = <T extends { x: number; y: number }>(obj: T) => {
  return new Vector2(obj.x, obj.y);
};

export const toXY = <T extends { x: number; y: number }>(obj: T) => {
  return { x: obj.x, y: obj.y };
};

export const mapVector2 = (vec2: Vector2, func: (val: number) => number) => {
  return new Vector2(func(vec2.x), func(vec2.y));
};

export const manhattanDistance = (a: Vector2, b: Vector2) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const objectMap = <T, S>(obj: Record<string, T>, func: <U extends T>(x: U) => S) => {
  const ret: Record<string, S> = {};
  for (const key in obj) {
    ret[key] = func(obj[key]);
  }
  return ret;
};

export const drawNodeOnCanvas = (svg: Node, canvas: HTMLCanvasElement) => {
  const originalSerializedSvg = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.src = 'data:image/svg+xml,' + encodeURIComponent(originalSerializedSvg);
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

export const AABBTest = (box1: { min: XY; max: XY }, box2: { min: XY; max: XY }) => {
  return box1.max.x > box2.min.x && box2.max.x > box1.min.x && box1.max.y > box2.min.y && box2.max.y > box1.min.y;
};

export const toFixedNumber = (value: string | number, digit: number = 0) => {
  return Number.isNaN(Number(value)) ? value : Number(Number(String(value)).toFixed(digit));
};
