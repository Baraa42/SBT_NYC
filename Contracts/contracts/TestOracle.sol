// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/IOracle.sol";

contract TestOracle is IOracle {
    function hasCompleted(address from) external view override returns (bool) {
        return true;
    }
}
