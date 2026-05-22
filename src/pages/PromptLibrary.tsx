import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const prompts = [
  {
    id: 1,
    date: "21 mei 2026",
    tag: "Setup",
    title: "Project openen",
    prompt: "Open v2 onboarding exatom",
    result: "Claude opende de v2-directory en laadde het project in de editor.",
  },
  {
    id: 2,
    date: "21 mei 2026",
    tag: "Deploy",
    title: "Eerste deploy naar GitHub en Vercel",
    prompt: "Upload naar github en vercel",
    result: "Eerste commit gepusht naar GitHub en gedeployed naar onboarding-exatom-v2.vercel.app.",
  },
  {
    id: 3,
    date: "21 mei 2026",
    tag: "Pricing",
    title: "CTA tekst aanpassen",
    prompt: "Oké zo pak je bij de pricingpagina pas je nu aan dat de start free trial moet je aanpassen naar start today",
    result: "\"Start free trial\" vervangen door \"Start today\" op alle CTA-knoppen in de pricing kaarten.",
  },
  {
    id: 4,
    date: "21 mei 2026",
    tag: "Pricing",
    title: "Free tier: bezoeken harmoniseren",
    prompt: "Bij de Free Plan mag je zeggen, your limited sessions. Sowieso schudden ze monthly visits en form sessions. Formsdans mag je er helemaal uit halen. Het heeft eigenlijk alleen maar over monthly visits.",
    result: "\"Form sessions\" rij verwijderd uit de vergelijkingstabel. Terminologie geharmoniseerd naar \"website visits\".",
  },
  {
    id: 5,
    date: "21 mei 2026",
    tag: "Pricing",
    title: "Prijsstructuur en features aanpassen",
    prompt: "Ja, dus mag je bij het free plan van een limited website visits? We houden motley visits, moet worden website, motley website visits, zodat die volduidelijk is. Daarnaast pricing, eigenlijk willen we de pricing van 160 naar startprijs eigenlijk 59 euro. Duurste is 159 euro. Dat is voor de annual prijs, de motley prijs is wat duurder.",
    result: "Prijzen aangepast: Growth-tier start bij €59/mnd (annual) tot €159/mnd. Maandprijzen iets hoger. Annual/monthly toggle geïmplementeerd met aparte prijsreeksen per tier.",
  },
  {
    id: 6,
    date: "21 mei 2026",
    tag: "Pricing",
    title: "CTA, free features en prompt bibliotheek placeholder",
    prompt: "Call to action bij Growth Pakket. Mag voor de get started today. Bij het free pakket mag je nog zeggen, no credit card needed. Dat mag je bij de vinkjes toevoegen. De prompt bibliotheek bij v2 mag je nog leeg laten want daar komen we straks nieuwe prompts.",
    result: "Growth CTA: \"Get started today\". Feature toegevoegd aan free tier: \"No credit card needed\". Prompt bibliotheek aangemaakt als placeholder pagina.",
  },
  {
    id: 7,
    date: "21 mei 2026",
    tag: "Pricing",
    title: "Unlimited website visits",
    prompt: "Bij de free tier kan je gewoon zeggen dat er nu nog 5.000 staat. Dan kan je gewoon zeggen van unlimited website visits.",
    result: "\"5.000 monthly website visits\" gewijzigd naar \"Unlimited website visits\" in de free tier feature list.",
  },
  {
    id: 8,
    date: "21 mei 2026",
    tag: "UI-fix",
    title: "Info-icoon inline + geen streepjes in tooltips",
    prompt: "Ietje moest er wel naast komen de info in en maak ook nooit gebruik van streepjes in je ietjes als een in het teksel niet van de streepjes gebruikt maken",
    result: "InfoTip span gewijzigd van inline-flex naar inline align-middle zodat het icoon naast de tekst blijft staan. Em-dashes verwijderd uit alle tooltip-teksten.",
  },
  {
    id: 9,
    date: "21 mei 2026",
    tag: "Deploy",
    title: "Deploy + paginatitel",
    prompt: "Deploy naar github en vercel. Toen mag je nog even aanpassen naar Cheaper Than Wasted Leeds.",
    result: "Paginatitel gewijzigd naar \"Cheaper Than Wasted Leads\". Gecommit, gepusht en gedeployed.",
  },
  {
    id: 10,
    date: "21 mei 2026",
    tag: "Deploy",
    title: "Verkeerd Vercel-project gecorrigeerd",
    prompt: "Ho, hij moet echt live gaan naar v2 hè.",
    result: ".vercel/project.json wees nog naar het v1-project. .vercel map verwijderd en opnieuw gelinkt aan onboarding-exatom-v2. Zowel v1 als v2 correct verankerd aan eigen Vercel-project. Deploy structuur vastgelegd in memory.",
  },
  {
    id: 11,
    date: "22 mei 2026",
    tag: "Freemium",
    title: "Free trial vervalt — freemium model",
    prompt: "14-dagen free trial vervalt in nieuwe freemium structuur.",
    result: "Alle 7 verwijzingen naar \"trial\" systematisch opgespoord en verwijderd uit Pricing.tsx en GetStarted.tsx. \"Free plan\" is nu het permanente gratis instapniveau zonder tijdsbeperking.",
  },
  {
    id: 12,
    date: "22 mei 2026",
    tag: "Free vs Paid",
    title: "Plan-bewuste lock-logica",
    prompt: "Bij staf 4 Get-incent-uproofments. Hier heb je ook even een lock zetten als je hem via de gratis opent. Als je hem via de betaalde optie opent op de pricing-pagina dan niet. Dus daar moet je ook onderscheid tussen maken. De ene is Get Started Today bij het Growth plan en dan heb je dus alle betaalde features. Dus dan kan je ook die stap 4 Get improvements ook allemaal toepassen. Je hebt dus ook geen locks op al die menu kopjes. Maar als je voor de Get Started for Free kiest dan is er wel allemaal lockt. En dan is dus ook die stap 4 lockt. Dan gaat er ook een soort upgrade-button bij.",
    result: "localStorage-sleutel exatom_plan opgeslagen bij elke CTA-klik op de pricing-pagina (\"free\" of \"growth\"). GetStarted.tsx leest dit bij mount met isPaidPlan. Sidebar-locks conditioneel op !isPaidPlan. Step 4 toont upgrade-blok voor free users. \"Free plan\" badge en \"Upgrade your plan\" knop alleen zichtbaar voor free users. Zie het implementatieplan hieronder.",
    hasPlan: true,
  },
  {
    id: 13,
    date: "22 mei 2026",
    tag: "Step 4",
    title: "Instant improvements verfijningen",
    prompt: "Instant improvements: je moet ze ook kunnen skippen (zowel free als premium). Apply moet zijn > preview autofixes. Staging/testomgeving aanbieden voor auto-fixes. Vraag bij auto-fixes of gebruiker eigenaar is van de site. Pricing: Als je op het premium plan bent dan moet er niet staan free plan of de knop upgrade your plan. Bij de free plan moet het wel er staan. 5 Explore exatom: links celebrations, Exatom is klaar. Explore Your Forms with Eureka als primaire CTA.",
    result: "\"Apply autofixes\" hernoemd naar \"Preview autofixes\". Skip-knop toegevoegd voor beide plannen. Eigenaarsvraag toegevoegd bij autofixes: site-eigenaar krijgt directe activatie, bureau krijgt \"Preview & request approval\" flow. \"Free plan\" badge en \"Upgrade your plan\" alleen zichtbaar als !isPaidPlan. Step 5 herstructureerd naar twee-kolom layout.",
  },
  {
    id: 14,
    date: "22 mei 2026",
    tag: "Step 5",
    title: "Stap 5 vereenvoudigen",
    prompt: "Het Shire Drop-off insights kaartje kan helemaal niet, dus dat kan je weghalen. Your other free plan hebben ze eigenlijk ook al gemurkjerd naar upgrade bij de Get-Ist-Approved. Dat kan je ook weghalen. Planck is vooral dat ze die verwachting goed wordt gemanaged. Explore your forms with Eureka, dat is heel goed. En zie het in action, daar mag je gewoon veranderen naar view a dashboard with demo data.",
    result: "\"Share your drop-off insights\" kaart verwijderd (feature bestaat nog niet). \"You're on the free plan\" upgrade-blok verwijderd (al afgehandeld in stap 4). Drie case study-kaartjes vervangen door één knop: \"View a dashboard with demo data\". Kern van stap 5: Exatom is ready! + verwachtingsmanagement + Eureka CTA.",
  },
];

const bigFeedbackPrompt = {
  date: "22 mei 2026",
  raw: `Hieronder is dat verkregen feedback. Je gaat even een plan maken hoe je dit ook kan toepassen in het ontwerp van het dashboard.

Pricing pagina:
• Onduidelijkheid "sessions" vs "visits" → terminologie verduidelijken of harmoniseren in UI.
• Bezorgdheid prijsstijging bij hoge traffic door campagnes → communiceer duidelijk hoe tiers werken en wat er gebeurt bij tijdelijke pieken. → voeg toe als FAQ vraag

Account aanmaken & sign-up:
• Geen back button op het eerste onboarding scherm.
• Creditcard vereiste weghalen voor free plan → directe afhaker, ook voor bureaus die toestemming nodig hebben van co-owner of klant.

Survey / vragenuitvraag:
• Meerdere uitdagingsopties selecteerbaar maken i.p.v. verplichte één keuze → gebruikers hebben vaak meerdere uitdagingen tegelijk.
• Technisch profiel uitvragen (developer / marketeer / founder) → op basis hiervan flow aanpassen (developer → tag direct; marketeer → email developer flow). We moeten weten of ze toegang hebben tot GTM, Shopify, WordPress, de website code zelf of dat ze een developer nodig hebben. Op basis daarvan kunnen we een eerste aanbeveling doen.
• Bij website URL: alleen example.com zetten, niet https://www.
• Autofill aanzetten op naam veld, company, website url.
• Beelden toevoegen aan de rechterkant van de onboarding survey-schermen voor context en uitleg → lofi schetsen van grafieken etc. waar de toegevoegde waarde van Exatom duidelijk wordt.

Eerste popup:
• Hyphen verwijderen in "data-driven optimisation"

Tag installatie:
• Email to your developer: Preview van het bericht tonen vóór verzending, CC naar de gebruiker zelf toevoegen, persoonlijke notitie toevoegen mogelijk maken.
• Hernoemen van "Email developer" naar "Email to your developer".

Form toevoegen:
• Slechts 1 form in onboarding laten toevoegen — simplificatie, 80–90% van gebruikers heeft 1 prioriteitsform.
• "Add form manually" ipv "+ add form" bij add your first form.
• Conversion value slider: default op €100 zetten, slider logaritmisch maken tot €10.000, tooltip verduidelijken (gemiddelde per conversie, altijd aanpasbaar).
• Form ID verbergen, alleen naam tonen in de UI.
• Forms ordenen op domein in de keuzelijst.

Instant improvements & autofixes:
• Free users: alle instant improvements dimmen/blokkeren met duidelijke upgrade prompt. Preview zichtbaar maar niet activeerbaar.
• Marketing messages tonen voor alle features i.p.v. lege UI voor free tier (field metrics, session replays, industry benchmarks, autofixes, smart tooltips).
• Stap 5 (completion) samenvoegen tot één scherm: links congratulations message, rechts Eureka CTA.

Team uitnodiging:
• "Invite teammates" button prominenter maken.
• Geen rolselectie tijdens free plan → iedereen krijgt owner permissions.
• Delete knop toevoegen aan de rechterkant bij teammate invites.`,

  plan: [
    {
      area: "Pricing pagina",
      items: [
        "Terminologie geharmoniseerd: overal \"website visits\" (nooit meer \"sessions\" of \"form sessions\"). Form sessions-rij verwijderd uit vergelijkingstabel.",
        "FAQ-vraag toegevoegd over tijdelijke traffic-pieken en campagnes — met uitleg dat tiers op maandbasis gelden en dat je niet verrast wordt door één piekdag.",
      ],
    },
    {
      area: "Account aanmaken & sign-up",
      items: [
        "← Back link toegevoegd in CreateAccount.tsx, navigeert terug naar /pricing.",
        "Geen creditcard vereiste: \"No credit card needed\" toegevoegd als feature in de free tier feature list.",
      ],
    },
    {
      area: "Survey / vragenuitvraag",
      items: [
        "Multi-select uitdagingen: selectedChallenges gewijzigd van string naar string[]. Checkbox-achtige pill buttons, meerdere selecties mogelijk.",
        "\"Something else...\" open tekstveld toegevoegd als derde optie in de uitdagingslijst.",
        "Installatiewijze uitgevraagd als aparte stap met 5 pill-opties: GTM, Shopify, WordPress, Direct in code, Ik heb een developer nodig. Opgeslagen als exatom_install_method in localStorage.",
        "URL-placeholder gewijzigd naar \"example.com\" (zonder https://www).",
        "Autofill ingeschakeld: autoComplete=\"name\", \"organization\", \"url\".",
        "5 unieke inline SVG-illustraties toegevoegd aan het rechterpaneel van elk onboarding-scherm (funnelgrafieken, field heatmaps, session replay schets, etc.).",
      ],
    },
    {
      area: "Tag installatie",
      items: [
        "\"Email developer\" hernoemd naar \"Email to your developer\" overal in de UI.",
        "E-maildialoog uitgebreid: persoonlijke notitie invoerbaar, preview van de te versturen mail zichtbaar (niet aanpasbaar), CC automatisch naar gebruiker zelf.",
      ],
    },
    {
      area: "Form toevoegen",
      items: [
        "Onboarding beperkt tot 1 form. \"Add another form\" optie beschikbaar na onboarding.",
        "CTA gewijzigd naar \"Add form manually\" als fallback als crawl geen form vindt.",
        "Conversion value slider: logaritmisch van €1–€10.000, default €100, tooltip verduidelijkt dat het een gemiddelde indicatie is die altijd aanpasbaar blijft.",
        "Form ID verborgen in de UI, alleen de naam getoond.",
      ],
    },
    {
      area: "Instant improvements & free vs paid",
      items: [
        "isPaidPlan = localStorage.getItem(\"exatom_plan\") === \"growth\" als centrale conditionele variabele.",
        "Sidebar-locks: locked={!isPaidPlan && !!LOCKED_FEATURES[item.label]} — alleen gelockt voor free users.",
        "Step 4 voor free users: upgrade-blok met LockKeyhole icoon, uitleg en \"Upgrade to Growth\" knop + \"Skip for now\" link.",
        "Step 4 voor paid users: volledige autofix flow met eigenaarsvraag (directe activatie vs. bureau goedkeuringsflow).",
        "\"Free plan\" badge en \"Upgrade your plan\" knop conditioneel: alleen zichtbaar als !isPaidPlan.",
      ],
    },
    {
      area: "Team uitnodiging",
      items: [
        "\"Invite teammates\" knop prominenter geplaatst in de sidebar en de Need Help sectie.",
        "Rolselectie verwijderd voor free plan — iedereen krijgt owner permissions.",
        "Delete knop toegevoegd aan de rechterkant van elke genodigde in de invite-lijst.",
      ],
    },
  ],
};

const tagColors: Record<string, string> = {
  Setup: "bg-muted text-muted-foreground",
  Deploy: "bg-blue-50 text-blue-700",
  Pricing: "bg-amber-50 text-amber-700",
  "UI-fix": "bg-purple-50 text-purple-700",
  Freemium: "bg-green-50 text-green-700",
  "Free vs Paid": "bg-orange-50 text-orange-700",
  "Step 4": "bg-rose-50 text-rose-700",
  "Step 5": "bg-teal-50 text-teal-700",
  Feedback: "bg-indigo-50 text-indigo-700",
};

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
        <p className="text-base text-muted-foreground mb-4 max-w-xl">
          Een volledig overzicht van alle prompts waarmee de Exatom onboarding v2 is gebouwd — van eerste opzet tot live product.
        </p>
        <p className="text-sm text-muted-foreground mb-16 max-w-xl">
          Elke prompt toont de exacte invoer die werd gebruikt, gevolgd door wat er daadwerkelijk mee werd gebouwd. De grote feedback-ronde van 22 mei staat uitgewerkt met het volledige implementatieplan.
        </p>

        {/* Regular prompts 1–11 */}
        <div className="space-y-6 mb-16">
          {prompts.filter((p) => p.id <= 11).map((p) => (
            <div key={p.id} className="border border-border rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground">#{p.id}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[p.tag] ?? "bg-muted text-muted-foreground"}`}>
                  {p.tag}
                </span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
              <h2 className="text-base font-bold text-foreground">{p.title}</h2>
              <div className="bg-surface rounded-lg p-4 border border-dashed border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Prompt</p>
                <p className="text-sm text-foreground italic">"{p.prompt}"</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Wat er mee gebouwd werd</p>
                <p className="text-sm text-muted-foreground">{p.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BIG FEEDBACK PROMPT */}
        <div className="border-2 border-foreground rounded-xl p-8 mb-16 space-y-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground">#12</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors["Feedback"]}`}>
              Feedback
            </span>
            <span className="text-xs text-muted-foreground">{bigFeedbackPrompt.date}</span>
            <span className="text-xs font-semibold bg-foreground text-background px-2 py-0.5 rounded-full ml-auto">
              Grote feedback-ronde
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">26-punts product feedback</h2>
            <p className="text-sm text-muted-foreground">
              Na de eerste live versie werd een uitgebreide feedbackronde gehouden. Alle 26 punten werden in één prompt aangeboden met het verzoek een implementatieplan te maken en daarna alles tegelijk te bouwen.
            </p>
          </div>

          {/* Raw prompt */}
          <div className="bg-surface rounded-xl p-6 border border-dashed border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Volledige prompt (originele tekst)</p>
            <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
              {bigFeedbackPrompt.raw}
            </pre>
          </div>

          {/* Implementation plan */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Implementatieplan dat hieruit voortkwam</p>
            <div className="space-y-6">
              {bigFeedbackPrompt.plan.map((section) => (
                <div key={section.area}>
                  <p className="text-sm font-bold text-foreground mb-2">{section.area}</p>
                  <ul className="space-y-1.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regular prompts 12–14 */}
        <div className="space-y-6">
          {prompts.filter((p) => p.id >= 12).map((p) => (
            <div key={p.id} className="border border-border rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground">#{p.id + 1}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[p.tag] ?? "bg-muted text-muted-foreground"}`}>
                  {p.tag}
                </span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
                {p.hasPlan && (
                  <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    Incl. plan
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-foreground">{p.title}</h2>
              <div className="bg-surface rounded-lg p-4 border border-dashed border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Prompt</p>
                <p className="text-sm text-foreground italic">"{p.prompt}"</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Wat er mee gebouwd werd</p>
                <p className="text-sm text-muted-foreground">{p.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Meta card */}
        <div className="mt-16 border border-border rounded-xl p-6 bg-surface space-y-2">
          <p className="text-sm font-bold text-foreground">Over deze bibliotheek</p>
          <p className="text-sm text-muted-foreground">
            Alle prompts zijn afkomstig uit één Claude Code-sessie op 21–22 mei 2026. Elke prompt werd direct omgezet in code — geen tussenliggende wireframe-stap. De gehele onboarding v2 is het resultaat van deze reeks iteraties.
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
