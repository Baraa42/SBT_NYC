import { useGuild } from "@/hooks/useGuild";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useSetConnectWalletModal } from "@/jotai";
import { FC, useEffect } from "react";
import { GuildCard } from "./parts/GuildCard";

export const ListContainer: FC = () => {
    const setModal = useSetConnectWalletModal();
    const { library } = useWalletAccount();
    const {guilds} = useGuild() 

    useEffect(() => {
        if(!library) {
            setModal(true)
        }
    },[library])

    return (
        <main className="h-screen overflow-y-auto max-w-screen-lg mx-auto text-lg">
            <div className="grid grid-cols-3 flex-wrap p-4 items-center overflow-auto w-full mx-auto">
                {guilds && guilds.map((g, index) => {
                    return (
                        <GuildCard key={index} item={g}/>
                    )
                })}           
            </div>
        </main>
    )
}