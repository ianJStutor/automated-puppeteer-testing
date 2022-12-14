import http from "http";
import fs from "fs";
import path from "path";
import url from "url";
//import runTests from "./testing/puppeteer.js";

const HOST = "localhost";
const PORT = 3000;
const DEVMODE = process.argv[2] === "-dev";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(router);

if (DEVMODE) {
	// Watch files in src folder
    fs.readdir(`${__dirname}/src`, (err, files) => {
        for (let file of files) {
            fs.watchFile(`${__dirname}/src/${file}`, restartServer);
        }
    });
	// Watch file in testing folder
	fs.watchFile(`${__dirname}/testing/puppeteer.js`, restartServer);
}

function startServer() {
    server.listen(PORT, HOST, async () => {
        console.log(`Server is listening on http://${HOST}:${PORT}`);
        if (DEVMODE) {
			const { default: runTests } = await import(`./testing/puppeteer.js?v=${Date.now()}`);
            console.log("Running in dev mode");
            runTests(HOST, PORT);
        }
    });
}

function restartServer() {
    server.close(startServer);
}

function router(req, res) {
    switch(req.url) {
        case "/": return serveHtml(res);
        case "/style.css": return serveCss(res);
        case "/script.js": return serveJs(res);
        default: res.end(null);
    }
}

function serveHtml(res) {
    const html = fs.readFileSync(__dirname + "/src/index.html");
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(html);
}

function serveCss(res) {
    const css = fs.readFileSync(__dirname + "/src/style.css");
    res.setHeader("Content-Type", "text/css");
    res.writeHead(200);
    res.end(css);
}

function serveJs(res) {
    const js = fs.readFileSync(__dirname + "/src/script.js");
    res.setHeader("Content-Type", "text/javascript");
    res.writeHead(200);
    res.end(js);
}

startServer();
