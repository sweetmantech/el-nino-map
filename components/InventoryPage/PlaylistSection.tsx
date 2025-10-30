import { useMusicPlayerProvider } from '@/providers/MusicPlayerProvider'

const PlaylistSection = () => {
  const { tracks, currentTrack, selectTrack } = useMusicPlayerProvider()

  return (
    <div className="mt-8 md:mt-6">
      <h3 className="text-white font-bold text-sm uppercase mb-3">PLAYLIST</h3>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => selectTrack(index)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
              index === currentTrack
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <span className="text-slate-400 w-6 text-sm">{track.number}</span>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium truncate ${index === currentTrack ? 'text-white' : 'text-white'}`}
              >
                {track.title}
              </p>
              <p className="text-slate-400 text-sm truncate">{track.artist}</p>
            </div>
            <span className="text-slate-400 text-sm">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistSection
