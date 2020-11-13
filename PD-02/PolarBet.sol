pragma solidity 0.5.9;

contract PolarBet {

    uint storedBet;

    function setBet(uint NewBet) public {
        storedBet = NewBet;
    }

    function getBet() public view returns (uint) {
        return storedBet;
    }

}
