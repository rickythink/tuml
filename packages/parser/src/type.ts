export interface IMap {
  block: {
    /**
     * Block name
     */
    name: string
    /**
     * Has this block been exported?
     */
    export?: boolean
    /**
     * Type of the block
     */
    type?: string
    /**
     * The short type description of the param
     */
    paramDes?: string
    /**
     * From which class is inherited
     */
    extend?: Array<string>
  }
}

export type AMap = Array<IMap>
