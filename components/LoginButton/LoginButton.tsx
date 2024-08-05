import { useAccount } from 'wagmi'
import DisconnectButton from './DisconnectButton'
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet'

const LoginButton = () => {
  const { address } = useAccount()

  return <Wallet>{address ? <DisconnectButton /> : <ConnectWallet />}</Wallet>
}

export default LoginButton
