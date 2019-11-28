import React from 'react'
import { IUserConfig } from '../interfaces/config'
import { StyleConfig } from '../config'

interface IArrowMaker {
  config?: IUserConfig
}

export default function ArrowMaker({ config = {} }: IArrowMaker) {
  const {
    lineStyle: { arrowSize }
  } = new StyleConfig(config).getConfig()

  return (
    <defs>
      <marker
        id="arrow"
        orient="auto"
        markerHeight={arrowSize * 2}
        markerWidth={arrowSize * 1.3}
        refY={arrowSize}
        refX={arrowSize * 1.3}
      >
        <path d={`M0,0 V${arrowSize * 2} L${arrowSize * 1.3},${arrowSize} Z`} />
      </marker>
    </defs>
  )
}
