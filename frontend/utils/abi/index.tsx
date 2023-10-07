export const CONTRACT_ADDRESS = "0x55dD14D1099A6b9d37Dd8b13E635D553ac13841A";
export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
    ],
    name: "DeleteTask",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "completedDate",
        type: "uint256",
      },
    ],
    name: "TaskCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdDate",
        type: "uint256",
      },
    ],
    name: "TaskCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "completeTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "createTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "deleteTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "taskCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tasks",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "createdDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "completedDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
