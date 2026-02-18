const df = require("durable-functions");

df.app.activity("ValidateOrder", {
    handler: async (order) => {
        return true;
    }
});
