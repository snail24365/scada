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

export const mapVector2 = (vec2: Vector2, func: (val: number) => number) => {
  return new Vector2(func(vec2.x), func(vec2.y));
};

export const manhattanDistance = (a: Vector2, b: Vector2) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const objectMap = <T>(obj: Record<string, T>, func: (x: T) => T) => {
  const ret: Record<string, T> = {};
  for (const key in obj) {
    ret[key] = func(obj[key]);
  }
  console.log(ret);

  return ret;
};
