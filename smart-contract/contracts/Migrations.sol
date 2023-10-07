// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// abstract contract Migrations {
//     address public owner;
//     uint public last_completed_migration;

//     constructor() {
//         owner = msg.sender;
//     }

//     modifier restricted() {
//         if (msg.sender == owner) _;
//     }

//     function setCompleted(uint completed) public restricted {
//         last_completed_migration = completed;
//     }
// }

contract Migrations {
    address public owner = msg.sender;
    uint public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}
