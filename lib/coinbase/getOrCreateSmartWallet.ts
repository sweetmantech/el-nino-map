import cdp from '@/lib/coinbase/client'
import { EvmSmartAccount } from '@coinbase/cdp-sdk'

export async function getOrCreateSmartWallet(): Promise<EvmSmartAccount> {
  const evmAccount = await cdp.evm.getOrCreateAccount({
    name: 'el-nino-maravilla-pt-1',
  })
  const smartAccount = await cdp.evm.getOrCreateSmartAccount({
    name: evmAccount.name as string,
    owner: evmAccount,
  })
  return smartAccount
}
