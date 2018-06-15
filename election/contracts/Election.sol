pragma solidity ^0.4.2;

contract Election{

    struct Candidate{
        uint id;
        string name;
        uint votes;
    }

    mapping (uint=>Candidate) public candidates;
    uint public candidateCount;

    constructor()public{
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string _name) private {
        candidates[++candidateCount] = Candidate(candidateCount, _name, 0);
    }
}