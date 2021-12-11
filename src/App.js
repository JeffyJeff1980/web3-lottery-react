import "./App.css";
import React, { useEffect, useState } from "react";
import lotteryContract from "./lottery";
import web3 from "./web3";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [ticketValue, setTicketValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDataAsync = async () => {
      await lotteryContract.methods
        .getManager()
        .call()
        .then((manager) => setManager(manager));
      await lotteryContract.methods
        .getPlayers()
        .call()
        .then((players) => setPlayers(players));
      await web3.eth.getBalance(lotteryContract.options.address).then((balance) => setBalance(balance));
    };

    fetchDataAsync();
  }, [message]);

  const enterLottery = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");

    await lotteryContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ticketValue, "ether"),
    });

    setMessage("You have been entered the lottery!");
  };

  const pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");

    await lotteryContract.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage("A winner has been picked!");
  };

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, "ether")} ETH.
      </p>

      <hr />
      <form onSubmit={enterLottery}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={ticketValue} onChange={(event) => setTicketValue(event.target.value)} />
        </div>
        <button>Enter</button>
      </form>

      <h4>Ready to pick a winner?</h4>
      <button onClick={() => pickWinner()}>Pick a winner!</button>

      <hr />

      {message !== "" && <h1>{message}</h1>}
    </div>
  );
};
export default App;
