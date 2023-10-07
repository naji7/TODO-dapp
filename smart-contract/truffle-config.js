const path = require("path");

module.exports = {
  contract_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // develop: {
    //   host: "127.0.0.1",
    //   port: 7688,
    //   network_id: "*",
    // },

    develop: {
      host: "localhost",
      port: 7688,
      network_id: "5777",
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
