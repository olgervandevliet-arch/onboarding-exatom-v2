import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const PromptLibrary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-border py-5 px-6 flex items-center justify-between">
        <Logo maxWidth="96px" onClick={() => navigate("/pricing")} />
        <button
          onClick={() => navigate("/pricing")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Terug naar Pricing
        </button>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
          Documentatie
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Prompt Bibliotheek
        </h1>
        <p className="text-base text-muted-foreground mb-16 max-w-xl">
          Een overzicht van alle prompts die zijn gebruikt om de Exatom onboarding te bouwen.
        </p>

        <div className="border border-dashed border-border rounded-xl p-12 text-center">
          <p className="text-sm font-medium text-foreground mb-2">Nieuwe prompts komen binnenkort</p>
          <p className="text-sm text-muted-foreground">
            De prompt bibliotheek wordt binnenkort aangevuld met een volledig overzicht van alle gebruikte prompts.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <Logo maxWidth="64px" opacity />
          <p>© {new Date().getFullYear()} Exatom. Cookieless form analytics.</p>
        </div>
      </footer>
    </div>
  );
};

export default PromptLibrary;
