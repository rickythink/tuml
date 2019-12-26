import * as ts from 'typescript'
import { compile } from './compile'
import { AMap } from './type'

export class Parser {
  private content: string
  private rootSymbol: ts.Symbol
  private checker: ts.TypeChecker
  private map: AMap
  constructor(content: string) {
    this.content = content
    this.map = [] as AMap
  }

  getLocals() {
    const locals = (this.rootSymbol.valueDeclaration as any).locals
    for (const local of locals) {
      const [name, localSymbol] = local
      // set block name
      let isExport = false
      if (localSymbol.exportSymbol) {
        // set block export true
        isExport = true
      }
      const typeNode = localSymbol.declarations[0]
      const type = this.checker.typeToString(
        this.checker.getTypeAtLocation(typeNode)
      )
      const extend = this.getExtend(localSymbol)
      this.map.push({
        block: {
          name: name,
          export: isExport,
          type: type,
          extend: extend
        }
      })
    }
    console.log(this.map)
  }

  getExtend(symbol: ts.Symbol) {
    const extend: Array<string> = []
    if (
      symbol.flags === ts.SymbolFlags.Class ||
      symbol.flags === ts.SymbolFlags.Interface
    ) {
      symbol.declarations.forEach((declaration: any, index) => {
        if (declaration.heritageClauses) {
          const firstHeritageClause = declaration.heritageClauses[0]
          firstHeritageClause.types.forEach((type, index) => {
            const firstHeritageClauseType = firstHeritageClause.types![index]
            const extendsSymbol = this.checker.getSymbolAtLocation(
              firstHeritageClauseType.expression
            )
            extend.push(extendsSymbol.getName())
            console.log(extendsSymbol.getName())
          })
        }
      })
    }
    return extend
  }

  parse() {
    const { rootSymbol, checker } = compile(this.content)
    this.rootSymbol = rootSymbol
    this.checker = checker
    this.getLocals()
  }
}
