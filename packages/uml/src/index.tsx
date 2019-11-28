import React, { useRef, useEffect, useState, createRef } from 'react'

import { IUserConfig } from './interfaces/config'
import { TData } from './interfaces/data'
import { StyleConfig } from './config'

import ArrowMaker from './components/ArrowMaker'

interface IProps {
  data: TData
  config?: IUserConfig
}

type TRef = React.RefObject<SVGRectElement>
interface IRef {
  [property: string]: {
    [property: string]: TRef
  }
}

interface IPos {
  start: {
    x: number
    y: number
  }
  ca: {
    x: number
    y: number
  }
  cb: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
}

type TLinePos = Array<IPos>

export default function Uml({ data, config }: IProps) {
  const [linePos, setLinePos] = useState<TLinePos>()
  const div = useRef<HTMLDivElement>(null)
  const [matrix, setMatrix] = useState([1, 0, 0, 1, 0, 0])
  const unitRef = useRef(setupUnitRef(data))
  const {
    lineStyle: { color },
    blockStyle: {
      hGap,
      width,
      height,
      content: { padding, backgroundColor },
      border: { width: borderWidth }
    }
  } = new StyleConfig(config).getConfig()

  // excute once mounted
  useEffect(() => {
    const computedLinePos = computeLinePos(data)
    setLinePos([...computedLinePos])
  }, [data])

  useEffect(() => {
    const divEl = div.current
    divEl && divEl.addEventListener('wheel', handleWheelScale)
    return () => {
      divEl && divEl.removeEventListener('wheel', handleWheelScale)
    }
  }, [matrix])

  function setupUnitRef(data: TData) {
    const unitRef: IRef = {}
    data.forEach(d => {
      unitRef[d.name] = {}
      for (const key in d.values) {
        unitRef[d.name][key] = createRef()
      }
    })
    return unitRef
  }

  function computeLinePos(data: TData): TLinePos {
    const computedLinePos: TLinePos = []
    data.forEach(d => {
      if (d.deps) {
        for (const k in d.deps) {
          d.deps[k].forEach(dep => {
            const self = unitRef.current[d.name][k].current
            const target = unitRef.current[dep.name][dep.key].current
            if (
              self &&
              target &&
              Reflect.get(self, 'getBBox') &&
              Reflect.get(target, 'getBBox')
            ) {
              const { x: sx, y: sy, width: sw, height: sh } = self.getBBox()
              const { x: tx, y: ty, height: th } = target.getBBox()
              if (tx >= sx + sw) {
                const offset: number = (tx - sx - sw) / 2
                const pos: IPos = {
                  start: {
                    x: sx + sw,
                    y: sy + sh / 2
                  },
                  ca: {
                    x: sx + sw + offset,
                    y: sy + sh / 2
                  },
                  cb: {
                    x: tx - offset,
                    y: ty + th / 2
                  },
                  end: {
                    x: tx,
                    y: ty + th / 2
                  }
                }
                computedLinePos.push(pos)
              } else throw Error('in reverse direction')
            }
          })
        }
      }
    })

    return computedLinePos
  }

  function handleWheelScale(event: WheelEvent) {
    if ((event.ctrlKey || event.altKey) && div && div.current) {
      event.preventDefault()
      // ref: https://github.com/aleofreddi/svgpan/blob/d59255197236e5936650e4cd9b1ec0b88f199188/svgpan.js#L146
      const divEl = div.current
      const { offsetLeft, offsetTop } = divEl
      const { clientX, clientY } = event
      // 1.2 and 360 control the sensitivity
      const zoom = Math.pow(1.2, -event.deltaY / 360)
      const ctm = new DOMMatrix(matrix)
      let mouse = new DOMPoint(clientX - offsetLeft, clientY - offsetTop)
      mouse = mouse.matrixTransform(ctm.inverse())
      const trans = new DOMMatrix()
        .translate(mouse.x, mouse.y)
        .scale(zoom)
        .translate(-mouse.x, -mouse.y)
      setMatrix(dmatrix2Array(ctm.multiply(trans)))
    }
  }

  function dmatrix2Array(dmatrix: DOMMatrix) {
    return [dmatrix.a, dmatrix.b, dmatrix.c, dmatrix.d, dmatrix.e, dmatrix.f]
  }

  return (
    <div ref={div} style={{ width: '100%' }}>
      <svg width="100%">
        <ArrowMaker config={config} />

        <g
          transform={`matrix(${matrix[0]},${matrix[1]},${matrix[2]},${matrix[3]},${matrix[4]},${matrix[5]})`}
        >
          {data.map((d, dIdx) => {
            return Object.keys(d.values).map((k, kIdx) => {
              return (
                <g key={`${d.name}-${k}`}>
                  <rect
                    ref={unitRef.current[d.name][k]}
                    x={dIdx * hGap}
                    y={0 + kIdx * (height + borderWidth)}
                    width={width}
                    height={height}
                    fill={backgroundColor}
                  />
                  <text>
                    <tspan
                      x={dIdx * hGap + padding}
                      y={0 + kIdx * (height + borderWidth) + (height - padding)}
                    >
                      {k}
                    </tspan>
                  </text>
                </g>
              )
            })
          })}
        </g>

        {linePos &&
          linePos.map((l, idx) => {
            return (
              <g key={`l-${idx}`}>
                <path
                  d={`
                M${l.start.x},${l.start.y} 
                C${l.ca.x},${l.ca.y} ${l.cb.x},${l.cb.y} 
                ${l.end.x},${l.end.y}
              `}
                  markerEnd="url(#arrow)"
                  stroke={color}
                  strokeDasharray="4 2"
                  fill="none"
                />
              </g>
            )
          })}
      </svg>
    </div>
  )
}
