import express from "express";
import fs from "fs";
import http from "http";
import net from "net";

const app = express();

// Long-lived memory state
let counter = 0;

// Long-running background process
setInterval(() => {
  console.log(`[Interval] Counter: ${++counter}`);
}, 5000);

// File persistence test
app.get("/write", (req, res) => {
  fs.writeFileSync("test.txt", "Persist me!");
  res.send("File written");
});

app.get("/read", (req, res) => {
  const exists = fs.existsSync("test.txt");
  const contents = exists ? fs.readFileSync("test.txt", "utf8") : "Not found";
  res.send(`File content: ${contents}`);
});

// TCP server test
const tcpServer = net.createServer((socket) => {
  socket.write("Hello TCP client!\n");
  socket.end();
});
tcpServer.listen(4000, () => {
  console.log("TCP server running on port 4000");
});

// HTTP route
app.get("/", (req, res) => {
  res.send(`Hello! Counter is ${counter}`);
});

// Main app listen (no WebSocket server now)
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("HTTP server listening on port 3000");
});
