import React from 'react'
import Uml from './index'

const data = [
  {
    name: '1',
    members: [
      { name: '1', tag: 'header' },
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' }
    ],
    deps: {
      1: [
        {
          name: '3',
          id: '3'
        }
      ],
      a: [
        {
          name: '2',
          id: 'e'
        },
        {
          name: '2',
          id: 'h'
        }
      ],
      b: [
        {
          name: '2',
          id: 'h'
        }
      ],
      d: [
        {
          name: '2',
          id: 'e'
        }
      ]
    }
  },
  {
    name: '2',
    members: [
      { name: '2', tag: 'header' },
      { name: 'e' },
      { name: 'f' },
      { name: 'g' },
      { name: 'h' }
    ]
  },
  {
    name: '3',
    members: [{ name: '3', tag: 'header' }]
  }
]

export default { title: 'UML' }
export const withUml = () => <Uml data={data} />
