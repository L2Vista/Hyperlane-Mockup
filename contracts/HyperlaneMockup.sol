// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract HyperlaneMockup {
    event Dispatch(
        address indexed sender,
        uint32 indexed destination,
        bytes32 indexed recipient,
        bytes message
    );

    event Received(uint32 origin, address sender, bytes body);

    function sendMessage(
        uint32 _destinationDomain,
        bytes calldata _messageBody
    ) external {
        emit Dispatch(
            msg.sender,
            _destinationDomain,
            addressToBytes32(msg.sender),
            _messageBody
        );
    }

    function receiveMessage(
        uint32 _origin,
        address sender,
        bytes memory _messageBody
    ) external {
        emit Received(_origin, sender, _messageBody);
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }
}
