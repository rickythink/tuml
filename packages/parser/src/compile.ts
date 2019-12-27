import * as ts from 'typescript'

const defaultFileName = 'compile.ts'

export function compile(content: string) {
  // Create a compilerHost by hand because
  // calling createCompilerHost will error
  // out due to us being in a non-node
  // environment.
  //
  // Ref: https://stackoverflow.com/questions/52969177/typescript-createprogram-throwing-ts-sys-is-undefined
  // > If you don't pass a compiler host to createProgram, then the library tries to create a default host automatically based on the lower-level ts.sys object.  ts.sys in turn is only automatically generated in Node.js-like environments.
  const compilerHost = {
    getSourceFile: () =>
      ts.createSourceFile(
        defaultFileName,
        content,
        3, // ES5 // previously: compilerOptions.target,
        false
      ),
    writeFile: () => {},
    getDefaultLibFileName: () => 'lib.d.ts',
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => '',
    getNewLine: () => '\n',
    fileExists: () => true,
    readFile: (fileName: string) => (fileName != null ? content : undefined)
  }

  const program = ts.createProgram(
    [defaultFileName],
    {
      target: ts.ScriptTarget.ES5,
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: ts.JsxEmit.Preserve
    },
    compilerHost
  )
  const checker = program.getTypeChecker()

  function getSymbolByType<T>(declaration: T | ts.SourceFile) {
    return checker.getSymbolAtLocation(declaration as ts.SourceFile)
  }

  const sourceFile = program.getSourceFile(defaultFileName)
  const rootSymbol = getSymbolByType(sourceFile)
  return {
    sourceFile,
    rootSymbol,
    checker
  }
}
