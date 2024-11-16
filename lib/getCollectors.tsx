const getCollectors = (data) => {
  const aggregated = {}
  const usersSet = new Set()

  data.forEach((item) => {
    const tokenId = item.args.tokenId.toString() // Convert BigInt to string for use as a key
    const user = item.args.user

    // If the tokenId doesn't exist in the aggregated object, create it
    if (!aggregated[tokenId]) {
      aggregated[tokenId] = {
        address: item.address, // Assuming address is the same for each tokenId
        permissions: item.args.permissions,
        tokenId: tokenId,
        users: [],
      }
    }

    // Push the user into the array, avoiding duplicates
    if (!aggregated[tokenId].users.includes(user)) {
      aggregated[tokenId].users.push(user)
    }

    usersSet.add(user)
  })

  return Array.from(usersSet)
}

export default getCollectors
