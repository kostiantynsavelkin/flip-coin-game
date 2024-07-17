// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlipCoin is VRFConsumerBase, Ownable {
    using Address for address;

    bytes32 internal keyHash;
    uint256 internal fee;

    struct Bet {
        address betAddress;
        uint256 betType;
        uint256 betAmount;
        uint256 timeStamp;
        bool betWonOrLoose;
        uint16 betSide;
        bytes32 requestId;
    }

    struct RequestMeta {
        address addr;
        uint256 coinType;
        uint256 coinAmount;
        uint16 betSide;
    }

    // @notice Event emitted when chainlink verified random number arrived or requested.
    event requestBetSignal(
        bytes32 requestId,
        address betOwnerAddr,
        uint256 coinType,
        uint256 coinAmount,
        uint16 betSide
    );

    event resultBetSignal(
        bytes32 _requestId,
        uint256 _randomness,
        bool result,
        address betOwnerAddr,
        uint256 coinType,
        uint256 coinAmount,
        uint16 betSide
    );

    // @notice requestId confirm mapping
    mapping(bytes32 => RequestMeta) internal requestFlipConfirmList;

    /**
     * uint256 cointype: 0: matic 1: mmf
     * uint256 primary no
     * uint256 coin amount
     */
    mapping(uint256 => mapping(uint256 => uint256)) public coinType;

    /**
     * uint256 cointype: 0: matic 1: mmf
     * uint256 coinTypeLength
     */
    mapping(uint256 => uint256) public coinTypeLength;

    /**
     * uint256 primary no
     * uint256 Bet Info
     */
    mapping(uint256 => Bet) public betHistory;

    /**
     * uint256 betHistory Length
     */
    uint256 public betHistoryLength;

    /**
     * uint256 wallet address
     * uint256 requestID
     * uint256 index of betHistory
     */
    mapping(address => mapping(uint256 => Bet)) public betResultMap;

    mapping(address => uint256) public betResultMapLength;

    // Admin wallet 1 : 1.05
    address public adminWallet1;

    // Admin wallet 1 : 2
    address public adminWallet2;

    // Admin wallet 1 : 0.45
    address public adminWallet3;

    // MMF token address
    address public MMFAddress;

    address private ownerAddress;

    /**
     * @notice Constructor inherits VRFConsumerBase
     * @param _vrfCoordinator Chainlink VRF Coordinator address
     * @param _link LINK token address
     * @param _keyHash Key Hash
     * @param _fee LINK token fee amount
     * @param _mmf MMF token address
     */
    constructor(
        address _vrfCoordinator,
        address _link,
        bytes32 _keyHash,
        uint256 _fee,
        address _mmf
    ) VRFConsumerBase(_vrfCoordinator, _link) {
        keyHash = _keyHash;
        fee = _fee;
        betHistoryLength = 0;
        MMFAddress = _mmf;
        adminWallet1 = 0x0d126002EaB52840188dD7D1A5A81E4dE47Cf839;
        adminWallet2 = 0x30E9786c1584EA56586F2a7513681d01cc7C9012;
        adminWallet3 = 0xF50c96370F50E44A87a3b681A4cf047851c39a4a;
        ownerAddress = msg.sender;
    }

    /**
     * @dev Public function to request randomness and returns request Id.
     * @param _coinType bet type 0: MATIC, 1: MMF
     * @param _coinAmountIndex bet amount
     * @param _flipBet bet flip side
     */
    function requestFlipCoin(
        uint256 _coinType,
        uint256 _coinAmountIndex,
        uint16 _flipBet
    ) external payable returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        require(coinType[_coinType][_coinAmountIndex] != 0, "Param err");

        bytes32 _requestId = requestRandomness(keyHash, fee);
        requestFlipConfirmList[_requestId] = RequestMeta(
            msg.sender,
            _coinType,
            coinType[_coinType][_coinAmountIndex],
            _flipBet
        );

        if (_coinType == 0) {
            require(
                msg.value >= coinType[_coinType][_coinAmountIndex],
                "Not enough MATIC"
            );
        } else {
            IERC20(MMFAddress).transferFrom(
                msg.sender,
                address(this),
                coinType[_coinType][_coinAmountIndex]
            );
        }

        emit requestBetSignal(
            _requestId,
            msg.sender,
            _coinType,
            coinType[_coinType][_coinAmountIndex],
            _flipBet
        );
        return _requestId;
    }

    /**
     * @dev Callback function used by VRF Coordinator. This function calls the play method of current game contract with random number.
     * @param _requestId Request Id
     * @param _randomness Random Number
     */
    function fulfillRandomness(bytes32 _requestId, uint256 _randomness)
        internal
        override
    {
        require(
            requestFlipConfirmList[_requestId].addr != address(0),
            "not reserved request"
        );

        betHistory[betHistoryLength++] = Bet(
            requestFlipConfirmList[_requestId].addr,
            requestFlipConfirmList[_requestId].coinType,
            requestFlipConfirmList[_requestId].coinAmount,
            block.timestamp,
            _randomness % 2 == requestFlipConfirmList[_requestId].betSide
                ? true
                : false,
            requestFlipConfirmList[_requestId].betSide,
            _requestId
        );

        if (_randomness % 2 == requestFlipConfirmList[_requestId].betSide) {
            // Beter won.
            if (requestFlipConfirmList[_requestId].coinType == 0) {
                payable(
                    address(uint160(requestFlipConfirmList[_requestId].addr))
                ).transfer(
                        (requestFlipConfirmList[_requestId].coinAmount * 1965) /
                            1000
                    );
                payable(address(uint160(adminWallet1))).transfer(
                    (requestFlipConfirmList[_requestId].coinAmount * 15) / 1000
                );
                payable(address(uint160(adminWallet2))).transfer(
                    (requestFlipConfirmList[_requestId].coinAmount * 15) / 1000
                );
                payable(address(uint160(adminWallet3))).transfer(
                    (requestFlipConfirmList[_requestId].coinAmount * 5) / 1000
                );
            } else {
                IERC20(MMFAddress).transfer(
                    requestFlipConfirmList[_requestId].addr,
                    (requestFlipConfirmList[_requestId].coinAmount * 1965) /
                        1000
                );
                IERC20(MMFAddress).transfer(
                    adminWallet1,
                    (requestFlipConfirmList[_requestId].coinAmount * 15) / 1000
                );
                IERC20(MMFAddress).transfer(
                    adminWallet2,
                    (requestFlipConfirmList[_requestId].coinAmount * 15) / 1000
                );
                IERC20(MMFAddress).transfer(
                    adminWallet3,
                    (requestFlipConfirmList[_requestId].coinAmount * 5) / 1000
                );
            }
        }

        betResultMap[requestFlipConfirmList[_requestId].addr][
            betResultMapLength[requestFlipConfirmList[_requestId].addr]++
        ] = Bet(
            requestFlipConfirmList[_requestId].addr,
            requestFlipConfirmList[_requestId].coinType,
            requestFlipConfirmList[_requestId].coinAmount,
            block.timestamp,
            _randomness % 2 == requestFlipConfirmList[_requestId].betSide
                ? true
                : false,
            requestFlipConfirmList[_requestId].betSide,
            _requestId
        );

        emit resultBetSignal(
            _requestId,
            _randomness,
            _randomness % 2 == requestFlipConfirmList[_requestId].betSide
                ? true
                : false,
            requestFlipConfirmList[_requestId].addr,
            requestFlipConfirmList[_requestId].coinType,
            requestFlipConfirmList[_requestId].coinAmount,
            requestFlipConfirmList[_requestId].betSide
        );
    }

    /**
     * @dev Public function to request randomness and returns request Id.
     * @param _coinType bet type 0: MATIC, 1: MMF
     * @param _coinAmountIndex bet amount
     * @param _flipBet bet flip side
     */
    function betSimulation(
        uint256 _coinType,
        uint256 _coinAmountIndex,
        uint16 _flipBet,
        uint16 _randomness
    ) external payable {
        require(msg.sender == ownerAddress, "permission err");
        require(coinType[_coinType][_coinAmountIndex] != 0, "Param err");

        emit requestBetSignal(
            0x8546581470dbe49d01d24ddc7a071c0c52856d61993ad26fc0c2ec5aafef1838,
            msg.sender,
            _coinType,
            coinType[_coinType][_coinAmountIndex],
            _flipBet
        );

        betHistory[betHistoryLength++] = Bet(
            msg.sender,
            _coinType,
            coinType[_coinType][_coinAmountIndex],
            block.timestamp,
            _randomness % 2 == _flipBet ? true : false,
            _flipBet,
            0x8546581470dbe49d01d24ddc7a071c0c52856d61993ad26fc0c2ec5aafef1838
        );

        if (_randomness % 2 == _flipBet) {
            // Beter won.
            if (_coinType == 0) {
                payable(address(uint160(msg.sender))).transfer(
                    (coinType[_coinType][_coinAmountIndex] * 1965) / 1000
                );
                payable(address(uint160(adminWallet1))).transfer(
                    (coinType[_coinType][_coinAmountIndex] * 15) / 1000
                );
                payable(address(uint160(adminWallet2))).transfer(
                    (coinType[_coinType][_coinAmountIndex] * 15) / 1000
                );
                payable(address(uint160(adminWallet3))).transfer(
                    (coinType[_coinType][_coinAmountIndex] * 5) / 1000
                );
            } else {
                IERC20(MMFAddress).transfer(
                    msg.sender,
                    (coinType[_coinType][_coinAmountIndex] * 1965) / 1000
                );
                IERC20(MMFAddress).transfer(
                    adminWallet1,
                    (coinType[_coinType][_coinAmountIndex] * 15) / 1000
                );
                IERC20(MMFAddress).transfer(
                    adminWallet2,
                    (coinType[_coinType][_coinAmountIndex] * 15) / 1000
                );
                IERC20(MMFAddress).transfer(
                    adminWallet3,
                    (coinType[_coinType][_coinAmountIndex] * 5) / 1000
                );
            }
        }

        betResultMap[msg.sender][betResultMapLength[msg.sender]++] = Bet(
            msg.sender,
            _coinType,
            coinType[_coinType][_coinAmountIndex],
            block.timestamp,
            _randomness % 2 == _flipBet ? true : false,
            _flipBet,
            0x8546581470dbe49d01d24ddc7a071c0c52856d61993ad26fc0c2ec5aafef1838
        );

        emit resultBetSignal(
            0x8546581470dbe49d01d24ddc7a071c0c52856d61993ad26fc0c2ec5aafef1838,
            _randomness,
            _flipBet == _randomness % 2 ? true : false,
            msg.sender,
            _coinType,
            coinType[_coinType][_coinAmountIndex],
            _flipBet
        );
    }

    /**********************************************************************/
    /*               Manage the coin type list, bet history               */
    /**********************************************************************/

    /**
     * @notice add, update, remove coinTypeLength variable.
     * @param _coinType bet coin type (matic, mmf)
     * @param _index the order number which will operate
     * @param _coinAmount coin amount
     * @param _mode 0: add 1: update 2: remove
     */
    function manageCoinType(
        uint256 _coinType,
        uint256 _index,
        uint256 _coinAmount,
        uint16 _mode
    ) external onlyOwner {
        if (_mode == 0) {
            coinType[_coinType][coinTypeLength[_coinType]] = _coinAmount;
            coinTypeLength[_coinType]++;
        } else if (_mode == 1) {
            require(_index < coinTypeLength[_coinType], "_index is not valid");
            coinType[_coinType][_index] = _coinAmount;
        } else if (_mode == 2) {
            require(_index < coinTypeLength[_coinType], "_index is not valid");
            for (uint256 i = _index; i < coinTypeLength[_coinType]; i++) {
                coinType[_coinType][i] = coinType[_coinType][i + 1];
            }
            coinTypeLength[_coinType]--;
        }
    }

    /**
     * @notice add, update, remove betHistory variable.
     * @param _betAddress bet owner address
     * @param _betType bet type (matic, mmf)
     * @param _betAmount bet amount
     * @param _timeStamp bet time with seconds
     * @param _betWonOrLoose bet result
     * @param _index the order number which will operate
     * @param _mode 0: add 1: update 2: remove
     */
    function manageBetHistory(
        address _betAddress,
        uint256 _betType,
        uint256 _betAmount,
        uint256 _timeStamp,
        bool _betWonOrLoose,
        bytes32 _requestId,
        uint16 _beSide,
        uint256 _index,
        uint16 _mode
    ) external onlyOwner {
        if (_mode == 0) {
            betHistory[betHistoryLength++] = Bet(
                _betAddress,
                _betType,
                _betAmount,
                _timeStamp,
                _betWonOrLoose,
                _beSide,
                _requestId
            );
        } else if (_mode == 1) {
            require(_index < betHistoryLength, "_index is not valid");
            betHistory[_index] = Bet(
                _betAddress,
                _betType,
                _betAmount,
                _timeStamp,
                _betWonOrLoose,
                _beSide,
                _requestId
            );
        } else if (_mode == 2) {
            require(_index < betHistoryLength, "_index is not valid");
            for (uint256 i = _index; i < betHistoryLength; i++) {
                betHistory[i] = betHistory[i + 1];
            }
            betHistoryLength--;
        }
    }

    /**********************************************************************/
    /*               Manage the coin in smart contract                    */
    /**********************************************************************/
    /// @notice withdraw the MATIC of the amount (uint256 amount)
    function withdrawMatic(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Balance error");
        payable(address(uint160(owner()))).transfer(amount);
    }

    /// @notice withdraw the MMF token of the amount (uint256 amount)
    function withdrawMMF(uint256 amount) external onlyOwner {
        require(
            IERC20(MMFAddress).balanceOf(address(this)) >= amount,
            "Balance error"
        );
        IERC20(MMFAddress).transfer(owner(), amount);
    }

    /// @notice withdraw the LINK token of the amount (uint256 amount)
    function withdrawLINK(uint256 amount) external onlyOwner {
        require(
            IERC20(address(LINK)).balanceOf(address(this)) >= amount,
            "Balance error"
        );
        IERC20(address(LINK)).transfer(owner(), amount);
    }

    function receiveBNB() external payable {}

    /**********************************************************************/
    /*                 Manage smart contract metadata                     */
    /**********************************************************************/

    /**
     * @notice setting MMF token address.
     */
    function setMMFAddress(address _mmf) external onlyOwner {
        MMFAddress = _mmf;
    }

    /**
     * @notice setting address wallets.
     */
    function setAdminWallets(
        address _adm1,
        address _adm2,
        address _adm3
    ) external onlyOwner {
        adminWallet1 = _adm1;
        adminWallet2 = _adm2;
        adminWallet3 = _adm3;
    }

    /**
     * Requests the address of the Chainlink Token on this network
     */
    function getChainlinkToken() public view returns (address) {
        return address(LINK);
    }
}
