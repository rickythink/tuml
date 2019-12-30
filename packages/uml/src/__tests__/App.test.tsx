import React from 'react'
import { render } from '@testing-library/react'

import { UmlDataArray } from '@tuml/types'
import Uml from '../index'

const data: UmlDataArray = [
  {
    id: '1',
    name: '1',
    members: [
      { name: '1', id: '1' },
      { name: 'a', id: 'a' },
      { name: 'b', id: 'b' },
      { name: 'c', id: 'c' },
      { name: 'd', id: 'd' }
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
    id: '2',
    name: '2',
    members: [
      { name: '2', id: '2' },
      { name: 'e', id: 'e' },
      { name: 'f', id: 'f' },
      { name: 'g', id: 'g' },
      { name: 'h', id: 'h' }
    ]
  },
  {
    id: '3',
    name: '3',
    members: [{ name: '3', id: '3' }]
  }
]

describe('<Uml />', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<Uml data={data} />)
    }).not.toThrow()
  })
})
