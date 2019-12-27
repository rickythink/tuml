export interface IParserBlock {
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
  extend?: IParserBlock[] | string[]
  /**
   * Memebers
   */
  members?: IParserBlock[]
}

export type IParserBlockArray = Array<IParserBlock>
