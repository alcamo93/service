module.exports = {
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(supervisor, 'https://ropsten.infura.io/v3/3fd7c8337c8142f8b3c6b0c0dfa1c565'),
      network_id: 3,
      gas: 5000000,
      skipDryRun: true,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200
    },
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*'
    }
  }
};
