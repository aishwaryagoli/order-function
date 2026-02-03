import { app } from '@azure/functions';

const LOGIC_APP_URL =
  'https://prod-00.southindia.logic.azure.com:443/workflows/5634ac3e89394d08ab4b618002a0e182/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=ABm-ma0YyrhsZqynklx640OOeLPKpB4eMef2pAbmbPk';

app.http('ProcessOrder', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {

    /* 🔹 CORS preflight */
    if (request.method === 'OPTIONS') {
      return {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };
    }

    try {
      context.log('Processing order request');

      const body = await request.json();

      // ✅ MATCH ANGULAR PAYLOAD
      const product = body.product;
      const date = body.date;

      if (!product) {
        return {
          status: 400,
          body: 'Product name is required'
        };
      }

      /* 🔹 Call Logic App */
      const response = await fetch(LOGIC_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: product,
          orderDate: date || new Date().toISOString()
        })
      });

      context.log('Logic App status:', response.status);

      return {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: `Order received for ${product}`
      };

    } catch (error) {
      context.log('ERROR processing order:', error);

      return {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: 'Failed to process order'
      };
    }
  }
});
