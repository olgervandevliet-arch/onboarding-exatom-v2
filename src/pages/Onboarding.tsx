import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Building2, Globe } from "lucide-react";
import Logo from "@/components/Logo";

const INSTALL_METHODS = [
  "I'll use Google Tag Manager",
  "I'll install via Shopify",
  "I'll install via WordPress",
  "I'll add the code myself",
  "I need to ask a developer",
];

const CHALLENGES = [
  "I have no idea how many visitors drop out on our form/check-out",
  "I have no insight into why visitors drop off",
  "My manager constantly asks me to achieve a higher conversion rate",
  "I don't have enough IT support available to improve the website",
];

const TOTAL_STEPS = 5;

/* ─── Lo-fi SVG visuals per step ─── */

const StepVisual1 = () => (
  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
    {/* Card background */}
    <rect x="40" y="60" width="240" height="200" rx="16" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" />
    {/* Avatar circle */}
    <circle cx="160" cy="130" r="40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.4" />
    {/* Person icon inside avatar */}
    <circle cx="160" cy="118" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M136 154 C136 138 184 138 184 154" stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.5" strokeLinecap="round" />
    {/* Name placeholder lines */}
    <rect x="100" y="186" width="120" height="8" rx="4" fill="currentColor" fillOpacity="0.15" />
    <rect x="120" y="202" width="80" height="6" rx="3" fill="currentColor" fillOpacity="0.1" />
    {/* Label line top */}
    <rect x="60" y="76" width="60" height="6" rx="3" fill="currentColor" fillOpacity="0.12" />
  </svg>
);

const StepVisual2 = () => (
  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
    {/* Building base */}
    <rect x="80" y="140" width="160" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" />
    {/* Roof */}
    <path d="M64 144 L160 60 L256 144" stroke="currentColor" strokeWidth="2.5" fill="none" strokeOpacity="0.35" strokeLinejoin="round" />
    {/* Door */}
    <rect x="136" y="210" width="48" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
    {/* Windows */}
    <rect x="96" y="165" width="36" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
    <rect x="188" y="165" width="36" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
    {/* Name placeholder */}
    <rect x="90" y="280" width="140" height="8" rx="4" fill="currentColor" fillOpacity="0.15" />
    <rect x="110" y="295" width="100" height="6" rx="3" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

const StepVisual3 = () => (
  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
    {/* Browser window */}
    <rect x="40" y="60" width="240" height="200" rx="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" />
    {/* Browser top bar */}
    <rect x="40" y="60" width="240" height="36" rx="12" fill="currentColor" fillOpacity="0.06" />
    <line x1="40" y1="96" x2="280" y2="96" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
    {/* Traffic light dots */}
    <circle cx="64" cy="78" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    <circle cx="82" cy="78" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    <circle cx="100" cy="78" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    {/* URL bar */}
    <rect x="120" y="68" width="130" height="20" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    {/* Globe icon inside URL bar */}
    <circle cx="134" cy="78" r="5" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    {/* URL placeholder line */}
    <rect x="144" y="74" width="90" height="8" rx="4" fill="currentColor" fillOpacity="0.12" />
    {/* Page content lines */}
    <rect x="60" y="116" width="200" height="8" rx="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="60" y="132" width="160" height="8" rx="4" fill="currentColor" fillOpacity="0.08" />
    <rect x="60" y="148" width="180" height="8" rx="4" fill="currentColor" fillOpacity="0.08" />
    <rect x="60" y="172" width="200" height="36" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
    <rect x="72" y="184" width="100" height="12" rx="3" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

const StepVisual4 = () => (
  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
    {/* Tag icon */}
    <rect x="60" y="80" width="200" height="160" rx="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" />
    {/* Code lines */}
    <rect x="80" y="108" width="60" height="8" rx="3" fill="currentColor" fillOpacity="0.2" />
    <rect x="96" y="124" width="100" height="8" rx="3" fill="currentColor" fillOpacity="0.15" />
    <rect x="96" y="140" width="80" height="8" rx="3" fill="currentColor" fillOpacity="0.15" />
    <rect x="96" y="156" width="110" height="8" rx="3" fill="currentColor" fillOpacity="0.15" />
    <rect x="80" y="172" width="40" height="8" rx="3" fill="currentColor" fillOpacity="0.2" />
    {/* Tag icon bottom right */}
    <path d="M210 195 L230 175 L245 175 L245 190 L225 210 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" strokeLinejoin="round" />
    <circle cx="238" cy="182" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
  </svg>
);

const StepVisual5 = () => (
  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
    {/* Title */}
    <rect x="80" y="50" width="160" height="10" rx="5" fill="currentColor" fillOpacity="0.15" />
    {/* Funnel bars — top to bottom, getting smaller */}
    <rect x="60" y="80" width="200" height="36" rx="6" fill="currentColor" fillOpacity="0.2" />
    <rect x="80" y="132" width="160" height="36" rx="6" fill="currentColor" fillOpacity="0.15" />
    <rect x="100" y="184" width="120" height="36" rx="6" fill="currentColor" fillOpacity="0.1" />
    <rect x="120" y="236" width="80" height="36" rx="6" fill="currentColor" fillOpacity="0.07" />
    {/* Labels right of bars */}
    <rect x="268" y="92" width="28" height="8" rx="3" fill="currentColor" fillOpacity="0.18" />
    <rect x="248" y="144" width="28" height="8" rx="3" fill="currentColor" fillOpacity="0.14" />
    <rect x="228" y="196" width="28" height="8" rx="3" fill="currentColor" fillOpacity="0.1" />
    <rect x="208" y="248" width="28" height="8" rx="3" fill="currentColor" fillOpacity="0.07" />
    {/* Arrow pointing down */}
    <line x1="160" y1="282" x2="160" y2="302" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" strokeLinecap="round" />
    <path d="M152 296 L160 308 L168 296" stroke="currentColor" strokeWidth="2.5" fill="none" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STEP_VISUALS = [StepVisual1, StepVisual2, StepVisual3, StepVisual4, StepVisual5];

/* ─── Component ─── */

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const isSocialLogin = searchParams.get("social") === "true";
  const [step, setStep] = useState(isSocialLogin ? 2 : 1);
  const [fullName, setFullName] = useState(isSocialLogin ? "Stephan van den Bremer" : "");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [installMethod, setInstallMethod] = useState<string | null>(null);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [otherChallenge, setOtherChallenge] = useState("");
  const navigate = useNavigate();

  // Enter key for pill-button steps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step === 4 && installMethod) handleNext();
        if (step === 5 && (selectedChallenges.length > 0 || otherChallenge.trim())) handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step, installMethod, selectedChallenges, otherChallenge]);

  const progress = (step / TOTAL_STEPS) * 100;

  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(challenge)
        ? prev.filter((c) => c !== challenge)
        : [...prev, challenge]
    );
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      localStorage.setItem("exatom_user_name", fullName);
      localStorage.setItem("exatom_company_name", companyName);
      localStorage.setItem("exatom_website_url", websiteUrl);
      if (installMethod) localStorage.setItem("exatom_install_method", installMethod);
      navigate("/get-started");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const canProceed = () => {
    if (step === 1) return fullName.trim().length > 0;
    if (step === 2) return companyName.trim().length > 0;
    if (step === 3) return websiteUrl.trim().length > 0;
    if (step === 4) return installMethod !== null;
    if (step === 5) return selectedChallenges.length > 0 || otherChallenge.trim().length > 0;
    return false;
  };

  const StepVisualComponent = STEP_VISUALS[step - 1];

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2 text-sm z-10">
          <span className="text-muted-foreground hidden sm:inline">Already have an account?</span>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            Login
          </Button>
        </div>
        <div className="p-4 sm:p-8">
          <Logo maxWidth="96px" onClick={() => navigate("/pricing")} />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-xl px-4 sm:px-8 lg:px-24">
            {/* Progress bar */}
            <div className="mb-2">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-foreground mt-2">Step {step}/{TOTAL_STEPS}</p>
            </div>

            <div className="mt-12">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What is your full name?</h2>
                  <div className="relative max-w-md">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && fullName.trim() && handleNext()}
                      placeholder="John Smith"
                      className="h-12 pl-10"
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What is your company name?</h2>
                  <div className="relative max-w-md">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && companyName.trim() && handleNext()}
                      placeholder="Acme Inc."
                      className="h-12 pl-10"
                      autoComplete="organization"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What is your website URL?</h2>
                  <div className="relative max-w-md">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && websiteUrl.trim() && handleNext()}
                      placeholder="example.com"
                      className="h-12 pl-10"
                      autoComplete="url"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How will you install Exatom?</h2>
                  <div className="flex flex-wrap gap-3">
                    {INSTALL_METHODS.map((method) => (
                      <Button
                        key={method}
                        variant={installMethod === method ? "pill-active" : "pill"}
                        size="pill"
                        onClick={() => setInstallMethod(method)}
                      >
                        {method}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    What are your biggest challenges?
                  </h2>
                  <div className="flex flex-col gap-3">
                    {CHALLENGES.map((challenge) => (
                      <Button
                        key={challenge}
                        variant={selectedChallenges.includes(challenge) ? "pill-active" : "pill"}
                        size="pill"
                        className="justify-start text-left w-full h-auto whitespace-normal py-3"
                        onClick={() => toggleChallenge(challenge)}
                      >
                        {challenge}
                      </Button>
                    ))}
                    <input
                      type="text"
                      value={otherChallenge}
                      onChange={(e) => setOtherChallenge(e.target.value)}
                      placeholder="Something else..."
                      className="h-10 px-4 rounded-full border border-border bg-background text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-10">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!canProceed()}>Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — dynamic SVG visual per step */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 text-foreground">
        <div className="w-full max-w-sm flex items-center justify-center">
          <StepVisualComponent />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
