import { useTipProvider } from '@/providers/TipProvider'
import Image from 'next/image'
import { Fragment } from 'react'

const Preview = () => {
  const { tooltipX, tooltipY, tooltipId } = useTipProvider()
  if (tooltipId !== 'mint') return <Fragment />

  return (
    <div
      className="bg-white py-2 rounded-md fixed z-[9999]"
      style={{
        left: tooltipX,
        top: tooltipY - 200,
      }}
    >
      <Image
        src={'https://arweave.net/qdA4w5H9lQTtp-9az4qIIlrq9AQD4pfAasuErfUMzXk'}
        width={200}
        height={200}
        alt="not found preview"
      />
    </div>
  )
}

export default Preview
