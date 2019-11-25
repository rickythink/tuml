import React from 'react'
import { render } from '@testing-library/react'

import { TData } from '../interfaces/data'
import Uml from '../index'

const data:TData = [
  {
    name: '1',
    values: { a: 'a', b: 'b', c: 'c', d: 'd' },
    deps: {
      a: [
        {
          name: '2',
          key: 'e'
        },
        {
          name: '2',
          key: 'h'
        }
      ],
      b: [
        {
          name: '2',
          key: 'h'
        }
      ],
      d: [
        {
          name: '2',
          key: 'e'
        }
      ]
    }
  },
  { name: '2', values: { e: 'e', f: 'f', g: 'g', h: 'h' } }
]

describe('<Uml />', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<Uml data={data} />)
    }).not.toThrow()
  })
})
