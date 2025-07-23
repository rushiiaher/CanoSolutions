exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // For OPTIONS requests (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Checking environment variables...');
    
    // Get all environment variables (filtering out sensitive ones)
    const envVars = Object.keys(process.env)
      .filter(key => !key.includes('KEY') && !key.includes('SECRET') && !key.includes('TOKEN') && !key.includes('PASSWORD'))
      .reduce((obj, key) => {
        // For MongoDB URI, only show the first part
        if (key === 'MONGODB_URI' && process.env[key]) {
          const uri = process.env[key];
          obj[key] = uri.substring(0, Math.min(20, uri.length)) + '...';
        } else {
          obj[key] = process.env[key] ? '[SET]' : '[NOT SET]';
        }
        return obj;
      }, {});
    
    // Check for critical environment variables
    const criticalVars = {
      'MONGODB_URI': !!process.env.MONGODB_URI,
      'NODE_ENV': process.env.NODE_ENV || 'not set'
    };
    
    // System info
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memoryUsage: process.memoryUsage(),
    };
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Environment check completed',
        criticalVars,
        envVars,
        systemInfo
      }, null, 2)
    };
  } catch (error) {
    console.error('Environment check error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Environment check failed',
        message: error.message
      })
    };
  }
};