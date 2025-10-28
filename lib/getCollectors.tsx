interface CollectorItem {
  address: string
  args: {
    tokenId: string | number
    user: string
    permissions: string
  }
}

interface AggregatedData {
  address: string
  permissions: string
  tokenId: string
  users: string[]
}

const getCollectors = (data: CollectorItem[]) => {
  const aggregated: Record<string, AggregatedData> = {}
  const usersSet = new Set<string>()

  data.forEach((item) => {
    const tokenId = item.args.tokenId.toString()
    const user = item.args.user

    if (!aggregated[tokenId]) {
      aggregated[tokenId] = {
        address: item.address,
        permissions: item.args.permissions,
        tokenId: tokenId,
        users: [],
      }
    }

    if (!aggregated[tokenId].users.includes(user)) {
      aggregated[tokenId].users.push(user)
    }

    usersSet.add(user)
  })

  return Array.from(usersSet)
}

export default getCollectors
