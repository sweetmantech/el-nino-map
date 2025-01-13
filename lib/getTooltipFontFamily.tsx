const getTooltipFontFamily = (tooltipId) => {
  switch (tooltipId) {
    case 'connect':
      return `Brush Script`
    case 'leaderboard':
      return 'Brush Script'
    case 'mint':
      return 'Italipixel'
    case 'spinamp':
      return 'discotechia'
    case 'metadata':
      return 'New Digital'
    case 'merch':
      return 'Akira Expanded Demo'
    case 'video':
      return 'poxel-font'
    case 'live-show':
      return 'New Digital'
    case 'subscribe':
      return 'Necosmic-Display'
    case 'control':
      return 'Italipixel'
    case 'memories':
      return 'TitilliumWeb-Bold'
  }
}

export default getTooltipFontFamily
