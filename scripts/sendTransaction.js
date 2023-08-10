const { ethers } = require("hardhat");
const chainInfo = require("../config/chainInfo");

require("dotenv").config();

const PRIVATE_KEY = process.env.PK;

async function send(url, contractAddr, toChain, message) {
    const provider = new ethers.JsonRpcProvider(url);
    const deployer = new ethers.Wallet(PRIVATE_KEY, provider);

    const mockup = await ethers.getContractAt("HyperlaneMockup", contractAddr);
    const tx = await mockup.connect(deployer).sendMessage(toChain, message);
    await tx.wait();
    console.log(`send hash: ${tx.hash}`);
}

async function receive(url, contractAddr, fromChain, message) {
    const provider = new ethers.JsonRpcProvider(url);
    const deployer = new ethers.Wallet(PRIVATE_KEY, provider);

    const mockup = await ethers.getContractAt("HyperlaneMockup", contractAddr);
    const tx = await mockup.connect(deployer).receiveMessage(fromChain, await deployer.getAddress(), message);
    await tx.wait();
    console.log(`receive hash: ${tx.hash}`);
}

async function sendReceive(fromChain, toChain) {
    const message = "0x00";

    console.log(`${fromChain} -> ${toChain}`);
    await send(
        chainInfo[fromChain].url,
        chainInfo[fromChain].contractAddr,
        chainInfo[toChain].chainId,
        message
    );
    await receive(
        chainInfo[toChain].url,
        chainInfo[toChain].contractAddr,
        chainInfo[fromChain].chainId,
        message
    );
}

async function main() {
    // base, mode, optimism, zora
    const chainSet = [
        { fromChain: "base", toChain: "mode", },
        { fromChain: "mode", toChain: "base", },
        { fromChain: "optimism", toChain: "zora", },
        { fromChain: "zora", toChain: "optimism", },
    ];

    for (let i = 0; i < chainSet.length; i++) {
        const { fromChain, toChain } = chainSet[i];
        await sendReceive(fromChain, toChain);
    }
}

main();
