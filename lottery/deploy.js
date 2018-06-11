const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'before online turn repeat promote host inside angle neutral pizza pulse field',
  'https://rinkeby.infura.io/x8AeUO4VTngtrhoqFw8A '
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('deploy attempt', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: '0x' + bytecode
    })
    .send({
      //      gas: '1500000',
      gasPrice: '20000000',
      from: accounts[0]
    })
    .catch(err => {
      console.log(err);
    });
  console.log(interface);
  console.log('Contract deployed to , ', result.options.address);
};
deploy();
