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
// deployer's balance: 0.01942415668617236 ETHER
// mockup address: 0x5418ed830A6756031F6CF96fA302D5a95D1dBbcb
// 2. mode
// chainId: 919
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.1994691445205065 ETHER
// mockup address: 0xF647E71bb4704De8E413166ebcA875c4ea0f2480
// 3. optimism
// chainId: 420
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.039449374088682425 ETHER
// mockup address: 0xD693d08BE428127d2Ef6496c01cc606E44B28fe3
// 4. zora
// chainId: 999
// deployer address: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// deployer's balance: 0.0194745087954699 ETHER
// mockup address: 0xD76169e3592C48d21879f537791Ea585E21585ab