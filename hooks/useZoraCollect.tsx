import { DROP_ADDRESS, ZORA_PRICE } from '@/lib/consts'
import { BigNumber } from '@ethersproject/bignumber'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useActiveAccount, useConnectModal } from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { baseSepolia } from 'thirdweb/chains'
import { prepareContractCall, sendTransaction, getContract } from 'thirdweb'
import getCollectorClient from '@/lib/zora/getCollectorClient'
import { wallets } from '@/lib/thirdweb/wallets'

const useZoraCollect = () => {
  const { connect } = useConnectModal()
  const activeAccount = useActiveAccount()

  const purchase = async () => {
    try {
      const address = activeAccount?.address
      if (!address) {
        connect({
          client,
          wallets,
          chain: baseSepolia,
        })
        return
      }
      const collectorClient = getCollectorClient()
      const zoraPrice = BigNumber.from(ZORA_PRICE)

      const { parameters } = await collectorClient.mint({
        tokenContract: DROP_ADDRESS,
        mintType: '1155',
        quantityToMint: 1,
        minterAccount: address,
        tokenId: 5,
      })

      const { address: minterAddress, abi, args } = parameters
      const contract: any = getContract({
        address: minterAddress,
        chain: baseSepolia,
        abi: abi,
        client,
      })

      const transaction: any = prepareContractCall({
        contract,
        method:
          'function mint(address mintTo, uint256 quantity, address collection, uint256 tokenId, address mintReferral, string comment) payable',
        params: args,
        value: zoraPrice.toBigInt(),
      })

      const { transactionHash } = await sendTransaction({
        transaction,
        account: activeAccount,
      })

      toast.success('Purchased!')
      return transactionHash
    } catch (error) {
      handleTxError(error)
      return { error }
    }
  }

  return {
    purchase,
  }
}

export default useZoraCollect
