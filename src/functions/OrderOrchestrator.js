const df = require("durable-functions");

df.app.orchestration("OrderOrchestration", function* (context) {
    const order = context.df.getInput();

    const isValid = yield context.df.callActivity("ValidateOrder", order);

    if (!isValid) {
        return "Order validation failed";
    }

    yield context.df.callActivity("ProcessPayment", order);
    yield context.df.callActivity("UpdateDatabase", order);
    yield context.df.callActivity("SendConfirmation", order);

    return "Order processed successfully";
});
