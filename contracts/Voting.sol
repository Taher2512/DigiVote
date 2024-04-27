// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => uint256) public votesByVoter; // Tracks which party each address voted for
    mapping(uint256 => uint256) public totalVotes; // Tracks total votes for each party ID

    function vote(uint256 partyId) public {
        require(votesByVoter[msg.sender] == 0, "Already voted."); // Ensure each address can only vote once

        votesByVoter[msg.sender] = partyId;
        totalVotes[partyId] += 1; // Increment the vote count for the chosen party
    }

    // Function to get the total count of votes for a particular party
    function getVotes(uint256 partyId) public view returns (uint256) {
        return totalVotes[partyId];
    }
}
