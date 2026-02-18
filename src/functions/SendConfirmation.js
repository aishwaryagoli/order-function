const df = require("durable-functions");

df.app.activity("SendConfirmation", {
    handler: async (order) => {
        return "Confirmation sent";
    }
});
