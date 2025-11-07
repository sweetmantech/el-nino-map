import useIframely from '@/hooks/useIframely'

const InventoryZora = () => {
  useIframely()

  return (
    <div className="bg-slate-900 rounded-xl p-6 h-fit">
      <h3 className="text-xl font-bold text-white mb-4">Maravilla on Zora</h3>
      <div className="iframely-embed">
        <div className="iframely-responsive !pb-[49%] pt-[120px]">
          <a
            href="https://zora.co/@maravilla"
            data-iframely-url="//iframely.net/H9BKs0Pq?theme=dark"
          ></a>
        </div>
      </div>
    </div>
  )
}

export default InventoryZora
