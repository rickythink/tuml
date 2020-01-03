import React from 'react'
import MonacoEditor from 'react-monaco-editor'

export interface CodeEditorProps {
  onChange?: (text: string) => void
  onClick?: (range: [number, number]) => void
  text?: string
  highlight?: { start: number; end: number } | undefined
}

export default class CodeEditor extends React.Component<CodeEditorProps> {
  constructor(props: CodeEditorProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <MonacoEditor
        language="typescript"
        theme="vs-dark"
        value={this.props.text}
        onChange={text => this.props.onChange && this.props.onChange(text)}
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
