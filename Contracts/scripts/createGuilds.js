const { ethers, network } = require("hardhat")

async function mint() {
    const guild = await ethers.getContract("Guild")
    const oracle = await ethers.getContract("TestOracle")
    const oracleAddress = oracle.address

    console.log("Creating guild...")
    accounts = await ethers.getSigners() // could also do with getNamedAccounts
    deployer = (await getNamedAccounts()).deployer
    user = accounts[1]
    const firstGuildDetails = {
        description: "This is my First guild",
        uri: "ipfs://QmPKDSGxdGaKEE2xF9MvQUkGeYqNJH6S8kXfu5fDBtVWW9",
        oracleContract: oracleAddress,
        rewardToken: "0x0000000000000000000000000000000000000000",
        rewardAmount: "0",
        totalRewardAmount: "0",
    }
    const createTx = await guild.createGuild("Guild", "GLD", firstGuildDetails)
    const createRx = await createTx.wait(1)
    console.log("First Guild created")
    const secondGuildDetails = {
        description: "This is my second guild",
        uri: "ipfs://QmPKDSGxdGaKEE2xF9MvQUkGeYqNJH6S8kXfu5fDBtVWW9",
        oracleContract: oracleAddress,
        rewardToken: "0x0000000000000000000000000000000000000000",
        rewardAmount: "0",
        totalRewardAmount: "0",
    }
    const createTx2 = await guild.createGuild(
        "Guild",
        "GLD",
        secondGuildDetails
    )
    const createRx2 = await createTx2.wait(1)
    console.log("Second Guild created")
    const thirdGuildDetails = {
        description: "This is my third guild",
        uri: "ipfs://QmPKDSGxdGaKEE2xF9MvQUkGeYqNJH6S8kXfu5fDBtVWW9",
        oracleContract: oracleAddress,
        rewardToken: "0x0000000000000000000000000000000000000000",
        rewardAmount: "0",
        totalRewardAmount: "0",
    }
    const createTx3 = await guild.createGuild(
        "Guild",
        "GLD",
        secondGuildDetails
    )
    const createRx3 = await createTx3.wait(1)
    console.log("Third Guild created")
    const guildCounter = await guild.guildCounter()
    console.log("guildCounter:", guildCounter.toString())
}

mint()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
