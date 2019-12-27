export interface IParserBlock {
  /**
   * Define the id of the block
   */
  id: string
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
  extend?: string[]
  /**
   * Memebers
   */
  members?: IParserBlock[]
}

export type IParserBlockArray = Array<IParserBlock>
