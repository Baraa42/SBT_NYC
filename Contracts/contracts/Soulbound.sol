// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error Soulbound__TransferNotAllowed();

contract Soulbound is ERC721, Ownable {
    uint256 counter;

    constructor() ERC721("Soulbound", "SB") {}

    function mint(address to) public onlyOwner {
        _mint(to, counter);
        counter++;
    }

    function _beforeTokenTransfer(
        address from,
        address, /*to*/
        uint256 /*tokenId*/
    ) internal override {
        if (from != address(0)) {
            revert Soulbound__TransferNotAllowed();
        }
    }
}
