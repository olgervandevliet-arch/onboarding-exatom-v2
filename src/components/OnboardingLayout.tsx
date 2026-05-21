import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Logo from "@/components/Logo";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}

export const OnboardingLayout = ({ step, totalSteps, children }: OnboardingLayoutProps) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 flex flex-col bg-background">
        {/* Logo */}
        <div className="p-8">
          <Logo maxWidth="96px" />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-xl px-8 lg:px-24">
            {/* Progress bar */}
            <div className="mb-2">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-foreground mt-2">Step {step}/{totalSteps}</p>
            </div>

            <div className="mt-12">{children}</div>
          </div>
        </div>
      </div>

      {/* Right side placeholder */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="w-full h-[70vh] bg-muted rounded flex items-center justify-center">
          <ImagePlaceholder />
        </div>
      </div>
    </div>
  );
};
