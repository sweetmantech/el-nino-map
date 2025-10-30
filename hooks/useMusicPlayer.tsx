import { useState, useRef, useEffect } from 'react'

interface Track {
  number: string
  title: string
  artist: string
  duration: string
  src: string
}

const tracks: Track[] = [
  {
    number: '01',
    title: 'Cosmic Dreams',
    artist: 'Luna Waves',
    duration: '4:05',
    src: '/placeholder.ogv',
  },
  {
    number: '02',
    title: 'Stellar Journey',
    artist: 'Luna Waves',
    duration: '3:18',
    src: '/placeholder.ogv',
  },
  {
    number: '03',
    title: 'Nebula Nights',
    artist: 'Luna Waves',
    duration: '4:27',
    src: '/placeholder.ogv',
  },
]

const useMusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const nextTrack = () => {
    const next = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrack + 1) % tracks.length
    setCurrentTrack(next)
    setIsPlaying(true)
    setProgress(0)
    setCurrentTime(0)
  }

  const prevTrack = () => {
    const prev = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrack - 1 + tracks.length) % tracks.length
    setCurrentTrack(prev)
    setIsPlaying(true)
    setProgress(0)
    setCurrentTime(0)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration)
        setCurrentTime(audio.currentTime)
      }
    }
    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        const next = shuffle
          ? Math.floor(Math.random() * tracks.length)
          : (currentTrack + 1) % tracks.length
        setCurrentTrack(next)
        setIsPlaying(true)
        setProgress(0)
        setCurrentTime(0)
      }
    }
    if (isPlaying) audio.play()
    else audio.pause()
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume, repeat, currentTrack, shuffle, isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const selectTrack = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)
    setProgress(0)
    setCurrentTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    tracks,
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    volume,
    shuffle,
    repeat,
    audioRef,
    setProgress,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
    setShuffle,
    setRepeat,
    formatTime,
    currentTrackData: tracks[currentTrack],
  }
}

export default useMusicPlayer
