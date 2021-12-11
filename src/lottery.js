import web3 from "./web3";

const address = "0x53887a2615E3b9E186c131ba65f33020e6D57E59";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "enter", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [],
    name: "getLastWinnder",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "jackpot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "pickWinner", outputs: [], stateMutability: "nonpayable", type: "function" },
];
export default new web3.eth.Contract(abi, address);
