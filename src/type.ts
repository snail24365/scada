export type XY = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Viewport = Size;

export type BBox = XY & Size;
export type Viewbox = BBox;

export type Points = { points: XY[] };

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type Getter<T> = () => T;

export type Entity = {
  uuid: string;
  type: string;
};

export type BoxEntityProps = Entity & {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type LineEntityProps = Entity & {
  points: XY[];
};

export type UUID = string;
