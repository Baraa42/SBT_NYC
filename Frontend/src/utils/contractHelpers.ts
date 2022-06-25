import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { ContractTransaction } from "ethers";
import { Contracts } from "@/services/Contracts/Contract";
import { Guild, Soulbound } from "@/hardhat/typechain";

export const handleContractError = (e: any) => {
  if (e.code === 4001) {
    throw Error(`Transaction rejected by your wallet`);
  }
  console.log("e", JSON.stringify(e));
  throw Error(e);
};

export const guildTxFn =
  (web3Context: Web3ReactContextInterface, contracts: Contracts | undefined) =>
  async (callback: (guild: Guild) => Promise<ContractTransaction>) => {
    if (!contracts) {
      console.log("Error: Contracts not loaded");
      return;
    }
    const signer = await web3Context.library.getSigner();
    const guild = contracts.guild.connect(signer);
    return callback(guild).catch((e) => handleContractError(e));
  };

export const soulBoundTxFn =
  (web3Context: Web3ReactContextInterface, contracts: Contracts | undefined) =>
  async (callback: (soulbound: Soulbound) => Promise<ContractTransaction>) => {
    if (!contracts) {
      console.log("Error: Contracts not loaded");
      return;
    }
    const signer = await web3Context.library.getSigner();
    const soulbound = contracts.soulbound.connect(signer);
    return callback(soulbound).catch((e) => handleContractError(e));
  };
