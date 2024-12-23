const getTooltipText = (tooltipId) => {
  switch (tooltipId) {
    case 'connect':
      return `El Niño Estrella is a multimedia experience. The smart album is a limited edition digital
          box set`
    case 'leaderboard':
      return 'Leaderboard'
    case 'mint':
      return 'Purchase'
    case 'spinamp':
      return 'Spinamp Player'
    case 'metadata':
      return 'Metadata'
    case 'merch':
      return 'Merch'
    case 'video':
      return 'Videos'
    case 'live-show':
      return 'Live Show'
    case 'subscribe':
      return 'Subscribe'
    case 'control':
      return 'Guest Book'
    case 'memories':
      return 'Share Memories'
  }
}

export default getTooltipText
