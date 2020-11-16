pragma solidity 0.5.9;

contract Dealer  {
    uint balance;
    uint bet;
    
    constructor() public {
        balance = 10; 
    }
    
    function addBet(uint _bet) public {
        if (checkIfBalanceIsEnough(_bet)) {
            bet = _bet;
            balance += bet;
        }
    }
    
    function returnBet() public {
        balance -= bet; 
    }
    
    function returnBetWithProfit() public {
        balance -= bet * 2; 
    }
    
    function showBalance() public view returns (uint) {
        return balance; 
    }
    
    function checkIfBalanceIsEnough(uint _bet) private view returns (bool) {
        return balance >= _bet; 
    }
}

contract PolarBet is Dealer {
    uint dealerDiceResult;
    uint userDiceResult; 
    
    function getRandomNumber() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.coinbase, block.difficulty)))%6) + 1;
    }
    
    function rollDice() public {
        dealerDiceResult = getRandomNumber();
        userDiceResult = getRandomNumber();
    }

    function getDiceResultOfDealer() public view returns (uint) {
        return dealerDiceResult;
    }
    
    function getDiceResultOfUser() public view returns (uint) {
        return userDiceResult;
    }
    
    function winLose() public {
        if (dealerDiceResult < userDiceResult) {
            returnBetWithProfit();
        }  else {
            returnBet();
        }
        bet = 0;
    }
}
