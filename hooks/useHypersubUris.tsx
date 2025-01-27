import { stpv2Abi } from '@/lib/abi/stpv2'
import { getPublicClient } from '@/lib/clients'
import { STPV2 } from '@/lib/consts'
import { useEffect, useState } from 'react'
import { getContract, readContract } from 'thirdweb'
import { base } from 'thirdweb/chains'
import { client } from '@/lib/thirdweb/client'

const useHypersubUris = () => {
  const [photos, setPhotos] = useState<Array<string>>([])

  useEffect(() => {
    const init = async () => {
      const contract: any = getContract({
        address: STPV2,
        chain: base,
        abi: stpv2Abi as any,
        client,
      })
      const data = await readContract({
        contract,
        method:
          'function contractDetail() view returns ((uint16 tierCount, uint64 subCount, uint64 supplyCap, address transferRecipient, address currency, uint256 creatorBalance, uint8 numCurves, uint256 rewardShares, uint256 rewardBalance, uint32 rewardSlashGracePeriod, bool rewardSlashable) detail)',
        params: [],
      })

      const publicClient: any = getPublicClient(base.id)
      const wagmiContract = {
        address: STPV2,
        abi: stpv2Abi as any,
        functionName: 'tokenURI',
      } as const

      const contracts: any = []

      for (let i = 0; i < parseInt(data.subCount.toString(), 10); i++) {
        contracts.push({
          ...wagmiContract,
          args: [BigInt(i + 1)],
        })
      }
      const results = await publicClient.multicall({
        contracts,
      })
      const uris = results.map((result) => result?.result).filter((ele) => ele)

      const imagesPromises = uris.map(async (uri) => {
        const response = await fetch(uri)
        const data = await response.json()
        return data.image
      })
      const images: any = await Promise.all(imagesPromises)
      const uniqueImages = new Set(images)
      setPhotos(Array.from(uniqueImages) as any)
    }

    init()
  }, [])

  return {
    photos,
  }
}

export default useHypersubUris
