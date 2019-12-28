import React from 'react'
import { render } from 'react-dom'
import SplitPane from 'react-split-pane'
import CodeEditor from './components/CodeEditor'
import Uml from '@tuml/uml'
import 'bulma'
import './external/react-splitpane.css'
import './index.css'

export default function UmlWeb() {
  return (
    <div className="App">
      <SplitPane split="horizontal" defaultSize={50} allowResize={false}>
        <header className="AppHeader">
          <h2>@tuml/web playground</h2>
        </header>
        <SplitPane split="vertical" minSize={50} defaultSize="50%">
          <CodeEditor />
          <Uml />
        </SplitPane>
      </SplitPane>
    </div>
  )
}

render(<UmlWeb />, document.getElementById('root'))
