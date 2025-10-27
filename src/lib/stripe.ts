import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function createCheckoutSession({
  amount,
  sessionId,
  engineerName,
  artistEmail,
}: {
  amount: number;
  sessionId: string;
  engineerName: string;
  artistEmail: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `FlexSession with ${engineerName}`,
            description: `Professional music session`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_email: artistEmail,
    metadata: {
      sessionId,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sessions/${sessionId}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/sessions/${sessionId}?canceled=true`,
  });

  return session;
}

export async function createConnectAccount(email: string) {
  const account = await stripe.accounts.create({
    type: "express",
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  return account;
}

export async function createConnectOnboardingLink(accountId: string) {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payout?refresh=true`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payout?success=true`,
    type: "account_onboarding",
  });

  return accountLink;
}

export function calculatePlatformFee(amount: number): number {
  const feePercent = parseInt(process.env.PLATFORM_FEE_PERCENT || "15", 10);
  return Math.round((amount * feePercent) / 100);
}
