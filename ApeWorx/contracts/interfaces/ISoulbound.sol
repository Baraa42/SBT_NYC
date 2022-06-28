// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @dev Required interface of a compliant oracle contract.
 */
interface ISoulbound is IERC721 {
    function safeMint(address to, string memory uri) external;
}
