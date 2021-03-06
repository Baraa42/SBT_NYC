import { useGuild } from "@/hooks/useGuild";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { GuildForm } from "@/interfaces/guild";
import { useSetConnectWalletModal } from "@/jotai";
import { FC } from "react";
import { Card,Button } from "react-daisyui";
import { useForm } from "react-hook-form";

export const CreateContainer: FC = () => {

    const {createGuild} = useGuild()
    const {account} = useWalletAccount()
    const setShow = useSetConnectWalletModal()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuildForm>();

    const onClickSubmit = async (data:any) => {
        if (!account) {
            setShow(true)
          }
        if(!data) return
        createGuild(data)
    }

    return (
        <main className="h-screen overflow-y-auto max-w-screen-lg mx-auto text-lg">
            <h1 className="text-3xl py-4">Create New Guild</h1>
            <form
                className="w-full h-full"
                onSubmit={handleSubmit(onClickSubmit)}
            >
                <div>
                    {/* name */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        SBT Name
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.name?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2 "
                        
                        {...register("name")}
                        />
                    </div>
                    {/* uri */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Uri
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.symbol?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("uri")}
                        />
                    </div>
                    {/* symbol */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Symbol
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.symbol?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("symbol")}
                        />
                    </div>
                    {/* description */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Description
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.description?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <textarea
                         rows={5}
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("description")}
                        />
                    </div>
                    {/* oracleContract */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Oracle Contract
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.oracleContract?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("oracleContract")}
                        />
                    </div>
                    {/* rewardToken */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Reward Token
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.rewardToken?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("rewardToken")}
                        />
                    </div>
                    {/* rewardAmount */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Reward Amount
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.rewardAmount?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("rewardAmount")}
                        />
                    </div>
                    {/* totalRewardAmount */}
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Total Reward Amount
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.totalRewardAmount?.message}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-2 py-1 px-6 rounded-lg text-sm md:text-lg bg-form border-neutral hover:border-neutral appearance-none border-2"
                        
                        {...register("totalRewardAmount")}
                        />
                    </div>
                </div>
                <Card.Actions className="justify-end">
                <Button type="submit" className="text-white bg-WHITE"><span className="text-red-600">S</span><span className="text-amber-500">U</span><span className="text-yellow-300">B</span><span className="text-green-500">M</span><span className="text-blue-500">I</span><span className="text-violet-600">T</span> </Button>
                </Card.Actions>
            </form>
        </main>
    )
}