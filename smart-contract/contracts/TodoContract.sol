// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract TodoContract {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
        uint256 createdDate;
        uint256 completedDate;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(
        uint256 id,
        string content,
        bool completed,
        uint256 createdDate
    );
    event TaskCompleted(uint256 id, bool completed, uint256 completedDate);
    event DeleteTask(uint taskId, bool isDeleted);

    modifier taskExists(uint256 _id) {
        if (tasks[_id].id == 0) {
            revert("Revert: taskId not found");
        }
        _;
    }

    function createTask(string memory _content) external {
        uint256 currentTimestamp = block.timestamp;

        taskCount++;
        tasks[taskCount] = Task(
            taskCount,
            _content,
            false,
            currentTimestamp,
            0
        );
        emit TaskCreated(taskCount, _content, false, currentTimestamp);
    }

    function completeTask(uint256 _id) external taskExists(_id) {
        uint256 currentTimestamp = block.timestamp;

        tasks[_id].completed = true;
        emit TaskCompleted(_id, true, currentTimestamp);
    }

    function deleteTask(uint256 _id) external taskExists(_id) {
        for (uint256 i = 1; i <= taskCount; i++) {
            if (tasks[i].completed && tasks[i].id == _id) {
                delete tasks[i];
                taskCount--;
            }
        }
    }
}
