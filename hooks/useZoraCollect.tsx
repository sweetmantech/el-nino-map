import { COMMENT, DROP_ADDRESS, ZORA_PRICE } from '@/lib/consts'
import { BigNumber } from '@ethersproject/bignumber'
import { Address } from 'viem'
import zora721Abi from '@/lib/abi/zora-erc721-drop.json'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useActiveAccount, useConnectModal } from 'thirdweb/react'
import { createWallet } from 'thirdweb/wallets'
import { client } from '@/lib/thirdweb/client'
import { baseSepolia } from 'thirdweb/chains'
import { prepareContractCall, sendTransaction, getContract } from 'thirdweb'

const useZoraCollect = () => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const { connect } = useConnectModal()

  const purchase = async () => {
    try {
      if (!address)
        connect({
          client,
          wallets: [createWallet('embedded')],
          chain: baseSepolia,
        })
      const zoraPrice = BigNumber.from(ZORA_PRICE)
      const zoraQuantity = 1

      const contract: any = getContract({
        address: DROP_ADDRESS as Address,
        chain: baseSepolia,
        abi: zora721Abi as any,
        client,
      })

      const transaction: any = prepareContractCall({
        contract,
        method:
          'function purchaseWithComment(uint256 quantity, string comment) payable returns (uint256)',
        params: [BigInt(zoraQuantity), COMMENT],
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
