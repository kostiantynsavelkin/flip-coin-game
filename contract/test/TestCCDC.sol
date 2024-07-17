// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "../contracts/CCDCNFTMint.sol";

contract TestCCDC {
    function testIfNoVisitsInitially() public {
        CCDCNFTMint ccdcNFTMint = new CCDCNFTMint(
            "",
            0xDC13960B0F3A7a02DC2A8AaBE5EC04fA9522E967,
            0x97E075279b4f1b5d9D9d9f4bD6820b0915B0e713
        );
        Assert.equal(
            car.visitsCount(),
            0,
            "Should not have any visit registered initially"
        );
    }

    function testIfVisitIsRegistered() public {
        Car car = new Car("W8686D");
        car.registerVisit(1000, Car.VisitType.Inspection);
        Assert.equal(car.visitsCount(), 1, "Should register only one visit");
    }
}
