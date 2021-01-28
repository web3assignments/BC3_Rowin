import React, { useEffect, useState } from "react";
import { AddBet } from "../components/AddBet";
import { DealerBalance } from "../components/DealerBalance";
import { DealerDiceResult } from "../components/DealerDiceResult";
import { PayOut } from "../components/PayOut";
import { SetUserDiceResult, UserDiceResult } from "../components/PlayerDiceResult";
import { QueryId } from "../components/QueryId";
import { RollDice } from "../components/RollDice";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
    contract: any;
    IpfsHttpClient: any;
  }
}

export const Home = () => {
  const [balance, setBalance] = useState<number>(0);
  const [bet, setBet] = useState<number>(0);
  const [dealerResult, setDealerResult] = useState<number>(0);
  const [userResult, setUserResult] = useState<number>(0);
  const [queryId, setQueryId] = useState<string>();

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const newBalance = await DealerBalance();
    setBalance(newBalance);
  };

  const getDealerDiceResult = async () => {
    const diceResult = await DealerDiceResult();
    setDealerResult(diceResult);
  };

  const getUserDiceResult = async () => {
    const diceResult = await UserDiceResult();
    setUserResult(diceResult);
  };

  const setsUserDiceResult = async () => {
    await SetUserDiceResult();
    console.log("Your dice result is set")
  };

  const getQueryId = async () => {
    const id = await QueryId();
    console.log(id);
    setQueryId(id);
  };

  

  return (
    <main className="App">
      <h2>Dealer balance = {balance}</h2>
      <button onClick={() => getBalance()}>
          update balance
        </button>

      <div>
        <h2>Set your bet:</h2>
        <input
          type="number"
          onChange={(e) => setBet(parseInt(e.target.value))}
        />
        <button onClick={() => AddBet(bet)}>add bet</button>
      </div>

      <div>
        <button onClick={() => RollDice()}>roll dice</button>
        <p>Dealer dice result = {dealerResult}</p>
        <button onClick={() => getDealerDiceResult()}>
          show the dealer dice result
        </button>
        <p>Your dice result = {userResult}</p>
        <button onClick={() => setsUserDiceResult()}>
          get your dice result
        </button>
        <button onClick={() => getUserDiceResult()}>
          show your dice result
        </button>
        <p>Query ID = {queryId}</p>
        <button onClick={() => getQueryId()}>show query id</button>
      </div>

      <button onClick={() => PayOut()}>pay out</button>

    </main>
  );
};
