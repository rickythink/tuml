import { IParserBlockArray, IUmlBlock, UmlDataArray } from '@tuml/types'

export function convert(parserRet: IParserBlockArray): UmlDataArray {
  if (!parserRet) return
  const umlDataArray: UmlDataArray = []
  if (parserRet && parserRet.length) {
    for (const block of parserRet) {
      const insert: IUmlBlock = block
      const { members, ...remain } = insert
      // combine block's data with block's members
      insert.members = [remain, ...members]
      umlDataArray.push(insert)
    }

    // generate deps
    for (const block of umlDataArray) {
      if (block.extend && block.extend.length) {
        for (const name of block.extend) {
          const { id } = umlDataArray.find(ele => ele.name === name)
          if (id) {
            if (!('deps' in block)) block.deps = {}
            if (!(block.id in block.deps)) block.deps[block.id] = []
            block.deps[block.id].push({ name, id })
          }
        }
      }
    }
  }

  return umlDataArray
}
