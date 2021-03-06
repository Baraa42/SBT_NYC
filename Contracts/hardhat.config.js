require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ""
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ""
const OPTIMISM_KOVAN_RPC_URL = process.env.OPTIMISM_KOVAN_RPC_URL || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const OPTIMISMSCAM_API_KEY = process.env.OPTIMISMSCAM_API_KEY || ""
const SKALE_RPC_URL = process.env.SKALE_RPC_URL || ""

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.4" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 6,
        },
        mumbai: {
            url: POLYGON_MUMBAI_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 80001,
            blockConfirmations: 6,
        },
        "optimistic-kovan": {
            url: OPTIMISM_KOVAN_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 69,
            blockConfirmations: 6, //https://hackathon.skalenodes.com/v1/hoarse-well-made-theemim
        },
        "skale-test": {
            url: SKALE_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: parseInt(0x1e783a2),
            blockConfirmations: 2, //
        },
        boba: {
            url: "https://rinkeby.boba.network/",
            chainId: 28,
            accounts: [PRIVATE_KEY],
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    etherscan: {
        apiKey: OPTIMISMSCAM_API_KEY, //POLYGONSCAN_API_KEY, //ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
