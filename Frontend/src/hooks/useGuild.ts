import { GuildForm, GuildItem } from "@/interfaces/guild";
import { guildTxFn } from "@/utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useContracts, useReadOnlyContracts } from "./useContract";
import { useToast } from "./useToast";
import { useWalletAccount } from "./useWalletAccount";
import abi from "@/hardhat/deployments/guild.json";

export const useGuild = () => {
  const { account, chainId, library } = useWalletAccount();
  const { toastError } = useToast();
  const contracts = useContracts();
  const readOnlyContracts = useReadOnlyContracts();
  const web3Context = useWeb3React();
  const runGuildTxFn = guildTxFn(web3Context, contracts);
  const [guilds, setGuilds] = useState<GuildItem[]>();

  useEffect(() => {
    if (contracts) {
      getGuildList();
    }
  }, [contracts]);

  const getGuildList = useCallback(async () => {
    if (!contracts) {
      toastError("Not valid Network or something wrong");
      return;
    }

    try {
      const signer = library?.getSigner();
      const guild = new ethers.Contract(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        abi,
        signer
      );
      const num = await guild.guildCounter();
      const temp: GuildItem[] = [];
      for (let i = 0; i < num; i++) {
        const g = await guild.guilds(i);
        const reward = await guild.guildToRewardsLeft(i);
        const nft = await guild.guildIdToNFTAddress(i);
        temp.push({
          ...g,
          id: i,
          guildToRewardsLeft: reward,
          guildIdToNFTAddress: nft,
        });
      }
      setGuilds(temp);
    } catch (error) {
      console.log("Error:", error);
    }
  }, [contracts]);

  const getGuild = useCallback(async (id: number): Promise<GuildItem> => {
    const signer = library?.getSigner();
    const guild = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi,
      signer
    );
    const g = await guild.guilds(id);
    const reward = await guild.guildToRewardsLeft(id);
    const nft = await guild.guildIdToNFTAddress(id);
    const d: GuildItem = {
      ...g,
      id: id,
      guildToRewardsLeft: reward,
      guildIdToNFTAddress: nft,
    };
    return d;
  }, []);

  const createGuild = async (data: GuildForm) => {
    // validation
    if (!(account && chainId)) {
      toastError("Wallet Connection Error");
      return;
    }

    if (!contracts) {
      toastError("Not valid Network or something wrong");
      return;
    }

    const d = {};
    const details = {
      description: data.description,
      uri: data.uri,
      oracleContract: data.oracleContract,
      rewardToken: data.rewardToken,
      rewardAmount: data.rewardAmount,
      totalRewardAmount: data.totalRewardAmount,
    };
    console.log(details);
    const tx = await runGuildTxFn((g) =>
      g.createGuild(data.name, data.symbol, details)
    ).catch(async (error) => {
      console.log("error", error);
      toastError("transaction failed...");
      return;
    });

    if (!tx) {
      toastError("transaction failed...");
      return;
    }

    const receipt = await tx.wait();

    console.log("receipt", receipt);
    if (receipt.events && receipt.events.length > 0) {
      //listen events
      for (const event of receipt.events) {
        if (event?.event === "GuildCreated") {
          console.log("GuildCreated");
        }
      }
    }
    return receipt.transactionHash;
  };

  return { createGuild, getGuildList, getGuild, guilds };
};
