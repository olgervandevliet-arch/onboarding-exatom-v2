import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Building2, Globe } from "lucide-react";
import onboardingVisual from "@/assets/onboarding-visual.jpg";
import exatomLogo from "@/assets/exatom-logo.svg";

const ROLES = [
  "Owner",
  "CRO",
  "Marketing – Product",
  "Other",
  "Marketing – Analytics",
  "CRM",
  "Leading the Digital department",
];

const CHALLENGES = [
  "I have no idea how many visitors drop out on our form/check-out",
  "I have no insight into why visitors drop off",
  "My manager constantly asks me to achieve a higher conversion rate",
  "I don't have enough IT support available to improve the website",
];

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const isSocialLogin = searchParams.get("social") === "true";
  const [step, setStep] = useState(isSocialLogin ? 2 : 1);
  const [fullName, setFullName] = useState(isSocialLogin ? "Stephan van den Bremer" : "");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const navigate = useNavigate();

  // Enter key for pill-button steps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step === 4 && selectedRole) handleNext();
        if (step === 5 && selectedChallenge) handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step, selectedRole, selectedChallenge]);

  const progress = (step / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      localStorage.setItem("exatom_user_name", fullName);
      localStorage.setItem("exatom_company_name", companyName);
      localStorage.setItem("exatom_website_url", websiteUrl);
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
          <img src={exatomLogo} alt="Exatom" className="max-w-[96px] cursor-pointer" onClick={() => navigate("/pricing")} />
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
                      placeholder="https://www.example.com"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What is your role?</h2>
                  <div className="flex flex-wrap gap-3">
                    {ROLES.map((role) => (
                      <Button
                        key={role}
                        variant={selectedRole === role ? "pill-active" : "pill"}
                        size="pill"
                        onClick={() => setSelectedRole(role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    If you have to choose, what is your biggest challenge?
                  </h2>
                  <div className="flex flex-col gap-3">
                    {CHALLENGES.map((challenge) => (
                      <Button
                        key={challenge}
                        variant={selectedChallenge === challenge ? "pill-active" : "pill"}
                        size="pill"
                        className="justify-start text-left w-full h-auto whitespace-normal py-3"
                        onClick={() => setSelectedChallenge(challenge)}
                      >
                        {challenge}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-10">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - B&W visual per step */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <img
          src={onboardingVisual}
          alt="Onboarding visual"
          className="w-full max-w-md aspect-square object-cover rounded-lg"
          width={800}
          height={800}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Onboarding;
