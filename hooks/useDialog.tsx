import { useState } from 'react'
import useIsMobile from './useIsMobile'

const useDialog = () => {
  const isMobile = useIsMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)

  const showDlg = () => {
    setIsVisibleTooltip(isMobile)
    setIsDialogOpen(true)
  }

  const closeDlg = () => {
    if (!isDialogOpen) return
    setIsDialogOpen(false)
  }

  const closeTooltip = () => {
    setIsVisibleTooltip(false)
  }

  const showTooltip = (e: any) => {
    if (isDialogOpen) return
    setIsVisibleTooltip(true)
    const x = e.clientX
    const y = e.clientY

    setTooltipX(x)
    setTooltipY(y)
  }

  return {
    isDialogOpen,
    isVisibleToolTip,
    tooltipX,
    tooltipY,
    showTooltip,
    showDlg,
    closeDlg,
    closeTooltip,
  }
}

export default useDialog
