// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev Required interface of a compliant oracle contract.
 */
interface IOracle {
    /**
     * @dev Emitted when `guildId` task is completed by `from`.
     */
    event TaskCompleted(address indexed from, uint256 indexed guildId);

    /**
     * @dev Returns if `from` has completed the task `guildId`
     */
    function hasCompleted(address from) external view returns (bool);
}
