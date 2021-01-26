import Web3 from "web3";
import contract from "../assets/static/build/contracts/PolarBetV4.json";
const contractAddress = "0xF7fb9dE8958BF79ee479D5AD8216ff91c1006142"; // Rinkeby
// const contractAddress = "0x3C21f4A120b1FEd1b9F5Fc6c076c2E40124a3d8B"; // Ganache

const contractABI = () => {
  const abi = contract.abi;
  return abi; 
}

const startWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else {
    window.alert("Metamask not detected!");
  }
};

const loadContract = async () => {
  return await new window.web3.eth.Contract(contractABI(), contractAddress);
};

export const LoadWeb3 = async () => {
  await startWeb3();
  window.contract = await loadContract();
};