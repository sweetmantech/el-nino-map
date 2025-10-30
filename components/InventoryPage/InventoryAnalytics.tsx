import { Music, Users, Eye, Heart, Globe, Zap, ArrowUp, ArrowDown } from 'lucide-react'

const InventoryAnalytics = () => {
  return (
    <div className="bg-black rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">Artist Analytics</h3>
          <p className="text-white/70 text-sm">Real-time performance metrics</p>
        </div>
        <button className="px-3 py-1.5 rounded-lg border border-blue-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span className="text-blue-500 text-sm font-medium">Live</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Music className="w-5 h-5 text-purple-500" />
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>8.4%</span>
            </div>
          </div>
          <p className="text-white text-3xl font-bold mb-1">2.4M</p>
          <p className="text-white/70 text-sm">Total Streams</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-purple-500" />
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>20.1%</span>
            </div>
          </div>
          <p className="text-white text-3xl font-bold mb-1">847K</p>
          <p className="text-white/70 text-sm">Monthly Listeners</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-purple-500" />
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>15.2%</span>
            </div>
          </div>
          <p className="text-white text-3xl font-bold mb-1">1.2M</p>
          <p className="text-white/70 text-sm">Video Views</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-purple-500" />
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <ArrowDown className="w-4 h-4" />
              <span>6.5%</span>
            </div>
          </div>
          <p className="text-white text-3xl font-bold mb-1">456K</p>
          <p className="text-white/70 text-sm">Total Likes</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-purple-500" />
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <ArrowDown className="w-4 h-4" />
              <span>13.1%</span>
            </div>
          </div>
          <p className="text-white text-3xl font-bold mb-1">127</p>
          <p className="text-white/70 text-sm">Countries</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-purple-500" />
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>7.8%</span>
            </div>
          </div>
          <p className="text-white text-3xl font-bold mb-1">94.2%</p>
          <p className="text-white/70 text-sm">Engagement Rate</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-white/70">
              Last updated: <span className="text-white font-medium">Just now</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-white/70">
              Peak listeners: <span className="text-white font-medium">1.2M</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span className="text-white/70">
              Top country: <span className="text-white font-medium">United States</span>
            </span>
          </div>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-white/70 text-sm">Built</button>
      </div>
    </div>
  )
}

export default InventoryAnalytics
