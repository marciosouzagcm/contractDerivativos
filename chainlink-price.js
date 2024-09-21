// Importa a biblioteca Web3
//web3.js
const Web3 = require('web3');

// Conecta ao provedor Infura (ou qualquer outro RPC)
//const web3 = new Web3('https://sepolia.infura.io/v3/44189569f54c43d6adee7fbdaf9cdebf');

// ABI da Chainlink AggregatorV3Interface para interagir com o feed de preço
const aggregatorV3InterfaceABI = [
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      {"internalType": "uint80", "name": "roundId", "type": "uint80"},
      {"internalType": "int256", "name": "answer", "type": "int256"},
      {"internalType": "uint256", "name": "startedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"},
      {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Endereço do contrato do feed de preço ETH/USD na Sepolia
const priceFeedAddress = '0x694AA1769357215DE4FAC081bf1f309aDC325306';
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, priceFeedAddress);

// Função para obter o preço mais recente
async function getLatestPrice() {
  const roundData = await priceFeed.methods.latestRoundData().call();
  const price = roundData.answer;
  
  // Considerando que o preço tem 8 decimais
  console.log("Último preço do feed (ETH/USD):", price / (10 ** 8), "USD");
}

const Web3 = require('web3');
const web3 = new Web3('https://sepolia.infura.io/v3/44189569f54c43d6adee7fbdaf9cdebf');  // Conecte ao provedor Infura

// Sua ABI vai aqui
const contractABI = [
  [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_optionId",
          "type": "uint256"
        }
      ],
      "name": "buyOption",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_optionId",
          "type": "uint256"
        }
      ],
      "name": "closeExpiredOption",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_strikePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiry",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_isCall",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_premium",
          "type": "uint256"
        }
      ],
      "name": "createOption",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_optionId",
          "type": "uint256"
        }
      ],
      "name": "exerciseOption",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_priceFeed",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_marketPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_strikePrice",
          "type": "uint256"
        }
      ],
      "name": "calculateExtrinsicValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_strikePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_volatility",
          "type": "uint256"
        }
      ],
      "name": "calculateOptionPremium",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLatestPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "optionCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "options",
      "outputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "strikePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "premium",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isCall",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "exercised",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "collateral",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
];

// Endereço do contrato na blockchain
const contractAddress = '0x0813d4a158d06784FDB48323344896B2B1aa0F85';

// Cria uma instância do contrato usando a ABI e o endereço
const myContract = new web3.eth.Contract(contractABI, contractAddress);

// Exemplo de como chamar uma função do contrato
async function getSomeData() {
  const data = await myContract.methods.nomeDaFuncao().call();
  console.log("Dados do contrato:", data);
}
// Executa a função
getLatestPrice();
