import { boxComponentsMap } from '@/features/scada/componentMap';
import shapeComponentsMap from '@/features/scada/components/shapes/shapeComponentsMap';
import { BoxProperty, LineProperty, ShapeProperty, TextProperty } from './schema';

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

export type UUID = string;

export type ScadaMode = 'monitor' | 'edit';

export type DisplayStyle = 'none' | 'block' | 'flex' | 'grid' | 'inline' | 'inline-block';

export type AlarmLevel = 0 | 1 | 2 | 3;

export type ScadaPage = {
  pageId: UUID;
  title: string;
  alarmLevel: AlarmLevel;
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

export type BoxEntity = Entity & BoxProperty & { type: keyof typeof boxComponentsMap };
export type LineEntity = Entity & LineProperty & { type: 'Line' } & Points;
export type TextEntity = Entity & TextProperty & { type: 'Text' };
export type ShapeEntity = Entity & ShapeProperty & { type: keyof typeof shapeComponentsMap };
export type ScadaEntity = BoxEntity | LineEntity | TextEntity | ShapeEntity;

export function isLineEntity(entity: ScadaEntity): entity is LineEntity {
  return entity.type === 'Line';
}

export function isBoxEntity(entity: ScadaEntity): entity is BoxEntity {
  return entity.type in boxComponentsMap;
}

export function isTextEntity(entity: ScadaEntity): entity is TextEntity {
  return entity.type === 'Text';
}

export function isShapeEntity(entity: ScadaEntity): entity is ShapeEntity {
  return entity.type in shapeComponentsMap;
}

export type ScadaSceneState = {
  lines: LineEntity[];
  boxes: BoxEntity[];
  texts: TextEntity[];
};

export type RequestStatus = { status: 'idle' | 'loading' | 'succeeded' | 'failed' };
