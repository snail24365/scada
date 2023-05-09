import { boxPropertySchema } from './boxPropertySchema';
import { boxShapePropertySchema } from './boxShapePropertySchema';
import { linePropertySchema } from './linePropertySchema';
import { textPropertySchema } from './textPropertySchema';

export type PropertySchema = Readonly<{
  type: 'number' | 'text' | 'color' | readonly string[] | `tag/${string}`;
  default?: number | string | boolean;
  validation?: (value: any) => boolean;
  hidden?: boolean;
  tag?: string;
}>;

type ComponentPropertyType<T extends Record<string, PropertySchema>> = {
  readonly [K in keyof T]+?: T[K]['type'] extends 'number'
    ? number
    : T[K]['type'] extends 'text'
    ? string
    : T[K]['type'] extends 'color'
    ? string
    : T[K]['type'] extends T[K]['default']
    ? T[K]['type']
    : never;
};

type WithRequiredProperty<Type, U extends keyof Type> = Type & {
  [Property in U]-?: Type[Property];
};

type BBoxRequiredProperty = 'width' | 'height' | 'x' | 'y';

export type BoxProperty = WithRequiredProperty<ComponentPropertyType<typeof boxPropertySchema>, BBoxRequiredProperty>;
export type LineProperty = ComponentPropertyType<typeof linePropertySchema>;
export type TextProperty = WithRequiredProperty<ComponentPropertyType<typeof textPropertySchema>, BBoxRequiredProperty>;
export type ShapeProperty = WithRequiredProperty<
  ComponentPropertyType<typeof boxShapePropertySchema>,
  BBoxRequiredProperty
>;
