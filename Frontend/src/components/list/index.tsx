import { useGuild } from "@/hooks/useGuild";
import { FC } from "react";
import { GuildCard } from "./parts/GuildCard";

export const ListContainer: FC = () => {

    const {guilds} = useGuild() 


    return (
        <main className="h-screen overflow-hidden max-w-screen-lg mx-auto text-lg">
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