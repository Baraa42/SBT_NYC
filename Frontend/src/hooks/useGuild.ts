import { GuildForm, GuildItem } from "@/interfaces/guild";
import { guildTxFn } from "@/utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./useContract";
import { useToast } from "./useToast";
import { useWalletAccount } from "./useWalletAccount";
import abi from "@/hardhat/deployments/guild.json";
import { GUILD_ADDRESS } from "@/const";
import { ConnectWalletBtn } from "@/components/common/ConnectWalletBtn";
import { useSetConnectWalletModal } from "@/jotai";

export const useGuild = () => {
  const { account, chainId, library } = useWalletAccount();
  const { toastError } = useToast();
  const contracts = useContracts();
  const web3Context = useWeb3React();
  const runGuildTxFn = guildTxFn(web3Context, contracts);
  const [guilds, setGuilds] = useState<GuildItem[]>();

  useEffect(() => {
    getGuildList();
  }, [library]);

  const getGuildList = useCallback(async () => {
    try {
      const guild = new ethers.Contract(
        GUILD_ADDRESS,
        abi,
        library?.getSigner()
      );
      const num = await guild.guildCounter();
      const temp: GuildItem[] = [];
      for (let i = num; i > 0; i--) {
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

  const getGuild = useCallback(
    async (id: number): Promise<GuildItem | null> => {
      const signer = library?.getSigner();
      const guild = new ethers.Contract(GUILD_ADDRESS, abi, signer);
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
    },
    []
  );

  const createGuild = async (data: GuildForm) => {
    // validation
    if (!(account && chainId)) {
      await ConnectWalletBtn();
      return;
    }

    if (!contracts) {
      toastError("Not valid Network or something wrong");
      return;
    }

    const details = {
      description: data.description,
      uri: data.uri,
      oracleContract: data.oracleContract,
      rewardToken: data.rewardToken,
      rewardAmount: data.rewardAmount,
      totalRewardAmount: data.totalRewardAmount,
    };
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
