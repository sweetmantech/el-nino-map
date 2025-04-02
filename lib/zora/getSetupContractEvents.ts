import { SETUP_NEW_CONTRACT_EVENT_SIGNATURE, xcelencia_eth } from '@/lib/consts'
import { DuneDecodedEvent } from '@/types/dune'
import { zoraCreator1155FactoryImplAddress } from '@zoralabs/protocol-deployments'
import { mainnet } from 'viem/chains'

const getSetupContractEvents = async (): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: 'GET',
    headers: { 'X-Dune-Api-Key': process.env.DUNE_API_KEY as string },
  }
  const params: any = {
    decode: 'true',
    topic0: SETUP_NEW_CONTRACT_EVENT_SIGNATURE,
    to: zoraCreator1155FactoryImplAddress[mainnet.id],
  }

  const urlSearchParams = new URLSearchParams(params)

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${xcelencia_eth}?${urlSearchParams}`,
    options,
  )
  if (!response.ok) throw Error('failed to call Dune API.')

  const data = await response.json()
  const transactions: DuneDecodedEvent[] = data.transactions
  return transactions
}

export default getSetupContractEvents
