import * as ts from 'typescript'
import { compile } from './compile'
import { IParserBlock, IParserBlockArray } from '@tuml/types'

export class Parser {
  private checker: ts.TypeChecker | undefined
  private map: IParserBlockArray
  constructor() {
    this.checker = undefined
    this.map = [] as IParserBlockArray
  }

  /**
   * Get locals of a root symbol
   */
  getLocals(rootSymbol: ts.Symbol) {
    const locals = (rootSymbol.valueDeclaration as any).locals
    for (const local of locals) {
      const [, symbol] = local
      const block = this.serializeSymbol(symbol)
      this.map.push(block)
    }
    console.log(this.map)
  }

  /**
   * Serialize symbol to the structure we want
   * @param symbol
   */
  serializeSymbol(symbol: any) {
    const name = symbol.getName()
    const type = this.getType(symbol)
    let isExport = false
    if (symbol.exportSymbol!) {
      // set block export true
      isExport = true
    }
    const param = symbol.declarations[0]
    const paramDes =
      this.checker &&
      this.checker.typeToString(this.checker.getTypeAtLocation(param))
    const extend = this.getExtend(symbol)
    const members = this.getMembers(symbol)
    const id = this.genID(name, type, paramDes)
    const block: IParserBlock = {
      id: id,
      name: name,
      export: isExport,
      type: type,
      // TODO: not right for class(should be the type of the constructor)
      paramDes: paramDes,
      extend: extend,
      members: members
    }
    return block
  }

  /**
   * Get the type of the block
   * @param symbol
   */
  getType(symbol: ts.Symbol) {
    let type = 'unknown'
    const flag = symbol.getFlags()
    if (flag in ts.SymbolFlags) {
      type = ts.SymbolFlags[flag]
    }
    return type
  }

  /**
   * Get members of the symbol
   * @param symbol
   */
  getMembers(symbol: ts.Symbol) {
    const members = []
    if (symbol && symbol.members && symbol.members.size) {
      const values = symbol.members.values()
      for (let i = 0; i < symbol.members.size; i++) {
        const result = values.next()
        const member = this.serializeSymbol(result.value)
        members.push(member)
      }
    }
    return members
  }

  /**
   * Get extends of the symbol
   * @param symbol
   */
  getExtend(symbol: ts.Symbol) {
    const extend: Array<string> = []
    if (
      symbol.flags === ts.SymbolFlags.Class ||
      symbol.flags === ts.SymbolFlags.Interface
    ) {
      symbol.declarations.forEach((declaration: any, index) => {
        if (declaration.heritageClauses) {
          const firstHeritageClause = declaration.heritageClauses[0]
          firstHeritageClause.types.forEach((type: any, index: any) => {
            const firstHeritageClauseType = firstHeritageClause.types![index]
            const extendsSymbol =
              this.checker &&
              this.checker.getSymbolAtLocation(
                firstHeritageClauseType.expression
              )
            extendsSymbol && extend.push(extendsSymbol.getName())
          })
        }
      })
    }
    return extend
  }

  genID(name: string, type: string = '', paramDes: string = '') {
    return `${name}-${type}-${paramDes}`
  }

  /**
   * Main parse entrypoint
   */
  parse(content: string) {
    const { rootSymbol, checker } = compile(content)
    this.checker = checker
    if (content && !rootSymbol) throw Error('Error in generating root symbol')
    rootSymbol && this.getLocals(rootSymbol)
    return this.map
  }
}
