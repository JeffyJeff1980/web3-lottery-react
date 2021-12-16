import web3 from "./web3";

const address = "0x5d9e27AdDE53bC4d4920Fb0b09778c5981338E59";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "enter", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [],
    name: "getLastWinner",
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
