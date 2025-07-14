exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const uri = process.env.MONGODB_URI;
  const maskedUri = uri ? uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') : 'Not set';

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      connectionString: maskedUri,
      hostname: uri ? uri.match(/@([^/]+)/)?.[1] : 'Not found'
    })
  };
};