import { DROP_ADDRESS } from '@/lib/consts'
import { readContract } from 'thirdweb'
import { useEffect, useState } from 'react'
import { type Address, zeroAddress } from 'viem'
import { currencyContract, extensionContract, mainfoldContract } from '@/lib/contracts'

interface Metadata {
  name?: string
  description?: string
  image?: string
  attributes?: Array<{
    trait_type: string
    value: string | number
  }>
}

const fetchMetadata = async (uri: string) => {
  const response = await fetch(`/api/metadata?uri=${encodeURIComponent(uri)}`)
  const data = await response.json()
  return data
}

const getLatestInstanceId = async () => {
  const response = await fetch('/api/dune/instanceId')
  const data = await response.json()
  return data
}

const useClaimInfo = () => {
  const [instanceId, setInstanceId] = useState(0)
  const [price, setPrice] = useState(BigInt(0))
  const [decimal, setDecimal] = useState(18)
  const [erc20Address, setErc20Address] = useState<Address>(zeroAddress)
  const [symbol, setSymbol] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [amount, setAmount] = useState<number>(1)

  useEffect(() => {
    const init = async () => {
      const instanceId = await getLatestInstanceId()
      setInstanceId(instanceId)

      const response = await readContract({
        contract: extensionContract,
        method:
          'function getClaim(address creatorContractAddress, uint256 instanceId) view returns ((uint32 total, uint32 totalMax, uint32 walletMax, uint48 startDate, uint48 endDate, uint8 storageProtocol, bytes32 merkleRoot, string location, uint256 tokenId, uint256 cost, address paymentReceiver, address erc20, address signingAddress) claim)',
        params: [DROP_ADDRESS, instanceId],
      })

      const tokenId = response.tokenId
      const isERC20Token = response.erc20 !== zeroAddress
      setPrice(response.cost)
      if (isERC20Token) {
        const decimal = await readContract({
          contract: currencyContract(response.erc20),
          method: 'decimals',
          params: [],
        })
        const symbol = await readContract({
          contract: currencyContract(response.erc20),
          method: 'symbol',
          params: [],
        })
        setDecimal(Number(decimal))
        setSymbol(String(symbol))
        setErc20Address(response.erc20 as Address)
      } else {
        setDecimal(18)
        setErc20Address(zeroAddress)
        setSymbol('ETH')
      }
      const uri = await readContract({
        contract: mainfoldContract,
        method: 'function uri(uint256 tokenId) view returns (string)',
        params: [tokenId],
      })
      const meatadata = await fetchMetadata(uri)
      setMetadata(meatadata)
      setIsLoading(false)
    }

    init()
  }, [])

  return {
    symbol,
    price,
    decimal,
    erc20Address,
    isLoading,
    instanceId,
    metadata,
    amount,
    setAmount,
  }
}

export default useClaimInfo
