const df = require("durable-functions");

df.app.http("StartOrder", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        const client = df.getClient(context);
        const body = await request.json();

        const instanceId = await client.startNew(
            "OrderOrchestration",
            undefined,
            body
        );

        return {
            body: `Orchestration started with ID = ${instanceId}`
        };
    }
});
