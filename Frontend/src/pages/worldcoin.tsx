import React, { useLayoutEffect } from "react";
import type { NextPage } from "next";
import worldID from "@worldcoin/id";

const WorldCoin: NextPage = () => {
  useLayoutEffect(() => {
    if (!worldID.isInitialized()) {
      worldID.init("world-id-container", {
        enable_telemetry: true,
        action_id: "wid_staging_316bfec176093f7b7291e8f45e77bb8e",
        signal: "",
      });
    }

    if (!worldID.isEnabled()) {
      worldID.enable().then((response) => console.log("success"));
    }
  }, []);

  return <div>hii</div>;
};
export default WorldCoin;
