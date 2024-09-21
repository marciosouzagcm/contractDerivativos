const Web3 = require('web3');
const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/XU4nMyk-sozbo93SGpUFhnY78MHzcCft');

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