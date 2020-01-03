import { useCallback, useState, useEffect } from 'react'
import { Matrix, dmatrix2Array } from '../useSvgPan'
interface IViewBox {
  x: number
  y: number
  width: number
  height: number
}

interface IPropsSvgView {
  div: HTMLElement | null
  dataIds: string
  matrix: Matrix
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>
}

export function useSvgView(props: IPropsSvgView) {
  const { div, dataIds, matrix, setMatrix } = props
  const [g, setG] = useState<SVGGraphicsElement | null>(null)
  const refG = useCallback(node => {
    setG(node)
  }, [])

  useEffect(() => {
    if (g && div) {
      const viewBox = getViewBox(g)
      setViewCenter(div, g, viewBox)
    }
  }, [g, div, dataIds])

  function getViewBox(g: SVGGraphicsElement) {
    const bBox = g.getBBox()

    return {
      x: bBox.x,
      y: bBox.y,
      width: bBox.width,
      height: bBox.height
    }
  }

  function setMove(x: number, y: number) {
    const ctm = new DOMMatrix(matrix)
    ctm.e = x
    ctm.f = y
    setMatrix(dmatrix2Array(ctm))
  }

  function setViewCenter(
    div: HTMLElement,
    g: SVGGraphicsElement,
    viewBox: IViewBox
  ) {
    if (!viewBox) return
    const { width, height } = div.getBoundingClientRect()
    const ctm = new DOMMatrix(matrix)
    const zoom = ctm.a
    const offsetX = (width - (viewBox.width + viewBox.x * 2) * zoom) * 0.5
    const offsetY = (height - (viewBox.height + viewBox.y * 2) * zoom) * 0.5
    setMove(offsetX, offsetY)
  }

  return [refG]
}
