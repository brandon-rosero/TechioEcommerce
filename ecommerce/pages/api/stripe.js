const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
         
          { shipping_rate: 'shr_1LOjWoIitSnnzHFC2jlYGYDo' }

        ],
        
        line_items: req.body.cartItems.map(item => {

          return{

            price_data: {

              currency: 'usd',
              unit_amount: item.price * 100,
              product_data: {

                name: item.name,

              },

            },

            adjustable_quantity: {

              enabled: true,
              minimum: 1,

            },

            quantity: item.quantity

          }

        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}