"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from "dotenv";
import { useState } from "react";

dotenv.config();

export default function Home() {
  const wallet = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || "");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState<number | null>(null);

const handleClick = async () => {
  try {
    await connection.requestAirdrop(wallet.publicKey!, amount*LAMPORTS_PER_SOL);
    console.log("Airdrop requested");
  const newBalance = await connection.getBalance(wallet.publicKey!);
  setBalance(newBalance / LAMPORTS_PER_SOL);}
  catch (error) {
    console.log(error);
  }
}
const checkBalance = async () => {
  if (!wallet.publicKey) {
    alert("Please connect your wallet first");
    return;
  }

  const balance = await connection.getBalance(wallet.publicKey!);
  setBalance(balance / LAMPORTS_PER_SOL);
};

  return (<div className="bg-black">
    <WalletMultiButton />
    <br />
            <Label htmlFor="a">enter Amount of SOL to request</Label>
            <Input type="text" placeholder="Enter amount" onChange={(e) => setAmount(parseInt(e.target.value))} />
            <button 
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"onClick={handleClick}>Airdrop</button>
          
    
    <p>Balance: {balance}</p>
    <button 
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"onClick={checkBalance}>Check Balance</button>
  </div>
)
}