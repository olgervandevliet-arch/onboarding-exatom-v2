import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const showPasswordFields = email.length > 0;

  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const passwordValid = criteria.length && criteria.uppercase && criteria.number;
  const canSubmit = email && passwordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) navigate("/verify-email", { state: { email } });
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
              Let's get you started
            </h1>
            <p className="mt-2 text-muted-foreground">
              Securely create your account in seconds.
            </p>
          </div>

          {/* Google login */}
          <Button
            variant="social"
            size="lg"
            className="w-full"
            onClick={() => navigate("/onboarding?social=true")}
          >
            <GoogleIcon />
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email + password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            {showPasswordFields && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <ul className="space-y-1 pt-1 text-xs text-muted-foreground">
                  <li className={criteria.length ? "text-foreground" : ""}>
                    • At least 8 characters
                  </li>
                  <li className={criteria.uppercase ? "text-foreground" : ""}>
                    • One uppercase letter
                  </li>
                  <li className={criteria.number ? "text-foreground" : ""}>
                    • One number
                  </li>
                </ul>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:bg-foreground disabled:text-background disabled:opacity-100"
              disabled={!canSubmit}
            >
              Sign up
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline text-foreground">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline text-foreground">Privacy Policy</a>.
          </p>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <a href="#" className="underline text-foreground font-medium">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default CreateAccount;
