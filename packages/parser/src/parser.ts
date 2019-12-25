import { compile } from './compile'
import { AMap } from './type'

export class Parser {
  private content: string
  private map: AMap
  constructor(content: string) {
    this.content = content
    this.map = [] as AMap
  }

  getLocals() {
    const { symbol, checker } = compile(this.content)
    const locals = (symbol.valueDeclaration as any).locals
    for (const local of locals) {
      const [name, symbolObj] = local
      // set block name
      let isExport = false
      if (symbolObj.exportSymbol) {
        // set block export true
        isExport = true
      }
      const typeNode = symbolObj.declarations[0]
      const type = checker.typeToString(checker.getTypeAtLocation(typeNode))
      this.map.push({
        block: {
          name: name,
          export: isExport,
          type: type
        }
      })
    }
    console.log(this.map)
  }

  parse() {
    this.getLocals()
  }
}
