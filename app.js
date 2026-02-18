const { app } = require("@azure/functions");
const df = require("durable-functions");

df.register(app);
