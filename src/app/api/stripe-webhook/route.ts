import { NextRequest, NextResponse } from "next/server";
import {
  handleProcessWebhookUpdatedSubscription,
  stripe,
} from "@/services/stripe";

import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  if (!body) {
    console.error("No webhook payload was provided.");
    return new NextResponse("No webhook payload was provided.", {
      status: 400,
    });
  }

  if (!signature) {
    console.error("No Stripe signature header was provided.");
    return new NextResponse("No Stripe signature header was provided.", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await handleProcessWebhookUpdatedSubscription(event.data);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
