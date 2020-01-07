import React, { useEffect, useState } from 'react'
import { useSvgPan } from './hooks/useSvgPan'

import { IUmlUserConfig, UmlDataArray } from '@tuml/types'
import { StyleConfig } from './config'

import ArrowMaker from './components/ArrowMaker'

import SvgIconProperty from './assets/icon/property.svg'

interface IProps {
  data?: UmlDataArray
  config?: IUmlUserConfig
  onChange?: (data: UmlDataArray) => void
}

interface IRef {
  [property: string]: {
    [property: string]: SVGRectElement | undefined
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

export default function Uml({ data = [], config }: IProps) {
  const dataIds = data.map(d => d.id).join(',')
  const [linePos, setLinePos] = useState<TLinePos>()
  const [[div, g], matrix] = useSvgPan(dataIds)
  const blockRefs = setupBlockStructure(data)
  const setBlockRef = (node: SVGRectElement, i: string, j: string) => {
    blockRefs[i][j] = node
  }
  const {
    lineStyle: { color },
    blockStyle: {
      hGap,
      width,
      height,
      header: {
        color: headerColor,
        backgroundColor: headerBackgroundColor,
        padding: headerPadding,
        height: headerHeight,
        fontSize: headerFontSize
      },
      content: {
        padding,
        backgroundColor: contentBackgroundColor,
        fontSize: contentFontSize
      },
      border: { width: borderWidth },
      icon: { size: iconSize }
    }
  } = new StyleConfig(config).getConfig()

  function setupBlockStructure(data: UmlDataArray) {
    const blockRefs: IRef = {}
    data.forEach(d => {
      blockRefs[d.name] = {}
      // TODO: what if d.members is empty?
      for (const id of d.members || []) {
        blockRefs[d.name][id.id] = undefined
      }
    })
    return blockRefs
  }
  // excute once mounted
  useEffect(() => {
    const computedLinePos = computeLinePos(data)
    setLinePos([...computedLinePos])
  }, [dataIds])

  function computeLinePos(data: UmlDataArray): TLinePos {
    const computedLinePos: TLinePos = []
    data.forEach(d => {
      if (d.deps) {
        for (const k in d.deps) {
          d.deps[k].forEach(dep => {
            const self = blockRefs[d.name][k]
            const target = blockRefs[dep.name][dep.id]
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

  return (
    <div ref={div} style={{ width: '100%', height: '100%' }}>
      <svg width="100%" height="100%">
        <ArrowMaker config={config} />

        <g
          ref={g}
          transform={`matrix(${matrix[0]},${matrix[1]},${matrix[2]},${matrix[3]},${matrix[4]},${matrix[5]})`}
        >
          {data.map((d, dIdx) => {
            return (
              <g key={`${d.name}-block`}>
                {d.members &&
                  d.members.map((k, kIdx) => {
                    const isHeader = kIdx === 0
                    const yDelta = !isHeader ? headerHeight - height : 0
                    const xText = isHeader
                      ? dIdx * (hGap + width) + padding
                      : dIdx * (hGap + width) + padding * 2

                    const yText = isHeader
                      ? headerHeight - headerPadding
                      : kIdx * (height + borderWidth) +
                        (height - padding) +
                        yDelta
                    return (
                      <g key={`${d.name}-${k.id}`}>
                        <rect
                          ref={node => node && setBlockRef(node, d.name, k.id)}
                          x={dIdx * (hGap + width)}
                          y={0 + kIdx * (height + borderWidth) + yDelta}
                          width={width}
                          height={isHeader ? headerHeight : height}
                          fill={
                            isHeader
                              ? headerBackgroundColor
                              : contentBackgroundColor
                          }
                        />
                        {!isHeader && (
                          <SvgIconProperty
                            x={dIdx * (hGap + width) + padding}
                            y={
                              0 +
                              kIdx * (height + borderWidth) +
                              yDelta +
                              iconSize
                            }
                          />
                        )}
                        <text
                          y={yText}
                          fill={isHeader ? headerColor : color}
                          fontSize={isHeader ? headerFontSize : contentFontSize}
                        >
                          <tspan x={xText}>{k.name}</tspan>
                          <tspan
                            textAnchor="end"
                            x={dIdx * (hGap + width) + width - padding}
                          >
                            {isHeader && k.type ? k.type : k.paramDes}
                          </tspan>
                        </text>
                      </g>
                    )
                  })}
              </g>
            )
          })}
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
        </g>
      </svg>
    </div>
  )
}
