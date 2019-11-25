import React, { useRef, useEffect, useState, createRef } from 'react'
import { IUserConfig } from './interfaces/config'
import { TData } from './interfaces/data'
import { StyleConfig } from './config'

import ArrowMaker from './components/ArrowMaker'

interface IProps{
  data: TData,
  config?: IUserConfig
}

type TRef = React.RefObject<SVGRectElement>
interface IRef{
  [property:string]:{
    [property:string]:TRef
  }
}

interface IPos{
  start: {
    x: number,
    y: number
  },
  ca: {
    x: number,
    y: number
  }
  cb: {
    x: number,
    y: number
  },
  end: {
    x: number,
    y: number
  }
}

type TLinePos = Array<IPos>

export default function Uml ({ data, config }: IProps) {
  const [linePos, setLinePos] = useState<TLinePos>()
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

  function setupUnitRef (data: TData) {
    const unitRef:IRef = {}
    data.forEach(d => {
      unitRef[d.name] = {}
      for (const key in d.values) {
        unitRef[d.name][key] = createRef()
      }
    })
    return unitRef
  }

  function computeLinePos (data: TData):TLinePos {
    const computedLinePos:TLinePos = []
    data.forEach(d => {
      if (d.deps) {
        for (const k in d.deps) {
          d.deps[k].forEach(dep => {
            const self = unitRef.current[d.name][k].current
            const target = unitRef.current[dep.name][dep.key].current
            if (self && target && Reflect.get(self, 'getBBox') && Reflect.get(target, 'getBBox')) {
              const { x: sx, y: sy, width: sw, height: sh } = self.getBBox()
              const { x: tx, y: ty, height: th } = target.getBBox()
              if (tx >= sx + sw) {
                const offset:number = (tx - sx - sw) / 2
                const pos:IPos = {
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
            };
          })
        }
      }
    })

    return computedLinePos
  }

  return (
    <svg width="800">
      <ArrowMaker config={config}/>

      <g>
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

      {linePos && linePos.map((l, idx) => {
        console.log(linePos)
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
  )
}
