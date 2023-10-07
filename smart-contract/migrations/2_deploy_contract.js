// var TodoContract = artifacts.require("./TodoContract.sol");
var TodoContract = artifacts.require("TodoContract");

module.exports = function (deployer) {
  let n = 1;
  deployer.deploy(TodoContract, { from: arguments[2][n] });
  // deployer.deploy(TodoContract);
};
