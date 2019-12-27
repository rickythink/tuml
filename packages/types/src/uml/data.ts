import { IParserBlock } from '../parser/block'

interface IDeps {
  id: string
  name: string
}

type IParserBlockNoMembers = Omit<IParserBlock, 'members'>
export interface IUmlBlock extends IParserBlock {
  members?: Array<IParserBlock | IParserBlockNoMembers>
  deps?: {
    [propName: string]: Array<IDeps>
  }
}

export type UmlDataArray = IUmlBlock[]
