const df = require("durable-functions");

df.app.orchestration("OrderOrchestrator", function* (context) {
    const order = context.df.getInput();

    yield context.df.callActivity("ValidateOrder", order);
    yield context.df.callActivity("ProcessPayment", order);
    yield context.df.callActivity("UpdateDatabase", order);
    yield context.df.callActivity("SendConfirmation", order);

    return "Order processed successfully";
});
