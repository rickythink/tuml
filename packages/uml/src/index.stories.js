import React from 'react'
import Uml from './index'

const data = [
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

export default { title: 'UML' }
export const withUml = () => <Uml data={data} />
