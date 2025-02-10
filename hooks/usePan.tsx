import { useEffect, useState } from 'react'

const usePan = () => {
  const [startPointX, setStartPointX] = useState(0)
  const [startPointY, setStartPointY] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const map = document.getElementById('map')
    const handleDragStart = (e) => {
      setStartPointX(() => e.clientX)
      setStartPointY(() => e.clientY)
    }
    const handleDragEnd = (e) => {
      const offsetX = startPointX - e.clientX
      const offsetY = startPointY - e.clientY
      const container = document.getElementById('container')
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

    map.addEventListener('wheel', handleZoom)
    map.addEventListener('dragstart', handleDragStart)
    map.addEventListener('dragend', handleDragEnd)

    return () => {
      map.removeEventListener('wheel', handleZoom)
      map.removeEventListener('dragstart', handleDragStart)
      map.removeEventListener('dragend', handleDragEnd)
    }
  }, [startPointX, startPointY, scale])

  return {
    scale,
  }
}

export default usePan
