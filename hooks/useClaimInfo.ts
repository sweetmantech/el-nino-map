import { CHAIN, DROP_ADDRESS, ERC1155_LAZY_PAYABLE_CLAIM } from '@/lib/consts'
import { client } from '@/lib/thirdweb/client'
import { getContract, readContract } from 'thirdweb'
import { useEffect, useState } from 'react'
import { Address, erc20Abi, zeroAddress } from 'viem'
import { erc1155LazyPayableClaimAbi } from '@/lib/abi/erc_1155_lazy_payable'
import { erc1155Abi } from '@/lib/abi/erc1155Abi'

export const extensionContract: any = getContract({
  address: ERC1155_LAZY_PAYABLE_CLAIM,
  chain: CHAIN,
  abi: erc1155LazyPayableClaimAbi as any,
  client,
})

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
  const [metadata, setMetadata] = useState(null)
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
        const erc20Contract: any = getContract({
          address: response.erc20,
          chain: CHAIN,
          abi: erc20Abi,
          client,
        })
        const decimal = await readContract({
          contract: erc20Contract,
          method: 'function decimals() view returns (uint8)',
          params: [],
        })
        const symbol = await readContract({
          contract: erc20Contract,
          method: 'function symbol() view returns (string)',
          params: [],
        })
        setDecimal(decimal)
        setSymbol(symbol)
        setErc20Address(response.erc20)
      } else {
        setDecimal(18)
        setErc20Address(zeroAddress)
        setSymbol('ETH')
      }
      const mainfoldContract = getContract({
        address: DROP_ADDRESS,
        chain: CHAIN,
        abi: erc1155Abi as any,
        client,
      })
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
