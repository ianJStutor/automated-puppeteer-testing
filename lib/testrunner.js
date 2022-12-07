async function test(testLabel, testFn) {
	try {
		await testFn();
		console.log("\x1b[92mPASS\x1b[39m", testLabel);
	}
	catch(err) {
		console.log("\x1b[91mFAIL\x1b[39m", testLabel);
		console.dir(err);
	}
}

async function testrunner(runnerLabel, runnerFn) {
	console.log(runnerLabel, "...");
	const startTime = Date.now();
	await runnerFn();
	console.log(`${runnerLabel} complete:`, `${((Date.now()-startTime)/1000).toFixed(3)}s`);
}

export {test, testrunner};
