const { ethers, network } = require("hardhat")

async function mint() {
    const soulbound = await ethers.getContract("Soulbound")

    console.log("Minting...")
    const mintTx = await soulbound.mint()
    const mintRx = await mintTx.wait(1)
    const tokenId = mintRx.events[0].args.tokenId
    console.log("tokenId:", tokenId.toString())
}

mint()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
