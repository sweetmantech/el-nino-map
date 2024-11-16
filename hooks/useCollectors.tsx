import { CHAIN_ID, DROP_ADDRESS } from '@/lib/consts'
import { useEffect, useState } from 'react'
import { parseAbiItem } from 'viem'
import { getPublicClient } from '@/lib/clients'
import getCollectors from '@/lib/getCollectors'

const useCollectors = () => {
  const [collectors, setCollectors] = useState([])

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      const logs = await publicClient.getLogs({
        address: DROP_ADDRESS,
        event: parseAbiItem(
          'event UpdatedPermissions(uint256 indexed tokenId, address indexed user, uint256 indexed permissions)',
        ),
        args: {
          permissions: BigInt(2),
        },
        fromBlock: BigInt(0),
        toBlock: 'latest',
      })
      const formattedLogs = logs.filter((log) => log.args.tokenId > BigInt(0))
      const data = getCollectors(formattedLogs)
      const users = data.filter((item) => item !== '0x777777C338d93e2C7adf08D102d45CA7CC4Ed021')
      setCollectors(users)
    }

    init()
  }, [])

  return {
    collectors,
  }
}

export default useCollectors
