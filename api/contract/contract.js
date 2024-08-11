const {Web3} = require('web3');
const ABI = require('../ABI.json'); // Path to your ABI JSON file

// Connect to the local Hardhat network
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Replace with your deployed contract address
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Create a contract instance
const contract = new web3.eth.Contract(ABI, contractAddress);

async function getStudentCount() {
  try {
    const count = await contract.methods.studentCount().call();
    console.log('Student Count:', count);
  } catch (error) {
    console.error('Error getting student count:', error);
  }
}

getStudentCount();


module.exports = { contract };
