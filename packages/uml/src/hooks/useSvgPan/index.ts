import { useState, useEffect, useCallback } from 'react'

type UseSvgPanHook = [(node: HTMLElement | null) => void, Array<number>]

export function useSvgPan(): UseSvgPanHook {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [matrix, setMatrix] = useState([1, 0, 0, 1, 0, 0])
  const [mousedownTf, setMousedownTf] = useState<DOMMatrix>(
    new DOMMatrix([1, 0, 0, 1, 0, 0])
  )
  const [mousedownOrigin, setMousedownOrigin] = useState()
  const [canMove, setCanMove] = useState(false)

  const ref = useCallback(node => {
    setNode(node)
  }, [])

  useEffect(() => {
    node && node.addEventListener('wheel', handleWheelScale)
    node && node.addEventListener('mousedown', handleMouseDown)
    node && node.addEventListener('mouseup', handleMouseUp)
    return () => {
      node && node.removeEventListener('wheel', handleWheelScale)
      node && node.removeEventListener('mousedown', handleMouseDown)
      node && node.removeEventListener('mouseup', handleMouseUp)
    }
  }, [node, matrix])

  useEffect(() => {
    node && canMove && node.addEventListener('mousemove', handleMouseMove)
    node && !canMove && node.removeEventListener('mousemove', handleMouseMove)
    return () => {
      node && node.removeEventListener('mousemove', handleMouseMove)
    }
  }, [node, canMove, mousedownTf, mousedownOrigin])

  // https://github.com/aleofreddi/svgpan/blob/d59255197236e5936650e4cd9b1ec0b88f199188/svgpan.js#L146
  function handleWheelScale(event: WheelEvent) {
    if ((event.ctrlKey || event.altKey) && node) {
      event.preventDefault()
      const { offsetLeft, offsetTop } = node
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

  // https://github.com/aleofreddi/svgpan/blob/d59255197236e5936650e4cd9b1ec0b88f199188/svgpan.js#L186
  function handleMouseMove(event: MouseEvent) {
    if (event && node && canMove) {
      event.preventDefault()
      const { offsetLeft, offsetTop } = node
      const { clientX, clientY } = event
      let mouse = new DOMPoint(clientX - offsetLeft, clientY - offsetTop)
      mouse = mouse.matrixTransform(mousedownTf)
      console.log(mousedownOrigin)
      setMatrix(
        dmatrix2Array(
          mousedownTf
            .inverse()
            .translate(mouse.x - mousedownOrigin.x, mouse.y - mousedownOrigin.y)
        )
      )
    }
  }

  // https://github.com/aleofreddi/svgpan/blob/d59255197236e5936650e4cd9b1ec0b88f199188/svgpan.js#L214
  function handleMouseDown(event: MouseEvent) {
    if (event && node) {
      event.preventDefault()
      const { offsetLeft, offsetTop } = node
      const { clientX, clientY } = event
      const mouse = new DOMPoint(clientX - offsetLeft, clientY - offsetTop)
      const ctm = new DOMMatrix(matrix)
      const tf = ctm.inverse()
      setMousedownTf(tf)
      setMousedownOrigin(mouse.matrixTransform(tf))
      setCanMove(true)
    }
  }

  // https://github.com/aleofreddi/svgpan/blob/d59255197236e5936650e4cd9b1ec0b88f199188/svgpan.js#L249
  function handleMouseUp(event: MouseEvent) {
    if (event && node) {
      event.preventDefault()
      setCanMove(false)
    }
  }

  function dmatrix2Array(dmatrix: DOMMatrix) {
    return [dmatrix.a, dmatrix.b, dmatrix.c, dmatrix.d, dmatrix.e, dmatrix.f]
  }

  return [ref, matrix]
}
