pragma solidity 0.5.9;

interface Controller {
    function checkIfBalanceIsEnough(uint bet) external returns (bool);
}

contract Dealer is Controller {
    uint balance;
    
    constructor() public {
        balance = 10; 
    }
    
    function addBet(uint bet) public {
        if (checkIfBalanceIsEnough(bet)) {
            balance += bet; 
        }
    }
    
    function returnBetWithProfit(uint bet) public {
        balance -= bet * 2; 
    }
    
    function showBalance() public view returns (uint) {
        return balance; 
    }
    
    function checkIfBalanceIsEnough(uint bet) public returns (bool) {
        return balance >= bet; 
    }
}

contract PolarBet is Dealer {
    uint diceResult; 
    
    function setDiceResult(uint _diceResult) public {
        diceResult = _diceResult;
    }

    function getDiceResult() public view returns (uint) {
        return diceResult;
    }
}
