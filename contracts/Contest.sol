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
    mapping(uint => contestant) public contestants;

    // add a public variable to keep track of contestant Count
    uint public contestantCount;

    //add a function to add contestant
    function addContestant (string _name) private { 
        // underscore - it for private variable, for state variable
        // it's a convention to start pr var with '_'
        contestantCount ++;
        contestants[contestantsCount] = Contestant(contestantCount, _name, 0);
    }


}
















    // string public contestant;

    // constructor() public {
    //     contestant = "Tom";
    // }
}
