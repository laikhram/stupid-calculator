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