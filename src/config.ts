export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: "price_1PtCseFyCGX557AIAp7zw8jw",
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: "price_1PtDSTFyCGX557AIEOl90uEX",
        quota: {
          TASKS: 100, //-1 é ilimitado (deixar 100 para test - apagar depois ein)
        },
      },
    },
  },
};
