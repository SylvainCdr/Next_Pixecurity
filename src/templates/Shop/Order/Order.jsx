const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const User = require('../models/Users');
const Order = require('../models/Orders'); // Assurez-vous d'importer votre modèle de commande

// Webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // Create order in your database
      const userId = session.client_reference_id;
      const amountTotal = session.amount_total / 100; // Convert from cents to euros

      const newOrder = new Order({
        user: userId,
        items: session.display_items, // You can customize this as per your order structure
        totalAmount: amountTotal,
        status: 'paid',
        payment: {
          method: 'stripe',
          paid: true,
        },
        orderDate: new Date(),
      });

      try {
        await newOrder.save();
        // Reset the user's cart
        await User.findByIdAndUpdate(userId, { cart: [] });
        console.log('Order created and cart reset');
      } catch (error) {
        console.error('Error saving order:', error);
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
