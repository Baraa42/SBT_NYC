import { GuildItem } from "@/interfaces/guild";
import { FC } from "react";
import { Card,Button } from "react-daisyui";
import { useRouter } from "next/router";
import { useSelectedGuild } from "@/jotai";

type GuildCardProps = {
    item: GuildItem
}
export const GuildCard:FC<GuildCardProps> = ({item}) => {

    const router = useRouter()
    const [_, setItem] = useSelectedGuild()
    
    const goToClaim = (id: number) => {
        setItem(item)
        router.push(`/claim/?id=${id}&nft=${item.guildIdToNFTAddress}`)
    }

    return (
        <Card className="bg-gray-100 w-auto h-fit mx-2 p-4">
            <Card.Image
            src={"/Image-2retouch.png"}
            alt="image"
            sizes="50%"
            />
            <Card.Body>
                <Card.Title tag="h2">{item.description}</Card.Title>
                <p>{`oracleContract: ${item.oracleContract}`}</p>
                <p>{`rewardToken: ${item.rewardToken}`}</p>
                <p>{`rewardAmount: ${item.rewardAmount}`}</p>
                <p>{`totalRewardAmount: ${item.totalRewardAmount}`}</p>
            </Card.Body>
            <Card.Actions className="justify-end">
                <Button type="button" className="text-white bg-primary" onClick={() => goToClaim(item.id)}>Claim</Button>
            </Card.Actions>
        </Card>
    )
}