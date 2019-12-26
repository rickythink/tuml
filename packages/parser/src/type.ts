export interface IMap {
  block: {
    name: string
    export?: boolean
    type?: string
    extend?: Array<string>
  }
}

export type AMap = Array<IMap>
