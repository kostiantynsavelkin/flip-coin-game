// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721r.sol";

contract DegenMascotsNFTMint is Ownable, ERC721r {
    using Address for address;

    // @notice total minted NFT number
    string public baseURI;

    // @notice total minted NFT number
    uint256 public nftPrice;

    /**
     * uint256 wallet address
     * uint256 the count which minted the nft from now.
     */
    mapping(address => uint256) public mintedCountMap;

    /**
     * uint256 whitelist primary index
     * uint256 whitelist wallet address
     */
    mapping(uint256 => address) public whitelistMap;

    // @notice whitelist length
    uint256 public whitelistMapLength;

    // @notice discount pros
    uint256 public discount;

    event mintDegenMascots(uint256 indexed nftId, address indexed owner);

    /**
     * @notice Constructor inherits DegenMascotsNFTMint
     * @param _baseURIParam ERC721 token baseURI
     */
    constructor(string memory _baseURIParam)
        ERC721r("Degen Mascots", "DGBM", 2000)
    {
        baseURI = _baseURIParam;
        nftPrice = 100 * 10**18;
        discount = 85;
        whitelistMapLength = 0;
    }

    /**
     * @dev Mint DegenMascots.
     * @param _mintNum the amount which mint per once
     */
    function MintDegenMascotsNft(uint256 _mintNum) external payable {
        require(_mintNum <= 5 && _mintNum >= 1, "mintNum err");
        require(mintedCountMap[msg.sender] + _mintNum <= 20, "too many minted");

        uint256 paidAmount = nftPrice * _mintNum;
        for (uint256 i = 0; i < whitelistMapLength; i++) {
            if (msg.sender == whitelistMap[i]) {
                paidAmount = (paidAmount * discount) / 100;
            }
        }
        require(msg.value >= paidAmount, "Not enough MATIC");

        _mintRandom(msg.sender, _mintNum);
    }

    /**
     * @dev Mint DegenMascots.
     */
    function MintDegenMascotsNftByOwner(address _buyer, uint256 _qty)
        external
        onlyOwner
    {
        require(_buyer != address(0), "buyer param err");
        require(_qty > 0, "_qty param err");
        _mintRandom(_buyer, _qty);
    }

    function checkWhiteList(address _addr) external view returns (uint256) {
        for (uint256 i = 0; i < whitelistMapLength; i++) {
            if (_addr == whitelistMap[i]) {
                return 1;
            }
        }
        return 0;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist.");
        return
            string(
                abi.encodePacked(
                    string(
                        abi.encodePacked(baseURI, Strings.toString(tokenId))
                    ),
                    ".json"
                )
            );
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev set baseURI for primary ipfs path
     * @param _baseURIParam new baseURI
     */
    function setBaseURI(string memory _baseURIParam) external onlyOwner {
        baseURI = _baseURIParam;
    }

    /**
     * @dev set new mintable NFT number
     * @param _newNftPrice new mintable NFT number
     */
    function setNewNftPrice(uint256 _newNftPrice) external onlyOwner {
        nftPrice = _newNftPrice;
    }

    /**
     * @notice set discount value
     * @param _discount discount value
     */
    function setDiscount(uint256 _discount) external onlyOwner {
        discount = _discount;
    }

    /**
     * @notice add, update, remove whitelistMap.
     * @param _whitelistAddr whitelist address
     * @param _index the number which will operate
     * @param _mode 0: add 1: update 2: remove
     */
    function manageWhiteList(
        address _whitelistAddr,
        uint256 _index,
        uint16 _mode
    ) external onlyOwner {
        if (_mode == 0) {
            whitelistMap[whitelistMapLength++] = _whitelistAddr;
        } else if (_mode == 1) {
            require(_index < whitelistMapLength, "_index is not valid");
            whitelistMap[_index] = _whitelistAddr;
        } else if (_mode == 2) {
            require(_index < whitelistMapLength, "_index is not valid");
            for (uint256 i = _index; i < whitelistMapLength; i++) {
                whitelistMap[i] = whitelistMap[i + 1];
            }
            whitelistMapLength--;
        }
    }

    function addWhiteList(address[] calldata accounts) public onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            whitelistMap[whitelistMapLength++] = accounts[i];
        }
    }

    /// @notice withdraw the bnb of the amount (uint256 amount)
    function withdraw() external onlyOwner {
        payable(address(uint160(msg.sender))).transfer(address(this).balance);
    }
}
