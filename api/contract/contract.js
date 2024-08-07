const {Web3} = require('web3');
const ABI = require('../ABI.json');

// Connect to the local Hardhat network
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Replace with your deployed contract address
const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

// Create a contract instance
const contract = new web3.eth.Contract(ABI, contractAddress);

// Override web3.eth.call to log request payload
const originalCall = web3.eth.call.bind(web3.eth);

web3.eth.call = async (payload, block) => {
  const requestPayload = {
    jsonrpc: '2.0',
    id: Date.now(), // Unique ID for each request
    method: 'eth_call',
    params: [payload, block]
  };

  console.log('Request Payload:', JSON.stringify(requestPayload, null, 2));

  try {
    const response = await originalCall(payload, block);
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error Response:', error);
    throw error;
  }
};

// Use the contract instance to interact with the smart contract
contract.methods.studentCount().call()
  .then((result) => {
    console.log('Student Count:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

module.exports = { contract };
