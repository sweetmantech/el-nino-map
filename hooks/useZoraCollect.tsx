import { COMMENT, DROP_ADDRESS, ZORA_PRICE } from '@/lib/consts'
import { BigNumber } from '@ethersproject/bignumber'
import { Address } from 'viem'
import zora721Abi from '@/lib/abi/zora-erc721-drop.json'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useConnectModal } from 'thirdweb/react'
import { createWallet } from 'thirdweb/wallets'
import { client } from '@/lib/thirdweb/client'
import { base, baseSepolia, mainnet } from 'thirdweb/chains'
import { prepareContractCall, getContract } from 'thirdweb'
import { useSendTransaction } from 'thirdweb/react'

const useZoraCollect = () => {
  const { connect } = useConnectModal()
  const { mutateAsync: sendTransaction } = useSendTransaction({
    payModal: {
      buyWithFiat: {
        testMode: true,
      },
    },
  })

  const purchase = async (activeAccount: any) => {
    try {
      const address = activeAccount?.address
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
        chain: base,
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

      const tx = await sendTransaction(transaction)

      toast.success('Purchased!')
      return tx
    } catch (error) {
      handleTxError(error)
      console.error(error)
      return { error }
    }
  }

  return {
    purchase,
  }
}

export default useZoraCollect
