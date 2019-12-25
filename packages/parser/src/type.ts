export interface IMap {
  block: {
    name: string
    export?: boolean
    type?: string
  }
}

export type AMap = Array<IMap>
