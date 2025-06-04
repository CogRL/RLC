// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe is no longer used

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { 
      serviceType, 
      customerInfo, 
      // successUrl, // No longer redirecting to Stripe, success is handled directly
      // cancelUrl // No longer redirecting to Stripe
    } = JSON.parse(event.body);

    // Validate required fields
    if (!serviceType || !customerInfo || !customerInfo.email || !customerInfo.discord) { // Added discord as required
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields (service, email, discord)' }),
      };
    }

    // Simulate a successful booking without Stripe
    // console.log('Simulating booking for:', serviceType, customerInfo); // Optional: for server-side logging

    // Generate a simple mock session ID (e.g., timestamp + random number)
    const mockSessionId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    // Return a success-like response directly
    // The client-side will redirect to the success page with this mockSessionId
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        // sessionId: mockSessionId, // The success page expects a 'sessionId' in the response to construct its URL query param
        // The client-side script in book/index.njk will handle redirecting to success page
        // We need to provide the 'url' that the client side expects for redirection.
        // Let's construct a URL to the success page. The client expects `data.url`.
        // The client-side successUrl was: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`
        // We will pass the mockSessionId so the success page can display it.
        url: `${process.env.URL || 'https://rlclarity.shop'}/success?session_id=${mockSessionId}`, // Ensure URL is defined
        sessionId: mockSessionId // also pass sessionID directly if success page wants to use it from response data
      }),
    };

  } catch (error) {
    console.error('Error in mock booking process:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process booking',
        details: error.message 
      }),
    };
  }
}; 