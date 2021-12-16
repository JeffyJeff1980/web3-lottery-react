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
  const [lastWinner, setLastWinner] = useState("");

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
    getLastWinner();
  }, [message]);

  const simplifyAddress = (address) => {
    return `${address.substring(0, 5)}...${address.slice(-4)}`;
  };

  const getLastWinner = () => {
    lotteryContract.methods
      .getLastWinner()
      .call()
      .then((lastWinner) => setLastWinner(lastWinner));
  };

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

    getLastWinner();
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div className="container px-4">
          <a className="navbar-brand" href="#page-top">
            Lottery Dapp ({simplifyAddress(lotteryContract._address)})
          </a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#current">
                  Current Draw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#enter">
                  Enter Lottery
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="bg-primary bg-gradient text-white">
        <div className="container px-4 text-center">
          <h1 className="fw-bolder">Welcome to the Lottery Dapp!</h1>
          <p className="lead">A pseudo-random decentralized lottery on the Ethereum blockchain!</p>
        </div>
      </header>
      <section id="about">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2>Lottery Contract</h2>
              <p className="lead">
                This contract is managed by: <b>{simplifyAddress(manager)}</b>
              </p>
              <p className="lead">
                The last winner of the lottery was: <b>{simplifyAddress(lastWinner)}</b>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light" id="current">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2>Current Draw</h2>
              <p className="lead">
                There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, "ether")} ETH.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="enter">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2>Want to try your luck to win</h2>
              <form onSubmit={enterLottery}>
                <div>
                  <label>
                    Amount of ether to enter:{" "}
                    <input value={ticketValue} onChange={(event) => setTicketValue(event.target.value)} />
                    <button>Enter</button>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section id="pick">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h4>Ready to pick a winner?</h4>
              <button onClick={() => pickWinner()}>Pick a winner!</button>
            </div>
          </div>
        </div>
      </section>
      <section id="message">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">{message !== "" && <h1>{message}</h1>}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default App;
