import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2 } from 'lucide-react'
import { useMusicPlayerProvider } from '@/providers/MusicPlayerProvider'

const MusicPlayerSection = () => {
  const {
    currentTrackData,
    isPlaying,
    progress,
    currentTime,
    volume,
    shuffle,
    repeat,
    audioRef,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    setShuffle,
    setRepeat,
    formatTime,
  } = useMusicPlayerProvider()

  return (
    <div>
      <audio ref={audioRef} src={currentTrackData.src} preload="metadata" />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4">
        <div className="w-full max-w-xs md:w-24 md:h-24 aspect-square bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex-shrink-0" />
        <div className="flex-1 w-full min-w-0 flex flex-col items-center md:items-start">
          <h4 className="text-white font-bold text-xl md:text-lg mb-1 text-center md:text-left">
            {currentTrackData.title}
          </h4>
          <p className="text-gray-400 text-sm mb-6 md:mb-4 text-center md:text-left">
            {currentTrackData.artist}
          </p>
          <div className="w-full mb-4 md:mb-3">
            <div className="w-full bg-gray-700 h-1 md:h-0.5 rounded-full mb-2 md:mb-1 relative cursor-pointer">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-2 md:h-2 bg-white rounded-full cursor-pointer"
                style={{ left: `${progress * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={progress}
                onChange={(e) => {
                  const audio = audioRef.current
                  if (audio) {
                    audio.currentTime = parseFloat(e.target.value) * audio.duration
                  }
                }}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-sm md:text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{currentTrackData.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-2 w-full justify-center md:justify-start">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`transition-colors ${shuffle ? 'text-sky-400' : 'text-gray-400'}`}
            >
              <Shuffle className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <button
              onClick={prevTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-14 h-14 md:w-10 md:h-10 bg-sky-400 hover:bg-sky-500 rounded-lg md:rounded-lg flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-4 md:h-4 text-white" />
              ) : (
                <Play className="w-5 h-5 md:w-4 md:h-4 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setRepeat(!repeat)}
              className={`transition-colors ${repeat ? 'text-sky-400' : 'text-gray-400'}`}
            >
              <Repeat className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <div className="hidden md:flex flex-grow justify-end items-center gap-2 ml-4">
              <Volume2 className="w-[18px] h-[18px] text-gray-400" />
              <div className="w-20 relative">
                <div className="w-full bg-gray-700 h-0.5 rounded-full">
                  <div
                    className="bg-sky-400 h-0.5 rounded-full transition-all"
                    style={{ width: `${volume * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full cursor-pointer"
                    style={{ left: `${volume * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="absolute top-0 left-0 w-full h-0.5 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayerSection
