import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ethers} from "ethers"
import {Button} from "react-daisyui"
import { defaultAbiCoder as abi } from "@ethersproject/abi";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import type { VerificationResponse } from "@worldcoin/id";
import { ConnectWalletBtn } from "../common/ConnectWalletBtn";
import { WorldIDComponent } from "./WorldIDComponent";
import guildAbi from "@/hardhat/deployments/guild.json";
import { GUILD_ADDRESS } from "@/const";

export const ClaimContainer: FC = () => {
    const router = useRouter()
    const id = router.query.id as string
    const nft = router.query.nft as string

    const {account, library} = useWalletAccount()
    const [worldIDProof, setWorldIDProof] = useState<VerificationResponse | null>(null);
    const [txHash, setTxHash] = useState<string>("");

      const claimAction = async () => {
        if (!(worldIDProof && account && library)) {
          throw "World ID proof is missing.";
        }
    
        const guildContract = new ethers.Contract(
            GUILD_ADDRESS,
            guildAbi,
          library.getSigner(),
        );
    
        // eslint-disable-next-line
        const claimResult = await guildContract.claim(
          account,
          id,
          worldIDProof.merkle_root,
          worldIDProof.nullifier_hash,
          abi.decode(["uint256[8]"], worldIDProof.proof)[0],
          { gasLimit: 10000000 },
        );
        setTxHash((claimResult as Record<string, string>).hash);
        console.log("SBT claimed successfully!", claimResult);
      };

      const claim = async () => {
    
        try {
          await claimAction();
        } catch (error) {
          console.error("Error executing transaction:", error);
        }
      };


    return (
        <main className="h-screen overflow-hidden max-w-screen-lg mx-auto text-lg space-y-6" >
            <div className="w-full flex items-center justify-center">
                {!account && (
                    <ConnectWalletBtn />
                )}
            </div>
            <div className="w-full flex items-center justify-center">
            {account && (
                  <>   
                    <WorldIDComponent
                        signal={account}
                        actionId={nft}
                        setProof={(proof) => setWorldIDProof(proof)}
                    />
                  </>
                )}
                </div>
                <div className="w-full flex items-center justify-center">
                {account && (
                    <>   
                      <Button
                          type="button"
                          className="w-1/2 text-white bg-primary"
                          disabled={!worldIDProof}
                          onClick={claim}
                          >
                          Claim
                      </Button>
                    </>
                  )}
                </div>
        </main>
    )
}