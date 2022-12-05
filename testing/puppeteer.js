import puppeteer from "puppeteer";
import assert from "node:assert/strict";

async function testReservation(page) {
	await page.type("#name", "Rafael");
    await page.select("#reservation", "Sat03");
    await page.click("form button");
    await page.waitForSelector("#confirmation");
    const actual = await page.$eval("#confirmation", p => p.textContent);
    const expected = "Rafael, thank you for your reservation for Saturday 3 PM.";
	// Assertion:

}

async function testCaffeineFreeReservation(page) {
	await page.type("#name", "Zoya");
    await page.select("#reservation", "Sun12");
	await page.click("#decaf");
    await page.click("form button");
    await page.waitForSelector("#confirmation");
    const actual = await page.$eval("#confirmation", p => p.textContent);
    const expected = "Zoya, thank you for your caffeine-free reservation for Sunday 12 PM.";
	// Assertion:
	
}

async function runTests(HOST, PORT) {
	// Open Puppeteer
    console.log("Puppeteer e2e testing...");
    const timeLabel = "Puppeteer e2e testing complete";
    console.time(timeLabel);
    const browser = await puppeteer.launch();
	let page;

	// Test 1: testReservation()
	page = await browser.newPage();
    await page.goto(`http://${HOST}:${PORT}`);
	await testReservation(page);
	await page.close();

	// Test 2: testCaffeineFreeReservation()
	page = await browser.newPage();
	await page.goto(`http://${HOST}:${PORT}`);
	await testCaffeineFreeReservation(page);
	await page.close();

	// Close Puppeteer
    await browser.close();
    console.timeEnd(timeLabel);
}

export default runTests;
