const InventoryVideo = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 h-fit">
      <h3 className="text-xl font-bold text-white mb-4">Behind The Scenes: Studio Session</h3>
      <p className="text-slate-400 text-sm mb-4">
        Exclusive look at the making of Cosmic Dreams. Watch the creative process unfold.
      </p>
      <div className="aspect-video relative bg-slate-800 rounded-lg overflow-hidden">
        <video className="size-full object-cover" controls poster="/splash.png">
          <source src="#" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex gap-4 mt-4 text-sm text-slate-400">
        <span>12:45</span>
        <span>•</span>
        <span>1080p</span>
        <span>•</span>
        <span>Released 2 days ago</span>
      </div>
    </div>
  )
}

export default InventoryVideo
