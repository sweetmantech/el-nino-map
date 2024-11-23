const getCollectors = (data) => {
  const aggregated = {}
  const usersSet = new Set()

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
