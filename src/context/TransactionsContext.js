import React, { useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { message } from "antd";

export const TransactionsContext = React.createContext(null);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export function TransactionsProvider({ children }) {
  const [currentAccount, setCurrentAccount] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [transactionCount, setTransactionCount] = React.useState(0);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        message.info("Please connect your wallet");
      } else {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No accounts found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      message.success("Account connected");
    } catch (error) {
      console.log(error);
      throw new Error("Error connecting to wallet");
    }
  };

  const sendTransaction = async ({ addressTo, amount, message, keyboard }) => {
    const transactionContract = getEthereumContract();
    console.log(addressTo, amount, message, keyboard);
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const parseAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parseAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addtoBlockchain(
        addressTo,
        parseAmount,
        message,
        keyboard
      );
      setLoading(true);
      await transactionHash.wait();

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw new Error("Error sending transaction");
    }
  };

  return (
    <TransactionsContext.Provider
      value={{ connectWallet, currentAccount, sendTransaction, loading }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
