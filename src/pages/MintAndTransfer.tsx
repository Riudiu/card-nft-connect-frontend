import { constants } from "../components/constants";
import { ethers, Contract, utils } from "ethers";
import UnemployedCardNFTFactoryABI from "../abi/UnemployedCardNFTFactory.json";
import { useState } from "react";

const abi = UnemployedCardNFTFactoryABI.abi; //SimpleCardNFTFactoryABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져옵니다.
interface MintTranProps {
  account: string;
  setAccount: (account: string) => void;
}

export const MintAndTransfer = ({ account, setAccount }: MintTranProps) => {
  //여러 개의 상태 변수를 선언하여 사용자 입력을 관리합니다
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [favoriteSport, setFavoriteSport] = useState("");
  const [instagramID, setInstagramID] = useState("");
  const [githubID, setGithubID] = useState("");
  const [twitterID, setTwitterID] = useState("");
  const [transferTo, setTransferTo] = useState("");

  //ethers.js 라이브러리를 사용하여 이더리움과 연결합니다.
  //// signer는 거래에 서명할 수 있는 객체입니다.
  //// provider는 이더리움 노드에 연결하는 객체입니다.
  //// simpleCardNFTFactory는 스마트 컨트랙트와 상호작용할 수 있는 객체입니다.
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const provider = new ethers.providers.JsonRpcProvider(
    constants.SeopoliaRPCUrl
  );
  let UnemployedCardNFTFactory = new ethers.Contract(
    constants.ContractAddress,
    abi,
    provider
  );
  UnemployedCardNFTFactory = UnemployedCardNFTFactory.connect(signer);

  //Register, Mint, TransferTo 함수를 정의하여 스마트 컨트랙트와 상호작용합니다.
  const Register = async () => {
    const tx = await UnemployedCardNFTFactory.registerUnemployedCardInfo(
      name,
      birth,
      email,
      phone,
      hobby,
      favoriteMovie,
      favoriteSport,
      instagramID,
      githubID,
      twitterID
    );
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  const Mint = async () => {
    const tx = await UnemployedCardNFTFactory.mintUnemployedCardNFT({
      value: utils.parseEther("0.01"),
    });
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  const TransferTo = async () => {
    const tx = await UnemployedCardNFTFactory.transferUnemployedCardNFT(
      transferTo
    );
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  //사용자 입력을 받고, 버튼을 클릭하면 상태를 업데이트하거나 이더리움 트랜잭션을 발생시킵니다.
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
        />
        <input
          type="text"
          placeholder="FavoriteMovie"
          value={favoriteMovie}
          onChange={(e) => setFavoriteMovie(e.target.value)}
        />
        <input
          type="text"
          placeholder="FavoriteSport"
          value={favoriteSport}
          onChange={(e) => setFavoriteSport(e.target.value)}
        />
        <input
          type="text"
          placeholder="InstagramID"
          value={instagramID}
          onChange={(e) => setInstagramID(e.target.value)}
        />
        <input
          type="text"
          placeholder="GithubID"
          value={githubID}
          onChange={(e) => setGithubID(e.target.value)}
        />
        <input
          type="text"
          placeholder="TwitterID"
          value={twitterID}
          onChange={(e) => setTwitterID(e.target.value)}
        />
        <button onClick={() => Register()}>Register My Info</button>
      </div>
      <div>
        <button onClick={() => Mint()}>Mint</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Transfer to"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <button onClick={() => TransferTo()}>Transfer</button>
      </div>
    </>
  );
};
/*
    input example :
    "Jiwoo Yun",
    "2001.05.14",
    "lacvert13@gmail.com",
    "010-1234-5678",
    "Reading books, Watching movies",
    "TopGun, Titanic, Fast & Furious",
    "FootBall",
    "riudiux",
    "Riudiu",
    "riudiux"
*/
