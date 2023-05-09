const ethers = require('ethers');

const generatePrivateKey = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};

const displayKeys = (privateKey, address) => {
  console.log(`Private Key: ${privateKey}`);
  console.log(`Wallet Address: ${address}`);
};

const main = () => {
  const { privateKey, address } = generatePrivateKey();
  displayKeys(privateKey, address);
};

main();