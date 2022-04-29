// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

// creating the contract
/**
 * The Contest contract does this and that...
 */
contract Contest {

    // creating structure to model the contestant
    struct Contestant { // close to array
        uint id;
        string name;
        uint voteCount;
    }

    // use mapping to get or fetch the contestant
    mapping(uint => Contestant) public contestants; // public state variable

    // to save the list of users/accounts who already casted vote
    mapping (address => bool) public voters;

    // add a public STATE variable to keep track of contestant Count
    uint public contestantsCount;

    event votedEvent(
        uint indexed _contestantId
    );

    constructor () public {
        addContestant("Tom");
        addContestant("Jerry");
    }

    // add a function to add contestant
    // memory keyword required since 0.5.0 solidity breaking changes
    // in this case fix next issue:
    // 'TypeError: Data location must be "storage" or "memory" for parameter in function, but none was given'
    function addContestant (string memory _name) private {
        // underscore - it for private variable, for state variable
        // it's a convention to start pr var with '_'
        contestantsCount ++;
        contestants[contestantsCount] = Contestant(contestantsCount, _name, 0);
    }

    function vote (uint _contestantId) public {

        // restricting the person who already casted the vote
        require(!voters[msg.sender]); // function execution goes if true, stops/throw an error if false

        // require that the vote is casted to a valid contestant
        require(_contestantId > 0 && _contestantId  <= contestantsCount);
        // increase the contestant vote count

        contestants[_contestantId].voteCount ++;

        // set the voter's voted status to true
        voters[msg.sender] = true;

		//trigger the vote event
		emit votedEvent(_contestantId);
    }
}
