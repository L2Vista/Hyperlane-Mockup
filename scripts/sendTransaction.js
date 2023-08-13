const { ethers } = require("hardhat");
const chainInfo = require("../config/chainInfo");

require("dotenv").config();

const PRIVATE_KEY = process.env.PK;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function send(url, contractAddr, toChain, message) {
    const provider = new ethers.JsonRpcProvider(url);
    const deployer = new ethers.Wallet(PRIVATE_KEY, provider);

    const mockup = await ethers.getContractAt("HyperlaneMockup", contractAddr);
    const tx = await mockup.connect(deployer).sendMessage(toChain, message);
    await tx.wait();
    console.log(`send hash: ${tx.hash}`);
    
    const receipt = await provider.getTransactionReceipt(tx.hash);
    const messageId = receipt.logs[1].topics[1];
    console.log(`message id: ${messageId}`);

    return messageId;
}

async function receive(url, contractAddr, fromChain, messageId) {
    const provider = new ethers.JsonRpcProvider(url);
    const deployer = new ethers.Wallet(PRIVATE_KEY, provider);

    const mockup = await ethers.getContractAt("HyperlaneMockup", contractAddr);
    const tx = await mockup.connect(deployer).receiveMessage(messageId);
    await tx.wait();
    console.log(`receive hash: ${tx.hash}`);
}

async function sendReceive(fromChain, toChain) {
    const message = "0x00";

    console.log(`${fromChain} -> ${toChain}`);
    const messageId = await send(
        chainInfo[fromChain].url,
        chainInfo[fromChain].contractAddr,
        chainInfo[toChain].chainId,
        message
    );
  
    await sleep(60000);
  
    await receive(
        chainInfo[toChain].url,
        chainInfo[toChain].contractAddr,
        chainInfo[fromChain].chainId,
        messageId
    );
}

async function main() {
    // base, mode, optimism, zora
    const chainSet = [
        { fromChain: "optimism", toChain: "zora", },
        { fromChain: "base", toChain: "mode", },
        { fromChain: "mode", toChain: "base", },
        { fromChain: "zora", toChain: "optimism", },
        { fromChain: "mode", toChain: "zora", },
        { fromChain: "zora", toChain: "mode", },
    ];

    for (let i = 0; i < chainSet.length; i++) {
        const { fromChain, toChain } = chainSet[i];
        await sendReceive(fromChain, toChain);
    }
}

main();
// base -> mode
// send hash: 0x9e74933c75f795a1ddd2e6381306f44e79d70162f3498795cfd4c3140b0c346e
// message id: 0xe4defcbba3ba4f42fdcd2b7be73ffb33f7badfeafdcd2b7bc33d5b03770290ea
// receive hash: 0x46ff2b1ec36b2b8253383b34ab90f7766482353fd16c00c21b30aaebeb3c0706
// mode -> base
// send hash: 0xf9031434b141b6dfca3af44f52fb138a37992e5ed36866a5cf0a7c8d8584c6cd
// message id: 0xe4dee373a3ba4f42fdcd2b7be73ffb33f7badfeafdcd2b7bc33d5b03770290ea
// receive hash: 0xb2157bdc9fb464e569672c105b03d2db17709f30676d3facac8d60119276630d
// optimism -> zora
// send hash: 0x3e22ec14b7e3d557bb3ed8d8a14b78e9b5384b18ae819a22f10aef9227cfabe6
// message id: 0xe4defd39a3ba4f42fdcd2b7be73ffb33f7badfeafdcd2b7bc33d5b03770290ea
// receive hash: 0xc7712d2736d2f398ed60a91be70bdc731129d9cce31c5bd9993a860509cb27c2
// zora -> optimism
// send hash: 0x1e53535add962c9820dbf24168bd61557214be57b7ea27753b39868dc950b90e
// message id: 0xe4defafca3ba4f42fdcd2b7be73ffb33f7badfeafdcd2b7bc33d5b03770290ea
// receive hash: 0x93d5073324cfd224f056479c80e4fa1b44dc857245db5cac1a5fa4ccfcd1cc50