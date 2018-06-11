pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    constructor() public{
        manager = msg.sender;
    }
    
    function enter() public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }
    function picWinner() public admin {
        uint index = random() % players.length; 
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    function random()private view returns (uint256){
        return uint256(keccak256(block.difficulty, now, players)); 
    }
    modifier admin() {
        require(msg.sender == manager);
        _;
    }
    
    function players() public view returns (address[]){
        return players;
    }
}