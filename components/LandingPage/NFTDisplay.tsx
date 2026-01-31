const NFTDisplay = () => {
  return (
    <div className="bg-slate-900 p-1">
      <div className="w-40 h-40 relative bg-[url('https://arweave.net/ZBTD_T0pnhUsT6TyZLrhct998gZJa2LjJQyb_B1-dEo')] bg-cover bg-center rounded-md overflow-hidden mb-2">
        <div className="absolute top-2 left-2 text-white text-xs font-medium">
          Maravilla Gallery
        </div>
        <div className="absolute top-6 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
          Limited Edition
        </div>
      </div>
      <h3 className="text-sm font-bold text-white mb-1 px-1">Maravilla Gallery</h3>
      <p className="text-slate-400 text-[10px] leading-tight mb-2 px-1">
        The Maravilla Gallery Pass unlocks early access to the album and a growing
        collection of visuals, artworks, and process media that document its evolution.
      </p>
    </div>
  )
}

export default NFTDisplay
