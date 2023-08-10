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

    event DispatchId(bytes32 indexed messageId);

    event ProcessId(bytes32 indexed messageId);

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

        emit DispatchId(
            bytes32(
                combine(
                    msg.sender,
                    _destinationDomain,
                    addressToBytes32(msg.sender),
                    _messageBody
                )
            )
        );
    }

    function receiveMessage(bytes32 _id) external {
        emit ProcessId(_id);
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function combine(
        address _address,
        uint32 _uint32,
        bytes32 _bytes32,
        bytes memory _bytes
    ) public view returns (bytes32) {
        _uint32 = uint32(uint256(_uint32) + block.timestamp);

        bytes32 addressBytes = bytes32(uint256(uint160(_address)) << (12 * 8));
        bytes32 uint32Bytes = bytes32(uint256(_uint32) << (28 * 8));

        bytes32 allTogether = addressBytes | uint32Bytes | _bytes32;

        for (uint256 i = 0; i < _bytes.length; i++) {
            allTogether |= bytes32(uint256(uint8(_bytes[i])) << ((31 - i) * 8));
        }

        return allTogether;
    }
}
