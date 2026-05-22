import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────
   TOOLTIP MAPS
   ──────────────────────────────────────────── */

const COMPARISON_TOOLTIPS: Record<string, string> = {
  "Monthly website visits": "A unique browser session on any page where Exatom is installed. Multiple pageviews = 1 visit.",
  "Form sessions": "Each time a visitor interacts with a tracked form counts as one session.",
  "Number of forms": "How many different forms you can track with Exatom.",
  "Session recordings": "Replay exactly how visitors interact with your forms: clicks, hesitations and corrections.",
  "Analytics data access": "How far back you can view your historical analytics data.",
  "Drop-off analysis": "See which form fields cause visitors to abandon, and at what step.",
  "Completion rate": "The percentage of visitors who start and successfully submit a form.",
  "Smart tooltips & nudges": "Automated in-form messages that help visitors complete fields they struggle with.",
  "AI CRO suggestions": "AI-generated recommendations to improve your form's conversion rate.",
  "Conversion drop alerts": "Get notified when a form's conversion rate drops significantly.",
  "SSO / SAML": "Single Sign-On integration for enterprise identity providers like Okta or Azure AD.",
  "SLA & dedicated success": "Guaranteed uptime and response times, plus a personal success manager.",
  "Custom retention & security": "Tailored data retention policies and security configurations for your organization.",
  "Strategic CRO consultancy": "Hands-on conversion optimization guidance from our expert team.",
};

const CARD_TOOLTIPS: Record<string, string> = {
  "See where visitors drop off": "See your full form funnel: sessions, starts, submits, failures and drop-offs. Know exactly where visitors leave.",
  "See your missed conversion potential": "Know how much revenue is slipping away from visitors who start but never complete your form.",
  "Completion rate per form": COMPARISON_TOOLTIPS["Completion rate"],
  "Up to 5,000 sessions/mo": COMPARISON_TOOLTIPS["Form sessions"],
  "Full drop-off & friction insights": COMPARISON_TOOLTIPS["Drop-off analysis"],
  "Session recordings per form": COMPARISON_TOOLTIPS["Session recordings"],
  "Smart tooltips & nudges to fix issues": COMPARISON_TOOLTIPS["Smart tooltips & nudges"],
  "AI-powered CRO suggestions": COMPARISON_TOOLTIPS["AI CRO suggestions"],
  "Unlimited sessions": COMPARISON_TOOLTIPS["Form sessions"],
  "SSO / SAML & custom security": COMPARISON_TOOLTIPS["SSO / SAML"],
  "Custom SLA & contracts": COMPARISON_TOOLTIPS["SLA & dedicated success"],
  "Strategic CRO consultancy & enablement": COMPARISON_TOOLTIPS["Strategic CRO consultancy"],
};

const InfoTip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="inline align-middle ml-1 cursor-help">
        <Info className="w-3.5 h-3.5 text-muted-foreground inline align-middle" />
      </span>
    </TooltipTrigger>
    <TooltipContent side="top" className="max-w-[240px] text-xs">
      {text}
    </TooltipContent>
  </Tooltip>
);

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const PAID_TIERS = [
  { id: "10k", label: "Up to 10,000", visits: "10,000", price: 79, annualPrice: 59 },
  { id: "25k", label: "Up to 25,000", visits: "25,000", price: 129, annualPrice: 99 },
  { id: "50k", label: "Up to 50,000", visits: "50,000", price: 199, annualPrice: 159 },
] as const;

const FREE_FEATURES = [
  "See where visitors drop off",
  "Completion rate per form",
  "See your missed conversion potential",
  "Unlimited website visits",
  "No credit card needed",
];

const GROWTH_FEATURES = [
  "Everything in Free",
  "Full drop-off & friction insights",
  "Session recordings per form",
  "Smart tooltips & nudges to fix issues",
  "AI-powered CRO suggestions",
  "Unlimited sessions",
];

const ENTERPRISE_FEATURES = [
  "Everything in Growth",
  "Strategic CRO consultancy & enablement",
  "Priority support & dedicated success manager",
  "SSO / SAML & custom security",
  "Custom SLA & contracts",
];

/* Comparison table rows */
const COMPARISON_ROWS: { feature: string; free: boolean | string; growth: boolean | string; enterprise: boolean | string }[] = [
  { feature: "Monthly website visits", free: false, growth: "Up to 50,000", enterprise: "50,000+" },
  { feature: "Number of forms", free: "1", growth: "Unlimited", enterprise: "Unlimited" },
  { feature: "Session recordings", free: false, growth: true, enterprise: true },
  { feature: "Analytics data access", free: "1 month", growth: "13 months", enterprise: "13 months" },
  { feature: "Drop-off analysis", free: true, growth: true, enterprise: true },
  { feature: "Completion rate", free: true, growth: true, enterprise: true },
  { feature: "Smart tooltips & nudges", free: false, growth: true, enterprise: true },
  { feature: "AI CRO suggestions", free: false, growth: true, enterprise: true },
  { feature: "Conversion drop alerts", free: false, growth: true, enterprise: true },
  { feature: "SSO / SAML", free: false, growth: false, enterprise: true },
  { feature: "SLA & dedicated success", free: false, growth: false, enterprise: true },
  { feature: "Custom retention & security", free: false, growth: false, enterprise: true },
  { feature: "Strategic CRO consultancy", free: false, growth: false, enterprise: true },
];

const FAQS = [
  {
    q: "What counts as a monthly visit?",
    a: "A monthly visit is one unique browser session on any page where Exatom is installed. If a user visits 3 pages, that counts as 1 visit. We don't track across sessions — no cookies needed.",
  },
  {
    q: "Can I upgrade from Free to Growth?",
    a: "Yes — you can upgrade at any time from your dashboard. Your data history is preserved and you'll get immediate access to all Growth features.",
  },
  {
    q: "Why is Enterprise 'Let's talk'?",
    a: "Enterprise customers typically need custom contracts, SLAs, SSO, and dedicated support. We tailor the package to your organization, so pricing depends on scope and requirements.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual billing gives you 2 months free compared to monthly billing. You can switch between monthly and annual at any time.",
  },
  {
    q: "Is it cookieless / GDPR-friendly?",
    a: "Absolutely. Exatom is 100% cookieless and doesn't collect personal data. No consent banner required. Fully GDPR, CCPA, and ePrivacy compliant out of the box.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts on self-serve plans. Cancel from your dashboard and you'll retain access until the end of your billing period.",
  },
  {
    q: "What happens if I temporarily exceed my visit limit?",
    a: "No worries — a short traffic spike won't immediately push you to the next tier. We look at your average usage over time. If you consistently exceed your limit, we'll reach out before making any changes.",
  },
];

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<string>("10k");
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const currentTier = PAID_TIERS.find((t) => t.id === selectedTier) ?? PAID_TIERS[0];
  const isAnnual = billing === "annual";
  const displayPrice = isAnnual ? currentTier.annualPrice : currentTier.price;

  return (
    <TooltipProvider delayDuration={200}>
    <div className="min-h-screen bg-background">
      {/* ─── Top bar ─── */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-16">
          <Logo maxWidth="96px" onClick={() => navigate("/pricing")} />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <span className="cursor-default hover:text-foreground transition-colors">Product</span>
            <span className="cursor-default hover:text-foreground transition-colors">Customers</span>
            <span className="cursor-default hover:text-foreground transition-colors">Resources</span>
            <span className="text-foreground font-medium cursor-pointer" onClick={() => navigate("/pricing")}>Pricing</span>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/book-demo")}>
              Get a demo
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")}>
              Start for free
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="max-w-3xl mx-auto text-center px-4 sm:px-8 py-16">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pricing</p>
        <h1 className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight max-w-xl mx-auto">
          Cheaper Than Wasted Leads
        </h1>
      </section>

      {/* ─── Pricing cards ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-6">
        {/* Billing toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-3 bg-secondary rounded-full p-1">
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                billing === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                billing === "annual" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setBilling("annual")}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* FREE */}
          <div className="border border-border rounded-lg p-6 sm:p-8 flex flex-col">
            {/* Row 1: Plan name */}
            <p className="text-lg font-semibold text-foreground">Free</p>
            {/* Row 2: Description (fixed height) */}
            <p className="mt-1 text-sm text-muted-foreground h-[40px]">
              See how many visitors abandon your form and how much revenue you're missing.
            </p>
            {/* Row 3: Price */}
            <p className="mt-4 text-4xl font-bold text-foreground">€0</p>
            <p className="text-sm text-muted-foreground mt-1">Forever free</p>
            {/* Row 4: Selector area (fixed height to match Growth dropdown) */}
            <div className="mt-4 h-[44px]" />
            {/* Row 5: Features */}
            <ul className="mt-6 space-y-2.5 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="text-sm text-foreground flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 opacity-50" />
                  <span>{f}{CARD_TOOLTIPS[f] && <InfoTip text={CARD_TOOLTIPS[f]} />}</span>
                </li>
              ))}
            </ul>
            {/* Row 6: CTA */}
            <Button
              className="mt-8 w-full"
              variant="outline"
              size="lg"
              onClick={() => navigate("/signup")}
            >
              Start free
            </Button>
          </div>

          {/* GROWTH */}
          <div className="border-2 border-foreground rounded-lg p-6 sm:p-8 flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground text-xs font-medium px-3 py-0.5 rounded-full">
              Most popular
            </span>
            {/* Row 1: Plan name */}
            <p className="text-lg font-semibold text-foreground">Growth</p>
            {/* Row 2: Description (fixed height) */}
            <p className="mt-1 text-sm text-muted-foreground h-[40px]">
              Fix drop-offs with full insights and direct activations.
            </p>
            {/* Row 3: Price */}
            <p className="mt-4 text-4xl font-bold text-foreground">
              {isAnnual && <span className="text-lg text-muted-foreground line-through mr-1">€{currentTier.price}</span>}
              €<span key={`${displayPrice}-${billing}`} className="inline-block animate-fade-in">{displayPrice}</span>
              <span className="text-base font-normal text-muted-foreground"> / month</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Up to {currentTier.visits} monthly website visits
            </p>
            {/* Row 4: Selector area */}
            <div className="mt-4">
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAID_TIERS.map((tier) => {
                    const p = isAnnual ? tier.annualPrice : tier.price;
                    return (
                      <SelectItem key={tier.id} value={tier.id}>
                        {tier.label} visits/mo — €{p}/mo
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            {/* Row 5: Features */}
            <ul className="mt-6 space-y-2.5 flex-1">
              {GROWTH_FEATURES.map((f) => (
                <li key={f} className="text-sm text-foreground flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{f}{CARD_TOOLTIPS[f] && <InfoTip text={CARD_TOOLTIPS[f]} />}</span>
                </li>
              ))}
            </ul>
            {/* Row 6: CTA */}
            <Button
              className="mt-8 w-full"
              size="lg"
              onClick={() => navigate("/signup")}
            >
              Get started today
            </Button>
          </div>

          {/* ENTERPRISE */}
          <div className="border border-border rounded-lg p-6 sm:p-8 flex flex-col bg-secondary/40">
            {/* Row 1: Plan name */}
            <p className="text-lg font-semibold text-foreground">Enterprise</p>
            {/* Row 2: Description (fixed height) */}
            <p className="mt-1 text-sm text-muted-foreground h-[40px]">
              For teams that need consultancy, custom SLAs and premium support.
            </p>
            {/* Row 3: Price */}
            <p className="mt-4 text-4xl font-bold text-foreground">Let's talk</p>
            <p className="text-sm text-muted-foreground mt-1">From 50,000+ monthly website visits</p>
            {/* Row 4: Selector area (fixed height to match Growth dropdown) */}
            <div className="mt-4 h-[44px]" />
            {/* Row 5: Features */}
            <ul className="mt-6 space-y-2.5 flex-1">
              {ENTERPRISE_FEATURES.map((f) => (
                <li key={f} className="text-sm text-foreground flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{f}{CARD_TOOLTIPS[f] && <InfoTip text={CARD_TOOLTIPS[f]} />}</span>
                </li>
              ))}
            </ul>
            {/* Row 6: CTA */}
            <Button
              className="mt-8 w-full"
              size="lg"
              onClick={() => navigate("/book-demo")}
            >
              Get a demo
            </Button>
          </div>
        </div>

        {/* Microcopy under all columns */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Self-serve · Cancel anytime · Fair pricing based on monthly website visits
        </p>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-16 pt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Compare plans</h2>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              {/* Plan header row with prices + CTAs */}
              <tr className="border-b border-border">
                <th className="text-left p-4 sm:p-6 align-top"></th>
                <th className="text-center p-4 sm:p-6 align-top min-w-[180px]">
                  <p className="text-xs text-muted-foreground font-normal">Free</p>
                  <p className="text-xl font-bold text-foreground mt-1">€0<span className="text-xs font-normal text-muted-foreground"> / forever</span></p>
                  <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => navigate("/signup")}>
                    Start free
                  </Button>
                </th>
                <th className="text-center p-4 sm:p-6 align-top min-w-[180px] bg-secondary/30">
                  <p className="text-xs text-muted-foreground font-normal">Growth</p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {isAnnual && <span className="text-sm text-muted-foreground line-through mr-1">€{currentTier.price}</span>}
                    €{displayPrice}<span className="text-xs font-normal text-muted-foreground"> / month</span>
                  </p>
                  <Button size="sm" className="mt-3 w-full" onClick={() => navigate("/signup")}>
                    Start trial
                  </Button>
                </th>
                <th className="text-center p-4 sm:p-6 align-top min-w-[180px]">
                  <p className="text-xs text-muted-foreground font-normal">Enterprise</p>
                  <p className="text-xl font-bold text-foreground mt-1">Let's talk</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => navigate("/book-demo")}>
                    Get a demo
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.feature} className="border-b border-border last:border-b-0">
                  <td className="p-3 sm:p-4 text-foreground">
                    <span className="inline-flex items-center">
                      {row.feature}
                      {COMPARISON_TOOLTIPS[row.feature] && <InfoTip text={COMPARISON_TOOLTIPS[row.feature]} />}
                    </span>
                  </td>
                  {([row.free, row.growth, row.enterprise] as (boolean | string)[]).map((val, ci) => (
                    <td key={ci} className={`text-center p-3 sm:p-4 ${ci === 1 ? "bg-secondary/30" : ""}`}>
                      {val === true ? (
                        <span className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center mx-auto">
                          <Check className="w-3 h-3 text-background" />
                        </span>
                      ) : val === false ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className="text-foreground text-xs">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground sticky top-8">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <Logo maxWidth="64px" opacity />
          <p>© {new Date().getFullYear()} Exatom. Cookieless form analytics.</p>
          <button
            onClick={() => navigate("/prompt-bibliotheek")}
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            Prompt Bibliotheek
          </button>
        </div>
      </footer>
    </div>
    </TooltipProvider>
  );
};

export default Pricing;
