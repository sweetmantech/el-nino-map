import InventoryPlayer from './InventoryPlayer'
import InventoryVideo from './InventoryVideo'
import InventoryAnalytics from './InventoryAnalytics'
import InteractiveNFT from './InteractiveNFT'

const InventoryPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">EXCLUSIVE VAULT</h1>
        </div>
        <div className="space-y-6">
          <InventoryPlayer />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InventoryVideo />
            <InteractiveNFT />
          </div>
          <InventoryAnalytics />
        </div>
      </div>
    </main>
  )
}

export default InventoryPage
