import { defaultAbiCoder as abi } from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/solidity";
import type { VerificationResponse } from "@worldcoin/id";
import worldID from "@worldcoin/id";
import React from "react";

const hashBytes = (input: string): string => {
  return abi.encode(
    ["uint256"],
    [BigInt(keccak256(["bytes"], [input])) >> BigInt(8)],
  );
};

export const WorldIDComponent = ({
  signal,
  setProof,
  actionId
}: {
  signal: string;
  setProof: (proof: VerificationResponse) => void;
  actionId: string
}): JSX.Element => {
  console.log("WorldIDComponent: ");
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
  React.useEffect(() => {
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

  if(typeof window == undefined) return <></>
  return <div id="world-id-container" />;
};
