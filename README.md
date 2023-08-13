# HyperlaneMockup Contract
The `HyperlaneMockup` contract offers a simulation of cross-chain message dispatch and processing, making it possible for users to emulate the process of sending and receiving messages between chains.

**Methods:**
1. **sendMessage(uint32 _destinationDomain, bytes calldata _messageBody):**
Simulates the dispatching of a message to another chain.
Emits a `Dispatch` event, detailing the sender, destination, recipient, and the message content.
Also triggers a `DispatchId` event to provide a unique ID for the dispatched message.
2. **receiveMessage(bytes32 _id):**
Represents the simulation of a message receipt from another chain.
Emits a `ProcessId` event marking the successful processing of the received message.

## Dependencies
Please note that this contract does not have external dependencies. However, ensure that the Ethereum environment you're deploying to is compatible with the `pragma solidity ^0.8.9` version.

## Setup and Usage
1. **Installation:**
```shell
npm install
```
- Clone the repository to your local system.
- Ensure you have the necessary dependencies installed.

2. **Deployment:**
```shell
npx hardhat run scripts/deploy.js
```
- Compile the contracts using the Solidity compiler.
- Deploy the `HyperlaneMockup` contract to your desired Ethereum network.

3. **Interaction:**
```shell
npx hardhat run scripts/sendTransaction.js
```
- Use the `sendMessage` function to simulate cross-chain message sending.
- Use the `receiveMessage` function to simulate the receipt of a cross-chain message.

## Conclusion
If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request. We appreciate all contributions and feedback!