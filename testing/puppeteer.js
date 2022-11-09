import puppeteer from "puppeteer";

async function test(HOST, PORT) {
    console.log("Puppeteer e2e testing...");
    const timeLabel = "Puppeteer e2e testing complete";
    console.time(timeLabel);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://${HOST}:${PORT}`);

    await page.type("#name", "Rafael");
    await page.select("#reservation", "Sat03");
    await page.click("form button");

    await page.waitForSelector("#confirmation");
    const message1 = await page.$eval("#confirmation", p => p.textContent);
    const expected1 = "Rafael, thank you for your reservation for Saturday 3 PM.";
    console.log("Test 1", message1 === expected1 ? "PASS" : "FAIL");

    await browser.close();
    console.timeEnd(timeLabel);
}

export default test;
