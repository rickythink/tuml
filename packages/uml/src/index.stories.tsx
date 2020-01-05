import React from 'react'
import Uml from './index'

const data = [
  {
    id: 'Demo-Class-Demo',
    name: 'Demo',
    type: 'Class',
    paramDes: 'Demo',
    extend: ['DemoBase'],
    members: [
      {
        id: 'Demo-Class-Demo',
        name: 'Demo',
        export: false,
        type: 'Class',
        paramDes: 'Demo',
        extend: ['DemoBase']
      },
      {
        id: 'secret-Property-string | number',
        name: 'secret',
        export: false,
        type: 'Property',
        paramDes: 'string | number',
        extend: [],
        members: []
      },
      {
        id: 'base-Property-DemoBase',
        name: 'base',
        export: false,
        type: 'Property',
        paramDes: 'DemoBase',
        extend: [],
        members: []
      },
      {
        id: '__constructor-Constructor-any',
        name: '__constructor',
        export: false,
        type: 'Constructor',
        paramDes: 'any',
        extend: [],
        members: []
      },
      {
        id: 'print-Method-() => void',
        name: 'print',
        export: false,
        type: 'Method',
        paramDes: '() => void',
        extend: [],
        members: []
      },
      {
        id: 'greet-Method-(name: string) => void',
        name: 'greet',
        export: false,
        type: 'Method',
        paramDes: '(name: string) => void',
        extend: [],
        members: []
      }
    ],
    deps: {
      'Demo-Class-Demo': [{ name: 'DemoBase', id: 'DemoBase-Class-DemoBase' }]
    }
  },
  {
    id: 'DemoBase-Class-DemoBase',
    name: 'DemoBase',
    export: false,
    type: 'Class',
    paramDes: 'DemoBase',
    extend: [],
    members: [
      {
        id: 'DemoBase-Class-DemoBase',
        name: 'DemoBase',
        export: false,
        type: 'Class',
        paramDes: 'DemoBase',
        extend: []
      },
      {
        id: 'base-Property-string',
        name: 'base',
        export: false,
        type: 'Property',
        paramDes: 'string',
        extend: [],
        members: []
      },
      {
        id: '__constructor-Constructor-any',
        name: '__constructor',
        export: false,
        type: 'Constructor',
        paramDes: 'any',
        extend: [],
        members: []
      }
    ]
  }
]

export default { title: 'UML' }
export const withUml = () => <Uml data={data} />
