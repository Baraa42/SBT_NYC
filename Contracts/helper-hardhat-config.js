const { ethers } = require("hardhat")

const networkConfig = {
    4: {
        name: "rinkeby",
    },
    31337: {
        name: "hardhat",
    },
}

const developmentChains = ["hardhat", "localhost", "skale-test", "boba"]

module.exports = {
    networkConfig,
    developmentChains,
}
