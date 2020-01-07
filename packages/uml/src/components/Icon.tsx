import React from 'react'
import SvgIconProperty from '../assets/icon/property.svg'
import SvgIconConstrct from '../assets/icon/construct.svg'
import SvgIconMethod from '../assets/icon/method.svg'

interface IconProps extends React.SVGAttributes<SVGElement> {
  type: string
}

export default function Icon(props: IconProps) {
  const { type, ...svgParams } = props
  let IconRet: SvgrComponent = SvgIconProperty
  switch (type) {
    case 'Property':
      IconRet = SvgIconProperty
      break
    case 'Constructor':
      IconRet = SvgIconConstrct
      break
    case 'Method':
      IconRet = SvgIconMethod
      break
    default:
      break
  }
  return <IconRet {...svgParams} />
}
