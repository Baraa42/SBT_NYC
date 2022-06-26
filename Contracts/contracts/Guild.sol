// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IOracle.sol";
import "./Soulbound.sol";
import "./interfaces/ISoulbound.sol";
import "./helpers/ByteHasher.sol";
import "./interfaces/IWorldID.sol";

error Guild__TransferNotAllowed();
error Guild__HasNotCompleted();
error Guild__HasAlreadyClaimed();
error InvalidNullifier();

contract Guild {
    using ByteHasher for bytes;
    struct GuildDetails {
        string description;
        string uri;
        address oracleContract;
        address rewardToken;
        uint256 rewardAmount;
        uint256 totalRewardAmount;
    }

    uint256 public guildCounter;
    mapping(uint256 => GuildDetails) public guilds;
    mapping(uint256 => uint256) public guildToRewardsLeft;
    mapping(uint256 => address) public guildIdToNFTAddress; // Guild => NFT Contract // guildIdToNFTAddress[0] guild.guildIdToNFTAddress

    /// @dev The WorldID instance that will be used for verifying proofs
    // IWorldID internal immutable worldId;

    /// @dev The WorldID group ID (1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to prevent double-signaling
    mapping(uint256 => bool) internal nullifierHashes;

    event GuildCreated();

    constructor() {
        //worldId = address(0);
    }

    function createGuild(
        string memory _name,
        string memory _symbol,
        GuildDetails memory _guildDetails
    ) external {
        guilds[guildCounter++] = _guildDetails;
        Soulbound sbt = new Soulbound(_name, _symbol);
        guildIdToNFTAddress[guildCounter] = address(sbt);
        if (_guildDetails.rewardToken != address(0)) {
            IERC20(_guildDetails.rewardToken).transferFrom(
                msg.sender,
                address(this),
                _guildDetails.totalRewardAmount
            );
            guildToRewardsLeft[guildCounter] =
                _guildDetails.totalRewardAmount /
                _guildDetails.rewardAmount;
        }

        emit GuildCreated();
    }

    function mint(address account, uint256 id) public {
        IOracle oracle = IOracle(guilds[id].oracleContract);
        bool hasCompleted = oracle.hasCompleted(account);

        if (!hasCompleted) {
            revert Guild__HasNotCompleted();
        }

        ISoulbound sbt = ISoulbound(guildIdToNFTAddress[id]);
        uint256 balance = sbt.balanceOf(account);
        if (balance > 0) {
            revert Guild__HasAlreadyClaimed();
        }

        string memory uri = guilds[id].uri;
        sbt.safeMint(account, uri);

        uint256 rewardsLeft = guildToRewardsLeft[id];

        if (rewardsLeft > 0) {
            guildToRewardsLeft[id]--;
            IERC20(guilds[id].rewardToken).transfer(
                account,
                guilds[id].rewardAmount
            );
        }
    }

    function claim(
        address receiver,
        uint256 id,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        // worldId.verifyProof(
        //     root,
        //     id,
        //     abi.encodePacked(receiver).hashToField(),
        //     nullifierHash,
        //     abi.encodePacked(address(this)).hashToField(),
        //     proof
        // );

        nullifierHashes[nullifierHash] = true;
        ISoulbound sbt = ISoulbound(guildIdToNFTAddress[id]);
        string memory uri = guilds[id].uri;
        sbt.safeMint(receiver, uri);
    }
}
