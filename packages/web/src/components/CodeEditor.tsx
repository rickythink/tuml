import React from 'react'
import MonacoEditor from 'react-monaco-editor'

export interface CodeEditorProps {
  onChange?: (text: string) => void
  onClick?: (range: [number, number]) => void
  text: string
  highlight?: { start: number; end: number } | undefined
}

export default class CodeEditor extends React.Component {
  constructor(props: CodeEditorProps) {
    super(props)
    this.state = {
      code: '// type your code...'
    }
  }

  render() {
    return (
      <MonacoEditor
        language="typescript"
        theme="vs-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          renderWhitespace: 'all',
          quickSuggestions: false,
          occurrencesHighlight: false,
          selectionHighlight: false,
          codeLens: false,
          suggestOnTriggerCharacters: false
        }}
      />
    )
  }
}
