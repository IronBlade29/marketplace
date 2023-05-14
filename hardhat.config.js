/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString().trim() || "b92c60ae9f7462e7f83891c361c750345887d0052875611007e5ac67ce28a7de"
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "2PXxtzj39ITaKhg0aoq04Dae0sm"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    /*
    mumbai:{
      url: `https://polygon-mumbai.infura.io/v3/${projectID}`,
      accounts: [privateKey]
    },
    mainnet:{
      url:`https://polygon-mainnet.infura.io/v3/${projectID}`,
      accounts: [privateKey]
    }
    */
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
