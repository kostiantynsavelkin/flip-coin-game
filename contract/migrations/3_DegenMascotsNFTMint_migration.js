const DegenMascotsNFTMint = artifacts.require("DegenMascotsNFTMint");

/**
 *
 * Network: Mumbai network
 * _baseURIParam: ipfs://QmQorkhjmnUYn2sKNJDasqY8JXgGdzRwvvqAqFTAMuhZyZ/
 * @param _baseURIParam IPFS link
 */

module.exports = function (deployer) {
  deployer.deploy(
    DegenMascotsNFTMint,
    "ipfs://QmQorkhjmnUYn2sKNJDasqY8JXgGdzRwvvqAqFTAMuhZyZ/"
  );
};
