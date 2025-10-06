import type { RequestHandler } from "express";
import Stripe from "stripe";
import { randomUUID } from "crypto";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export const createCheckoutSession: RequestHandler = async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured" });
  }

  const { priceId, mode = "subscription", successUrl, cancelUrl } = req.body || {};
  if (!priceId || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: "Missing priceId/successUrl/cancelUrl" });
  }

  try {
    const idempotencyKey = randomUUID();
    const session = await stripe.checkout.sessions.create(
      {
        mode,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        allow_promotion_codes: true,
      },
      { idempotencyKey }
    );
    res.json({ id: session.id, url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to create session" });
  }
};

export const stripeWebhook: RequestHandler = async (req, res) => {
  if (!stripe) {
    return res.status(500).send("Stripe not configured");
  }
  const sig = req.headers["stripe-signature"] as string | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  if (!sig || !webhookSecret) {
    return res.status(400).send("Missing signature or webhook secret");
  }

  try {
    const buf = req.body as Buffer; // requires express.raw on this route
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        // TODO: fulfill the purchase (grant access, mark subscription active)
        break;
      case "invoice.payment_succeeded":
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        break;
      default:
        break;
    }
    return res.status(200).send("ok");
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err?.message || "invalid"}`);
  }
};


