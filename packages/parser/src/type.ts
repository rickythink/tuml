export interface IBlock {
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
  extend?: IBlock[] | string[]
  /**
   * Memebers
   */
  members?: IBlock[]
}

export type IBlockArray = Array<IBlock>
