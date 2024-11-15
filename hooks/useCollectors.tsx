import { CHAIN_ID, DROP_ADDRESS } from '@/lib/consts'
import { useEffect, useState } from 'react'
import { parseAbiItem } from 'viem'
import { getPublicClient } from '@/lib/clients'

const useCollectors = () => {
  const [collectors, setCollectors] = useState([])
  // const { aggregate3Value } = useMulticall3Read()

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
      console.log("ZIAD HERE", formattedLogs)
      setCollectors(formattedLogs)
    }

    init()
  }, [])

  return {
    collectors,
  }
}

export default useCollectors
