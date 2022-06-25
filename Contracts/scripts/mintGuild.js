const { ethers, network } = require("hardhat")

async function mint() {
    const guild = await ethers.getContract("Guild")

    console.log("Minting...")
    accounts = await ethers.getSigners() // could also do with getNamedAccounts
    deployer = (await getNamedAccounts()).deployer
    user = accounts[1]
    const mintTx = await guild.mint(user.address, 1, 1, "0x")
    const mintRx = await mintTx.wait(1)

    const balance = await guild.balanceOf(user.address, 1)
    console.log("balance:", balance.toString())

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
