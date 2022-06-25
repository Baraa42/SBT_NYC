const { ethers, network } = require("hardhat")

async function mint() {
    const guild = await ethers.getContract("Guild")

    console.log("Creating guild...")
    accounts = await ethers.getSigners() // could also do with getNamedAccounts
    deployer = (await getNamedAccounts()).deployer
    user = accounts[1]
    const guildDetails = {
        description: "This is my guild",
        uri: "ipfs://QmPKDSGxdGaKEE2xF9MvQUkGeYqNJH6S8kXfu5fDBtVWW9",
        oracleContract: "0x6CAc6323c14C14c71bF5babd1328279153e049a6",
        rewardToken: "0x0000000000000000000000000000000000000000",
        rewardAmount: "0",
        totalRewardAmount: "0",
    }
    const createTx = await guild.createGuild("Guild", "GLD", guildDetails)
    const createRx = await createTx.wait(1)

    const guildCounter = await guild.guildCounter()
    console.log("guildCounter:", guildCounter)

    // const transferTx = await soulbound
    //     .connect(user)
    //     .transferFrom(
    //         user.address,
    //         "0x6CAc6323c14C14c71bF5babd1328279153e049a6",
    //         0
    //     )
    // const transferRx = await transferTx.wait(1)
    // console.log(transferRx)
}

mint()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
