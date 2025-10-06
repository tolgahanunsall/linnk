import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VueButton } from "@/components/ui/vue-button";
import { toast } from "sonner";

const plans = {
  monthly: [
    {
      name: "Starter",
      price: 0,
      cta: "Get started",
      features: ["10 pages/month", "Basic translation", "Email support"],
    },
    {
      name: "Pro",
      price: 19,
      cta: "Upgrade",
      popular: true,
      features: [
        "200 pages/month",
        "Advanced summarization",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: 49,
      cta: "Choose Team",
      features: ["1000 pages/month", "Collaboration", "SSO (beta)"],
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: 0,
      cta: "Get started",
      features: ["120 pages/year", "Basic translation", "Email support"],
    },
    {
      name: "Pro",
      price: 190,
      cta: "Upgrade",
      popular: true,
      features: [
        "2,400 pages/year",
        "Advanced summarization",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: 490,
      cta: "Choose Team",
      features: ["12,000 pages/year", "Collaboration", "SSO (beta)"],
    },
  ],
};

export default function Pricing() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const items = plans[period];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "success") {
      toast.success("Ödeme başarıyla tamamlandı.");
    } else if (status === "cancel") {
      toast("Ödeme iptal edildi.");
    }
  }, [location.search]);

  const getPriceId = (planName: string, billingPeriod: "monthly" | "yearly") => {
    const env = import.meta.env;
    if (planName === "Pro") {
      return billingPeriod === "monthly"
        ? env.VITE_STRIPE_PRICE_PRO_MONTHLY
        : env.VITE_STRIPE_PRICE_PRO_YEARLY;
    }
    if (planName === "Team") {
      return billingPeriod === "monthly"
        ? env.VITE_STRIPE_PRICE_TEAM_MONTHLY
        : env.VITE_STRIPE_PRICE_TEAM_YEARLY;
    }
    return undefined;
  };

  const handleCtaClick = async (planName: string) => {
    if (planName === "Starter") {
      navigate('/#upload-section');
      return;
    }
    const priceId = getPriceId(planName, period);
    if (!priceId) {
      alert("Ödeme yapılandırması eksik: Stripe Price ID env değişkenlerini ekleyin.");
      return;
    }
    try {
      const base = window.location.origin;
      const resp = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          mode: 'subscription',
          successUrl: `${base}/pricing?status=success`,
          cancelUrl: `${base}/pricing?status=cancel`,
        })
      });
      const data = await resp.json();
      if (data?.url) {
        window.location.href = data.url as string;
      } else if (data?.id) {
        // Fallback: session url yoksa Stripe tarafında dashboard ayarı gerekebilir
        alert('Checkout session oluşturuldu, fakat yönlendirme URL\'i alınamadı.');
      } else {
        alert(data?.error || 'Checkout oluşturulamadı');
      }
    } catch (e: any) {
      alert(e?.message || 'Beklenmeyen bir hata oluştu');
    }
  };

  const isDisabled = useMemo(() => {
    return (planName: string) => {
      if (planName === 'Starter') return false;
      const priceId = getPriceId(planName, period);
      return !priceId;
    };
  }, [period]);
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-transparent" />
      <div className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            Pricing
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-gray-600">
            Choose a plan that scales with you.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border bg-white p-1 text-sm shadow-sm">
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-4 py-1.5 rounded-full ${period === "monthly" ? "bg-indigo-600 text-white" : "text-gray-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod("yearly")}
              className={`px-4 py-1.5 rounded-full ${period === "yearly" ? "bg-indigo-600 text-white" : "text-gray-700"}`}
            >
              Yearly <span className="ml-1 opacity-80">(save 2 months)</span>
            </button>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border bg-white p-6 shadow-sm ${p.popular ? "ring-2 ring-indigo-200" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.popular && (
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-4 text-4xl font-bold">
                {p.price === 0 ? "Free" : `$${p.price}`}
                <span className="text-base font-normal text-gray-500">
                  /{period === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <VueButton 
                  className="w-full" 
                  onClick={() => handleCtaClick(p.name)}
                  disabled={isDisabled(p.name)}
                >
                  {p.cta}
                </VueButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
