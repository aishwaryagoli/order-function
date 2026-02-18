const df = require("durable-functions");

df.app.activity("ProcessPayment", {
    handler: async (order) => {
        return "Payment processed successfully";
    }
});
