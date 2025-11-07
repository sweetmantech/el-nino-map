import { Skeleton } from '@/components/ui/skeleton'
import Script from 'next/script'
import { useState } from 'react'

const InventoryZora = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="bg-slate-900 rounded-xl p-6 h-fit">
      <h3 className="text-xl font-bold text-white mb-4">Maravilla on Zora</h3>
      <Script async src="https://iframely.net/embed.js" onLoad={() => {
        setIsLoaded(true)
      }} />
      {isLoaded ? (
        <div className="iframely-embed">
          <div className="iframely-responsive !pb-[49%] pt-[120px]">
            <a
              href="https://zora.co/@maravilla"
              data-iframely-url="//iframely.net/H9BKs0Pq?theme=dark"
            ></a>
          </div>
        </div>
      ) : (
        <Skeleton className="w-full !pb-[48%] pt-[120px] rounded-lg bg-slate-800" />
      )}
    </div>
  )
}

export default InventoryZora
