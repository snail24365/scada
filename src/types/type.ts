export type XY = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type BBox = XY & Size;
export type Viewbox = BBox;

export type Points = { points: XY[] };

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type Getter<T> = () => T;

export type Entity = {
  uuid: string;
  type: string;
};

export type BoxState = Entity & BBox;
export type LineState = Entity & Points;

export type UUID = string;

export type ScadaMode = 'monitor' | 'edit';

export type Optional<T> = T | undefined;

export type DisplayStyle = 'none' | 'block' | 'flex' | 'grid' | 'inline' | 'inline-block';

export type AlarmLevel = 0 | 1 | 2 | 3;

export type ScadaPage = {
  pageId: UUID;
  title: string;
  alarmLevel: AlarmLevel;
};

export type MonitorSceneState = {
  lines: LineState[];
  boxes: BoxState[];
};

export type ScadaSceneState = {
  lines: LineState[];
  boxes: BoxState[];
};
