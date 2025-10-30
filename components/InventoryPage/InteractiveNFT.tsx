const InteractiveNFT = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="aspect-square relative bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 rounded-lg overflow-hidden mb-4">
        <div className="absolute top-4 left-4 text-white text-sm font-medium">Interactive NFT</div>
        <div className="absolute top-12 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          Limited Edition
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Cosmic Dreams #001</h3>
      <p className="text-slate-400 text-sm mb-4">Interactive generative art piece</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-slate-400 text-xs mb-1">Edition</p>
          <p className="text-white font-bold text-sm">1 of 100</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Rarity</p>
          <p className="text-blue-400 font-bold text-sm">Legendary</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Chain</p>
          <p className="text-white font-bold text-sm">Ethereum</p>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span className="text-sm">Share</span>
        </button>
        <button className="flex items-center gap-2 border border-slate-600 text-white px-3 py-1 rounded hover:border-slate-400 transition-colors">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span className="text-xs">View on OpenSea</span>
        </button>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">
        This interactive NFT responds to your movements, creating a unique viewing experience. Each
        piece is algorithmically generated and tied to the Cosmic Dreams album.
      </p>
    </div>
  )
}

export default InteractiveNFT
