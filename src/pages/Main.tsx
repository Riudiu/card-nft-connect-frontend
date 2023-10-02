import { useState } from "react";
import { Wallet } from "../components/Wallet";
import { MintAndTransfer } from "./MintAndTransfer";

export const Main = () => {
  const [account, setAccount] = useState("");
  return (
    <div>
      <Wallet account={account} setAccount={setAccount}></Wallet>
      <MintAndTransfer
        account={account}
        setAccount={setAccount}
      ></MintAndTransfer>
    </div>
  );
};
