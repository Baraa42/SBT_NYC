import { useGuild } from "@/hooks/useGuild";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { GuildCard } from "../list/parts/GuildCard";
import worldID from "@worldcoin/id";
import { useSelectedGuild } from "@/jotai";

export const ClaimContainer: FC = () => {
    const [selectedItem, setItem] = useSelectedGuild()
    const router = useRouter()
    const id = router.query.id as string
    const {getGuild} = useGuild() 

    useEffect(() => {
        if(!worldID.isInitialized()){
            worldID.init("world-id-container", {
                enable_telemetry: true,
                action_id: "wid_staging_81594091ab77fbb9f1fcb2fca1757d85", // NFT address of guildIf
                signal: "my-user-id-1", // user address
                app_name: "My App", // Ethernifty
                signal_description: "Receive a super cool airdrop!", // completer mission id=guildId
              });
        }
        document.addEventListener("DOMContentLoaded", async function () {
            try {
              const result = await worldID.enable();
              console.log("World ID verified successfully:", result);
            } catch (failure) {
              console.warn("World ID verification failed:", failure);
              // Re-activate here so your end user can try again
            }
          });
    },[])


    return (
        <main className="h-screen overflow-hidden max-w-screen-lg mx-auto text-lg" >
            <div className="w-full flex items-center justify-center" id={"world-id-container"}>
                {/* <GuildCard item={selectedItem} />        */}
            </div>
        </main>
    )
}