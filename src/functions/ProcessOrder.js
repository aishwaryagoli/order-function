import { app } from '@azure/functions';

const LOGIC_APP_URL = 'https://prod-00.southindia.logic.azure.com:443/workflows/5634ac3e89394d08ab4b618002a0e182/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=ABm-ma0YyrhsZqynklx640OOeLPKpB4eMef2pAbmbPk';

app.http('ProcessOrder', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      context.log('Processing order');

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

      const body = await request.json();

      const response = await fetch(LOGIC_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName: body.productName
        })
      });

      context.log('Logic App response status:', response.status);

      return {
        status: 200,
        body: `Order received for ${body.productName}`
      };

    } catch (error) {
      context.log('ERROR:', error);

      return {
        status: 500,
        body: 'Failed to process order'
      };
    }
  }
});
