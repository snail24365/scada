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

export type BoxComponent = BBox;
export type LineComponent = Points & { type: 'Line' };
export type TextComponent = BBox & { type: 'Text'; text: string } & {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
};

export type BoxEntity = Entity & BoxComponent;
export type LineEntity = Entity & LineComponent;
export type TextEntity = Entity & TextComponent;

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
  lines: LineEntity[];
  boxes: BoxEntity[];
  texts: TextEntity[];
};

export type ScadaSceneState = {
  lines: LineEntity[];
  boxes: BoxEntity[];
  texts: TextEntity[];
};

export type DomRect = {
  width: number;
  height: number;
  x: number;
  y: number;
  left: number;
  top: number;
  bottom: number;
  right: number;
};

export type ChildrenWithProp<T> = React.ReactElement<T> | React.ReactElement<T>[] | undefined;
