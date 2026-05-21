import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Logo from "@/components/Logo";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? "your email";

  const canSubmit = code.length === 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) navigate("/onboarding");
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-8">
        <Logo maxWidth="96px" onClick={() => navigate("/pricing")} />
      </div>

      {/* Centered content */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-20">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Check your email for a code
            </h1>
            <p className="mt-2 text-muted-foreground">
              Enter the verification code sent to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="h-12 w-12 rounded-md border border-input text-base" />
                <InputOTPSlot index={1} className="h-12 w-12 rounded-md border border-input text-base" />
                <InputOTPSlot index={2} className="h-12 w-12 rounded-md border border-input text-base" />
              </InputOTPGroup>
              <div className="w-4" />
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={3} className="h-12 w-12 rounded-md border border-input text-base" />
                <InputOTPSlot index={4} className="h-12 w-12 rounded-md border border-input text-base" />
                <InputOTPSlot index={5} className="h-12 w-12 rounded-md border border-input text-base" />
              </InputOTPGroup>
            </InputOTP>

            <Button
              type="submit"
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 disabled:bg-foreground disabled:text-background disabled:opacity-100"
              disabled={!canSubmit}
            >
              Continue
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            Can't find the email? Check your spam folder, or{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="underline text-foreground font-medium"
            >
              re-enter your email and try again.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
