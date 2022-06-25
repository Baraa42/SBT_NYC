import * as ethers from "ethers";
import deploymentInfo from "@/hardhat/deployments/deploymentInfo.json";
import {
  Guild,
  Guild__factory,
  Soulbound,
  Soulbound__factory,
} from "@/hardhat/typechain";

export type NetworkId = 4 | 31337;

type SignerOrProvider = ethers.providers.Provider | ethers.ethers.Signer;

export class Contracts {
  guild: Guild;
  soulbound: Soulbound;

  networkId: NetworkId;

  constructor(
    contracts: {
      guild: Guild;
      soulbound: Soulbound;
    },
    networkId: NetworkId
  ) {
    this.guild = contracts.guild;
    this.soulbound = contracts.soulbound;
    this.networkId = networkId;
  }

  connect(signer: ethers.Signer): void {
    this.guild = this.guild.connect(signer);
    this.soulbound = this.soulbound.connect(signer);
  }

  static fromNetwork(
    networkId: NetworkId,
    signerOrProvider: SignerOrProvider
  ): Contracts {
    return Contracts.fromAddresses(
      {
        guild: (deploymentInfo as any)[networkId].Guild.address,
        soulbound: (deploymentInfo as any)[networkId].Soulbound.address,
      },
      signerOrProvider,
      networkId
    );
  }

  static fromAddresses(
    addresses: {
      guild: string;
      soulbound: string;
    },
    signerOrProvider: SignerOrProvider,
    networkId: NetworkId
  ): Contracts {
    const guild = Guild__factory.connect(addresses.guild, signerOrProvider);
    const soulbound = Soulbound__factory.connect(
      addresses.guild,
      signerOrProvider
    );
    return new Contracts(
      {
        guild,
        soulbound,
      },
      networkId
    );
  }
}
