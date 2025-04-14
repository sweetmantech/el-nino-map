import { useMapProvider } from '@/providers/MapProvider'
import { useTipProvider } from '@/providers/TipProvider'
import Image from 'next/image'
import { Fragment } from 'react'

const Preview = () => {
  const { tooltipX, tooltipY, tooltipId } = useTipProvider()
  const { mint, purchasing, amount, setAmount } = useMapProvider()
  if (tooltipId !== 'mint') return <Fragment />

  return (
    <div
      className="bg-white p-2 rounded-md fixed z-[9999]"
      style={{
        left: tooltipX,
        top: tooltipY - 250,
      }}
    >
      <Image
        src={'https://arweave.net/qdA4w5H9lQTtp-9az4qIIlrq9AQD4pfAasuErfUMzXk'}
        width={200}
        height={200}
        alt="not found preview"
      />
      <div className="mt-2 px-2">
        <p className="font-titilliumweb">Free</p>
        <p className="font-titilliumweb">{`+ MANIFOLD FEE (0.0005 ETH)`}</p>
      </div>
      <div className="flex font-titilliumweb justify-center gap-2 mt-1">
        <button
          className="bg-black text-white px-3 rounded-sm"
          onClick={() => {
            if (amount > 1) setAmount(amount - 1)
          }}
        >
          -
        </button>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          className="!ring-0 !outline-none !w-fit px-2 text-center"
        />
        <button
          className="bg-black text-white px-3 rounded-sm"
          onClick={() => setAmount(amount + 1)}
        >
          +
        </button>
      </div>
      <button
        disabled={purchasing}
        type="button"
        onClick={mint}
        className="w-full py-2 mt-2 bg-black rounded-md text-white font-titilliumweb"
      >
        {purchasing ? 'Collecting...' : 'Collect'}
      </button>
    </div>
  )
}

export default Preview
