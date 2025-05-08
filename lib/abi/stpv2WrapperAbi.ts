export const stpv2WrapperAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'swapFactory',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapRouter',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'quoterV2',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'uint24',
            name: 'fee',
            type: 'uint24',
          },
        ],
        internalType: 'struct HypersubCrossmintAdapter.SwapData',
        name: 'swapData',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'subscription',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'tierId',
        type: 'uint16',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]
