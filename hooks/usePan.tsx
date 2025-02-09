import { useEffect, useState } from 'react'

const usePan = () => {
  const [startPointX, setStartPointX] = useState(0)
  const [startPointY, setStartPointY] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const container = document.getElementById('container')
    const handleDragStart = (e) => {
      setStartPointX(() => e.clientX)
      setStartPointY(() => e.clientY)
    }
    const handleDragEnd = (e) => {
      const offsetX = startPointX - e.clientX
      const offsetY = startPointY - e.clientY
      container.scrollBy({
        left: offsetX,
        top: offsetY,
        behavior: 'smooth',
      })
    }

    const handleZoom = (e) => {
      e.preventDefault()
      if (e.deltaY < 0) {
        if (scale > 2) return
        setScale((prevScale) => prevScale * 1.3)
      }
      if (scale < 0.5) return
      setScale((prevScale) => prevScale * 0.8)
    }

    container.addEventListener('wheel', handleZoom)
    container.addEventListener('dragstart', handleDragStart)
    container.addEventListener('dragend', handleDragEnd)

    return () => {
      container.removeEventListener('wheel', handleZoom)
      container.removeEventListener('dragstart', handleDragStart)
      container.removeEventListener('dragend', handleDragEnd)
    }
  }, [startPointX, startPointY, scale])

  return {
    scale,
  }
}

export default usePan
