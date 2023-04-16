export type XY = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Viewbox = XY & Size;
export type Viewport = Size;

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
