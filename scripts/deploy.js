const { ethers } = require("hardhat");
const chainInfo = require("../config/chainInfo");

require("dotenv").config();

const PRIVATE_KEY = process.env.PK;

async function deploy(url) {
  const provider = new ethers.JsonRpcProvider(url);
  const deployer = new ethers.Wallet(PRIVATE_KEY, provider);
  
  const { chainId } = await provider.getNetwork();
  console.log(`chainId: ${chainId}`);

  const deployerBalance = await provider.getBalance(await deployer.getAddress());

  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer's balance: ${deployerBalance.toString() / 10 ** 18} ETHER`);

  const HyperlaneMockup = await ethers.getContractFactory("HyperlaneMockup", deployer);
  const mockup = await HyperlaneMockup.deploy();
  await mockup.waitForDeployment();

  console.log(`mockup address: ${await mockup.getAddress()}`);
}

async function main() {
  console.log("1. base");
  await deploy(chainInfo.base.url);
  console.log("2. mode");
  await deploy(chainInfo.mode.url);
  console.log("3. optimism");
  await deploy(chainInfo.optimism.url);
  console.log("4. zora");
  await deploy(chainInfo.zora.url);
}

main();
// 1. base
// chainId: 84531
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.019713856322138543 ETHER
// mockup address: 0xF647E71bb4704De8E413166ebcA875c4ea0f2480
// 2. mode
// chainId: 919
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.19976130604911962 ETHER
// mockup address: 0xc3E11C1e2591120dF419A8FA6CB83B7BaFa446E1
// 3. optimism
// chainId: 420
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.03973903163610263 ETHER
// mockup address: 0xD2983137F2A57BE847b2C671aa89ed88E70b8035
// 4. zora
// chainId: 999
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.019764208980335728 ETHER
// mockup address: 0x712fF5DD7D30898b8DF9366C6b2793F3AF96636D