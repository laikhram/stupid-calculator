import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("StupidCalculator", () => {
  it("Get the contract :P", async () => {
    const StupidCalculator = await ethers.getContractFactory("StupidCalculator");
  });

  it("Provide totalAmount", async () => {
    const StupidCalculator = await ethers.getContractFactory("StupidCalculator");
    const StupidCalculatorContract = await StupidCalculator.deploy();

    expect(await StupidCalculatorContract.totalAmount()).to.equal(0);
  });

  it("Can add a number to totalAmount", async () => {
    const StupidCalculator = await ethers.getContractFactory("StupidCalculator");
    const StupidCalculatorContract = await StupidCalculator.deploy();

    await StupidCalculatorContract.add(10);
    expect(await StupidCalculatorContract.totalAmount()).to.equal(10);
  });

  it("Can add and subtract", async () => {
    const StupidCalculator = await ethers.getContractFactory("StupidCalculator");
    const StupidCalculatorContract = await StupidCalculator.deploy();

    await StupidCalculatorContract.add(10);
    await StupidCalculatorContract.subtract(7);
    expect(await StupidCalculatorContract.totalAmount()).to.equal(3);
  });
});

describe("SmarterStupidCalculator", async () => {
  let owner: SignerWithAddress;
  let signers: SignerWithAddress[];
  let SmarterStupidCalculatorContract: any;

  before(async () => {
    [owner, ...signers] = await ethers.getSigners();

    const SmarterStupidCalculator = await ethers.getContractFactory("SmarterStupidCalculator");
    SmarterStupidCalculatorContract = await SmarterStupidCalculator.deploy();
  });

  it("Provide totalAmount of first signer", async () => {
    expect(await SmarterStupidCalculatorContract.totalAmountEachAddress(owner.address)).to.equal(0);
  });

  it("Add number 10 to owner and 20 to first singer", async () => {
    await SmarterStupidCalculatorContract.add(10);
    expect(await SmarterStupidCalculatorContract.totalAmountEachAddress(owner.address)).to.equal(10);

    const singer1 = SmarterStupidCalculatorContract.connect(signers[0]);
    await singer1.add(20);
    expect(await SmarterStupidCalculatorContract.totalAmountEachAddress(signers[0].address)).to.equal(20);
  });

  it("Subtract number of first singer", async () => {
    const singer1 = SmarterStupidCalculatorContract.connect(signers[0]);
    await singer1.subtract(17);
    expect(await SmarterStupidCalculatorContract.totalAmountEachAddress(signers[0].address)).to.equal(3);
  });

  it("Check amout of each address", async () => {
    expect(await SmarterStupidCalculatorContract.totalAmountEachAddress(owner.address)).to.equal(10);
    expect(await SmarterStupidCalculatorContract.totalAmountEachAddress(signers[0].address)).to.equal(3);
  });
});
