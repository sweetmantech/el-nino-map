import InventoryPlayer from './InventoryPlayer'
import InventoryVideo from './InventoryVideo'
import InteractiveNFT from './InteractiveNFT'
import InventoryZora from './InvertoryZora'

const InventoryPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">EXCLUSIVE VAULT</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventoryPlayer />
          <InteractiveNFT />
          <InventoryVideo />
          <InventoryZora />
        </div>
      </div>
    </main>
  )
}

export default InventoryPage
