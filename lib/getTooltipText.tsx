const getTooltipText = (tooltipId: string) => {
  switch (tooltipId) {
    case 'connect':
      return `El Niño Estrella is a multimedia experience. The smart album is a limited edition digital
          box set`
    case 'leaderboard':
      return 'Leaderboard'
    case 'mint':
      return 'Collect'
    case 'music':
      return 'Music Player'
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
      return 'Inventory'
    case 'memories':
      return 'Share Memories'
    case 'plannet':
      return 'SMS'
    default:
      return null
  }
}

export default getTooltipText
