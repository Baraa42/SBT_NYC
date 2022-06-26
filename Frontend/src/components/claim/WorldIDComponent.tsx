import { defaultAbiCoder as abi } from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/solidity";
import type { VerificationResponse } from "@worldcoin/id";
import worldID from "@worldcoin/id";
import { FC, useEffect } from "react";

const hashBytes = (input: string): string => {
  return abi.encode(
    ["uint256"],
    [BigInt(keccak256(["bytes"], [input])) >> BigInt(8)],
  );
};

export type WorldIDComponentProps = {
  signal: string
  setProof: (proof: VerificationResponse) => void
  actionId: string
}

export const WorldIDComponent:FC<WorldIDComponentProps> = ({signal, setProof, actionId}) => {

  const enableWorldID = async (): Promise<void> => {
    try {
      const result = await worldID.enable();
      setProof(result);
      console.log("World ID verified successfully: ", result);
    } catch (error) {
      console.error(error);
      enableWorldID().catch(console.error.bind(console));
    }
  };
  useEffect(() => {
    if(typeof window !== undefined){
      if (!worldID.isInitialized()) {
        worldID.init("world-id-container", {
          enable_telemetry: true,
          app_name: "Ethernifty",
          action_id: hashBytes(actionId),
          signal,
        });
      }
      if (!worldID.isEnabled()) {
        enableWorldID().catch(console.error.bind(console));
      }
    }
  }, []);

  return (
    <div id="world-id-container"></div>
  );
};
