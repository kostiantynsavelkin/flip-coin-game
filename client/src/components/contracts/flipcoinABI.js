const ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_vrfCoordinator', type: 'address' },
      { internalType: 'address', name: '_link', type: 'address' },
      { internalType: 'bytes32', name: '_keyHash', type: 'bytes32' },
      { internalType: 'uint256', name: '_fee', type: 'uint256' },
      { internalType: 'address', name: '_mmf', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'requestId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'betOwnerAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'betSide',
        type: 'uint16'
      }
    ],
    name: 'requestBetSignal',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_requestId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_randomness',
        type: 'uint256'
      },
      { indexed: false, internalType: 'bool', name: 'result', type: 'bool' },
      {
        indexed: false,
        internalType: 'address',
        name: 'betOwnerAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'betSide',
        type: 'uint16'
      }
    ],
    name: 'resultBetSignal',
    type: 'event'
  },
  {
    inputs: [],
    name: 'MMFAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'adminWallet1',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'adminWallet2',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'adminWallet3',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'betHistory',
    outputs: [
      { internalType: 'address', name: 'betAddress', type: 'address' },
      { internalType: 'uint256', name: 'betType', type: 'uint256' },
      { internalType: 'uint256', name: 'betAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'timeStamp', type: 'uint256' },
      { internalType: 'bool', name: 'betWonOrLoose', type: 'bool' },
      { internalType: 'uint16', name: 'betSide', type: 'uint16' },
      { internalType: 'bytes32', name: 'requestId', type: 'bytes32' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'betHistoryLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    name: 'betResultMap',
    outputs: [
      { internalType: 'address', name: 'betAddress', type: 'address' },
      { internalType: 'uint256', name: 'betType', type: 'uint256' },
      { internalType: 'uint256', name: 'betAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'timeStamp', type: 'uint256' },
      { internalType: 'bool', name: 'betWonOrLoose', type: 'bool' },
      { internalType: 'uint16', name: 'betSide', type: 'uint16' },
      { internalType: 'bytes32', name: 'requestId', type: 'bytes32' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'betResultMapLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_coinType', type: 'uint256' },
      { internalType: 'uint256', name: '_coinAmountIndex', type: 'uint256' },
      { internalType: 'uint16', name: '_flipBet', type: 'uint16' },
      { internalType: 'uint16', name: '_randomness', type: 'uint16' }
    ],
    name: 'betSimulation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    name: 'coinType',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'coinTypeLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getChainlinkToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_betAddress', type: 'address' },
      { internalType: 'uint256', name: '_betType', type: 'uint256' },
      { internalType: 'uint256', name: '_betAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_timeStamp', type: 'uint256' },
      { internalType: 'bool', name: '_betWonOrLoose', type: 'bool' },
      { internalType: 'bytes32', name: '_requestId', type: 'bytes32' },
      { internalType: 'uint16', name: '_beSide', type: 'uint16' },
      { internalType: 'uint256', name: '_index', type: 'uint256' },
      { internalType: 'uint16', name: '_mode', type: 'uint16' }
    ],
    name: 'manageBetHistory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_coinType', type: 'uint256' },
      { internalType: 'uint256', name: '_index', type: 'uint256' },
      { internalType: 'uint256', name: '_coinAmount', type: 'uint256' },
      { internalType: 'uint16', name: '_mode', type: 'uint16' }
    ],
    name: 'manageCoinType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'requestId', type: 'bytes32' },
      { internalType: 'uint256', name: 'randomness', type: 'uint256' }
    ],
    name: 'rawFulfillRandomness',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'receiveBNB',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_coinType', type: 'uint256' },
      { internalType: 'uint256', name: '_coinAmountIndex', type: 'uint256' },
      { internalType: 'uint16', name: '_flipBet', type: 'uint16' }
    ],
    name: 'requestFlipCoin',
    outputs: [{ internalType: 'bytes32', name: 'requestId', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_adm1', type: 'address' },
      { internalType: 'address', name: '_adm2', type: 'address' },
      { internalType: 'address', name: '_adm3', type: 'address' }
    ],
    name: 'setAdminWallets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_mmf', type: 'address' }],
    name: 'setMMFAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'withdrawLINK',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'withdrawMMF',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'withdrawMatic',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
export default ABI;
