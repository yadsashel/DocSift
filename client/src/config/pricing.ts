// src/config/pricing.ts

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    variantId: null, // غانعمروه ملي Lemon Squeezy يقبلونا
    features: ["5 Neural Credits/month", "Basic risk detection", "Email support"],
    action: "Get Started",
    link: "/signup"
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    variantId: "VARIANT_ID_FROM_LEMON", // كيبقى خاوي دابا
    features: ["150 Neural Credits/month", "Advanced AI analysis", "Priority support", "API Access"],
    popular: true,
    action: "Subscribe Now",
    link: "/signup" // غايتبدل لـ Lemon Squeezy Checkout Link من بعد
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$89",
    variantId: null,
    features: ["1000 Neural Credits/month", "Bulk Processing", "SSO & SCIM", "24/7 support"],
    action: "Contact Sales",
    link: "/contact"
  }
];