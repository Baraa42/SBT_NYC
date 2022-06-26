const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("---------------------------------")
    arguments = ["0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa"]
    const guild = await deploy("Guild", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("verifiying....")
        await verify(guild.address, arguments)
    }
}

module.exports.tags = ["all", "guild"]
