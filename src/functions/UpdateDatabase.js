const df = require("durable-functions");

df.app.activity("UpdateDatabase", {
    handler: async (order) => {
        return "Database updated";
    }
});
