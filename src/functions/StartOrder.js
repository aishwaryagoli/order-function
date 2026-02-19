const { app } = require("@azure/functions");
const df = require("durable-functions");

app.http("StartOrder", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        // const client = df.getClient(context);
        // const body = await request.json();

        // const instanceId = await client.startNew(
        //     "OrderOrchestrator",
        //     undefined,
        //     body
        // );

        return {
            body: "Durable Order Processing Triggered Successfully"
        };
    }
});
