export interface IMap {
  block: {
    name: string
    export?: boolean
  }
}

export type AMap = Array<IMap>
