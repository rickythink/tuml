import * as React from 'react'
import { render } from 'react-dom'

function App () {
  return (
    <div className="App">
      <span>Hello TUML</span>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
