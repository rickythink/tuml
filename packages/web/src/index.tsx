import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import SplitPane from 'react-split-pane'
import CodeEditor from './components/CodeEditor'
import { UmlDataArray } from '@tuml/types'
import { Parser } from '@tuml/parser'
import { convert } from '@tuml/bridge'
import Uml from '@tuml/uml'
import { defaultCode } from './config'
import 'bulma'
import './external/react-splitpane.css'
import './index.css'

export default function UmlWeb() {
  let umlDataArray: UmlDataArray = []
  const [code, setCode] = useState<string>(defaultCode)
  const [data, setData] = useState<UmlDataArray>([])
  function setUmlData(code: string) {
    const parserRet = new Parser().parse(code)
    umlDataArray = convert(parserRet)
    setData(umlDataArray)
  }

  // excute once when monthed
  useEffect(() => {
    setUmlData(code)
  }, [])

  return (
    <div className="App">
      <SplitPane split="horizontal" defaultSize={50} allowResize={false}>
        <header className="AppHeader">
          <h2>@tuml/web playground</h2>
        </header>
        <SplitPane split="vertical" minSize={50} defaultSize="50%">
          <CodeEditor
            onChange={code => {
              setCode(code)
              setUmlData(code)
            }}
            text={code}
          />
          <Uml data={data} />
        </SplitPane>
      </SplitPane>
    </div>
  )
}

render(<UmlWeb />, document.getElementById('root'))
