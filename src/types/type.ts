import { Vector2 } from 'three'

export type XY = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type BBox = XY & Size
export type Viewbox = BBox

export type Points = { points: XY[] }

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>
export type Getter<T> = () => T

export type Entity = {
  uuid: string
  type: string
}

export type BoxEntityProps = Entity & BBox
export type LineEntityProps = Entity & Points

export type UUID = string

export type ScadaMode = 'monitor' | 'edit'

export type Optional<T> = T | undefined

export type DisplayStyle = 'none' | 'block' | 'flex' | 'grid' | 'inline' | 'inline-block'
