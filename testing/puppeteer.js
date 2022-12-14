import puppeteer from "puppeteer";
import {test, testrunner} from "../lib/testrunner.js";
import assert from "node:assert/strict";

async function runTests(HOST, PORT) {

	testrunner("Puppeteer e2e testing", async () => {

		// Start Puppeteer
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await test("Reservation for Rafael has expected confirmation message", async () => {
			await page.goto(`http://${HOST}:${PORT}`);
			await page.type("#name", "Rafael");
			await page.select("#reservation", "Sat03");
			await page.click("form button");
			await page.waitForSelector("#confirmation");
			// "Rafael" assertion test

		});

		await test("Reservation for Zoya has expected caffeine-free confirmation message", async () => {
			await page.goto(`http://${HOST}:${PORT}`);
			await page.type("#name", "Zoya");
			await page.select("#reservation", "Sun12");
			await page.click("#decaf");
			await page.click("form button");
			await page.waitForSelector("#confirmation");
			// "Zoya" assertion test

		});

		// Close Puppeteer
		await browser.close();
	});

}

export default runTests;
