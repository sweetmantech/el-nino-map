import { CHAIN_ID, COMMENT, DROP_ADDRESS, ZORA_PRICE } from '@/lib/consts'
import { BigNumber } from '@ethersproject/bignumber'
import zoraAbi from '@/lib/abi/zora-erc721-drop.json'
import { useEthersSigner } from './useEthersSigner'
import { Contract } from 'ethers'
import useConnectWallet from './useConnectWallet'

const usePurchase = () => {
  const signer = useEthersSigner({ chainId: CHAIN_ID })
  const { connectWallet } = useConnectWallet()

  const purchase = async () => {
    try {
      if (!signer) connectWallet()
      const zoraPrice = BigNumber.from(ZORA_PRICE)
      const zoraQuantity = 1

      const contract = new Contract(DROP_ADDRESS, zoraAbi, signer)

      const tx = await contract.purchaseWithComment(zoraQuantity, COMMENT, {
        value: zoraPrice.toString(),
      })
      await tx.wait()

      return true
    } catch (error) {
      console.error(error)
      return { error }
    }
  }

  return {
    purchase,
  }
}

export default usePurchase
