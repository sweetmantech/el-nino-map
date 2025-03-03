import { useCallback, useState } from 'react'
import map from '@/lib/image-map.json'
import { useTipProvider } from '@/providers/TipProvider'

const ORIGINAL_WIDTH = 8000

const useAreaDetection = () => {
  const { imageRef, closeTooltip, showTooltip } = useTipProvider()
  const [area, setArea] = useState<string | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = imageRef.current?.getBoundingClientRect()
      if (!rect) return

      const currentWidth = rect.width
      const scale = currentWidth / ORIGINAL_WIDTH
      const x = (e.clientX - rect.left) / scale
      const y = (e.clientY - rect.top) / scale

      const area = map.areas.find((a) => {
        const coords = a.coords
        if (coords.length > 4) {
          let inside = false
          for (let i = 0, j = coords.length - 2; i < coords.length; i += 2) {
            const xi = coords[i],
              yi = coords[i + 1]
            const xj = coords[j],
              yj = coords[j + 1]

            const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
            if (intersect) inside = !inside

            j = i
          }

          return inside
        }
        return false
      })

      if (area) {
        showTooltip(area, e)
        setArea(area.id)

        const { sumX, sumY } = area.coords.reduce(
          (acc, coord, index) => {
            if (index % 2 === 0) {
              acc.sumX += coord
            } else {
              acc.sumY += coord
            }
            return acc
          },
          { sumX: 0, sumY: 0 },
        )

        const centerCoords = {
          x: sumX / (area.coords.length / 2),
          y: sumY / (area.coords.length / 2),
        }
        return centerCoords
      } else {
        closeTooltip()
        setArea(null)
      }
    },
    [imageRef, showTooltip, closeTooltip],
  )

  return { handleMouseMove, imageRef, area }
}

export default useAreaDetection
