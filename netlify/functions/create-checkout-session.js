const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
      successUrl, 
      cancelUrl 
    } = JSON.parse(event.body);

    // Validate required fields
    if (!serviceType || !customerInfo || !customerInfo.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Define your Stripe product/price IDs
    // You'll need to replace these with your actual Stripe Price IDs
    const priceMap = {
      'coaching': process.env.STRIPE_COACHING_PRICE_ID, // $20/hour coaching
      'replay': process.env.STRIPE_REPLAY_PRICE_ID       // $5/replay analysis
    };

    const priceId = priceMap[serviceType];
    if (!priceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid service type' }),
      };
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerInfo.email,
      metadata: {
        service_type: serviceType,
        customer_name: customerInfo.name || '',
        discord_username: customerInfo.discord || '',
        rocket_league_rank: customerInfo.rank || '',
        goals: customerInfo.goals || '',
        availability: customerInfo.availability || '',
      },
      success_url: successUrl || `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.URL}/book`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      }),
    };
  }
}; 