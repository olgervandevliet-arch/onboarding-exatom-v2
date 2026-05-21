import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const prompts = [
  {
    number: 1,
    title: "Lo-fi Figma uitwerking",
    content: `Ik heb een figma link voor een lo-fi onboarding jij gaat deze verder uitwerken. Het gaat nog puur om de lo-fi uitwerking.\nhttps://www.figma.com/design/ymvSQRLFFWpgg7R2bKpf7u/Exatom-onboarding?node-id=10213-17283&m=dev&t=UaxJBVojSeO8qfAq-1`,
    context: "Gebruikt om de initiële opzet van de onboarding te starten op basis van een Figma lo-fi design. De structuur van de pagina's (Pricing, CreateAccount, VerifyEmail, Onboarding, GetStarted) is hier direct uit voortgekomen.",
  },
  {
    number: 2,
    title: "PDF uitwerking",
    content: `Hier is de PDF werk deze eerst helemaal uit, daarna pas gaan we features bijbouwen. [User attached an image]`,
    context: "Een bijgevoegde PDF of afbeelding diende als visuele basis. De volledige uitwerking van de Get Started pagina met de 5 accordeon-stappen is hierop gebaseerd.",
  },
  {
    number: 3,
    title: "Action Items vanuit meeting",
    content: `Action Items\n[meeting Notion implemented] Pas dashboard aan op basis van meeting notes *Verwijderd*`,
    context: "Notion meeting notes zijn geïmporteerd als action items. Aanpassingen aan het dashboard zijn doorgevoerd op basis van deze meeting output.",
  },
  {
    number: 4,
    title: "Get Started pagina verbeteringen",
    content: `Mark as complete mag niet bij: Connect your website, Add your form\nNeed help moet gewoon helemaal onderaan komen te staan onder de 5 accordeon items (niet in de items zelf)\nBij add form moet er een popup komen voor het formulier, dit mag je ook wat mooier ordenen. Hoeft niet precies zoals in screenshot. Wel zelfde velden.\nMaar beschrijving mag weg.\nConversion value mag een slider worden met automatisch op €5.000\nCategorie mag select worden met icons, allemaal naast elkaar\nAdditional URL's mag onder expert options\n1 CTA die is gewoon voeg velden toe\nde velden mogen als extra optie onder de advanced options komen\nMaak stappen tussen form toevoegen en bedankt pagina. stap 1 en 2 binnen de form toevoegen.\nBij expert options ook velden in screenshot toevoegen\nAls je geen bedankt pagina hebt moet je een tag plaatsen op de pagina van het formulier zelf.\nKortom: keep it simple, het moet super simpel zijn om een form toe te voegen\nConnect your website\nOther ways to install Exatom voeg iconen toe van Google Tag Manager, Shopify, Wordpress, email (envelope icon). Anders gewoon de echte zwart-wit logo's gebruiken van die bedrijven.\nMaak ook popups voor deze functionaliteiten\nInvite a team member:\nMaak een popup en maak dit zoals screenshot 2. Leer hier puur van functionaliteit, verder in de stijl die we nu ook gebruiken. Maar je mag het ook wel wat simpeler maken. [User attached 2 images]`,
    context: "Grote iteratieronde op de Get Started pagina. Resultaat: popup voor form toevoegen met slider voor conversion value, categorieselectie met iconen, stappenoverzicht in de popup, 'Need help' sectie onderaan, en uitgebreide install-opties voor Connect Your Website inclusief Google Tag Manager / Shopify / WordPress iconen.",
  },
  {
    number: 5,
    title: "UX aanpassingen",
    content: `Completed tekst moet naast de bar komen\nDe accordeons moeten gewoon full width worden als het scherm groter wordt\nSkip for now moet blijven, maar je moet niet de 'skipped state' geven. Gewoon dichtklappen en doorgaan.\nBij de onboarding vul je je naam en bedrijfsnaam in, deze moet je meenemen in het dashboard.\nAsk eureka lichtgrijze...`,
    context: "Verfijning van de UX: progress bar tekst geplaatst naast de balk, full-width accordeons op grotere schermen, skip-gedrag aangepast (geen skipped state), naam en bedrijfsnaam doorgegeven vanuit onboarding naar dashboard.",
  },
  {
    number: 6,
    title: "Geen thank you pagina – tag installatie",
    content: `Als je geen no thank you page hebt moet je nog een tag installeren. Je moet hierbij ook meer uitleg geven. Met verschillende stappen beetje hetzelfde als de tag plaatsen bij connect your website. Hierbij ook een verifieer knop plaatsen etc. ook een info knop en button plaatsen naar documentatie.`,
    context: "Extra stap toegevoegd in de form-popup: als er geen bedankpagina is, moet een conversie-tag worden geplaatst. Stappenplan met verificatieknop en documentatielink is hier uitgewerkt.",
  },
  {
    number: 7,
    title: "Vereenvoudiging tag-installatie stappen",
    content: `Je hoeft niet verschillende stappen te maken gewoon onder elkaar. Dit mag korte uitleg zijn zoals ook bij connect your website. Copy the code mag rechts van code komen. Read documentation moet altijd te zien zijn.`,
    context: "De stappen voor tag-installatie zijn vereenvoudigd: niet meer als wizard-stappen maar als een doorlopende uitleg, met 'Copy code' als inline knop en een permanente documentatielink.",
  },
  {
    number: 8,
    title: "Eindpopup: verwachtingen managen",
    content: `Bij de eindpopup als alles is gelukt moet je zeggen dat het vaak een paar dagen duurt voor je relevante data hebt verzameld. Je kan de persoon daarna ook sturen naar performance alerts.`,
    context: "De succespopup aan het einde van de onboarding is uitgebreid met een melding dat data verzameling een paar dagen duurt, inclusief een CTA naar Performance Alerts.",
  },
  {
    number: 9,
    title: "Add form – kleine aanpassingen",
    content: `Add form\nNaam van de form boven de URL\ndelete form: geen kleur gewoon grijs logo van prullenbak.`,
    context: "Volgorde in de form-popup aangepast (naam boven URL), delete-icoon gewijzigd naar grijs prullenbak-icoon zonder accentkleur.",
  },
  {
    number: 10,
    title: "Add form popup – stappen en velden herzien",
    content: `Bij add form popup:\nAlleen 2 stappen tonen. stap 1: Add your form, stap 2: track conversion\nDelete titel add form en ondertitel configure...\nForm URL moet onder de naam staan. Klein en met een pennetje ernaast van edit, dan moet je hem kunnen aanpassen. Moet niet zoveel aandacht krijgen.\nName: moet worden meer beschrijvende vraag worden.`,
    context: "Popup teruggebracht naar 2 stappen. Titel en subtitel verwijderd. Form URL klein weergegeven met edit-icoon. De naam-vraag is omgevormd tot een beschrijvende vraag.",
  },
  {
    number: 11,
    title: "Edit URL als extra veld",
    content: `De edit link van de url van het form moet gewoon een extra edit field worden zoals ook de naam.`,
    context: "URL-bewerking uitgewerkt als een volwaardig edit-veld, consistent met het naam-veld.",
  },
  {
    number: 12,
    title: "Edit URL alleen zichtbaar bij klik op pen",
    content: `Janee dit moet alleen zichtbaar zijn als je op de pen edit icon klikt van de link\nNormaal gewoon klein onder de naam van de form. met pen icoon\nWanneer je klikt op de pen icoon komt de edit field`,
    context: "Gedrag gecorrigeerd: URL wordt standaard klein getoond met een pen-icoon. Het edit-veld verschijnt alleen na klikken op het icoon.",
  },
  {
    number: 13,
    title: "Info tooltips bij Connect your website stappen",
    content: `Bij 1. Connect your website:\nPlaats van elke stap a, b, c daarnaast een i met info popup bij hover.`,
    context: "Bij elke sub-stap van de Connect Your Website sectie is een info-icoon (i) toegevoegd met een hover-tooltip voor extra uitleg.",
  },
  {
    number: 14,
    title: "Copy code – gekopieerde state",
    content: `Als je op copy code klikt moet de button daarna op copied staan met vinkje en outline en gewoon 2nd cta. Je kan er nog steeds wel op klikken`,
    context: "De Copy code knop toont na klikken een 'Copied ✓' staat als secondary CTA, maar blijft klikbaar.",
  },
  {
    number: 15,
    title: "Velden in survey te kort",
    content: `Bij stap voor van de survey zijn de velden korter dan de tekst. De velden moet zo groot zijn als de tekst.`,
    context: "Input-velden in de survey-stappen zijn uitgebreid tot de volledige breedte van de bijbehorende labels.",
  },
  {
    number: 16,
    title: "Create account – social login en layout",
    content: `Bij create account moet je er eerst de social logins doen en dan login met mail en pas de button laten zien van continue met mail als het e-mailadres ook is ingevuld.\nDaarnaast hoeft de afbeelding niet volledige hoogte te zijn, maar kan deze gewoon vierkant worden en naast het login veld worden geplaatst. Dit moeten even zwart wit visuals worden van wat je straks krijgt iets met een form animatie. maar dan afbeelding.\nDaarnaast rechtsboven toevoegen iets van 'already have an account?' > dan 2cta met login knop\nDaarnaast pas tekst van de onderline van create account.\nBij de survey vragen mag je ook zwart wit visuals maken lofi afbeelding van ui`,
    context: "Create account pagina volledig herontworpen: social login eerst, e-mail veld toont continue-knop pas na invullen, vierkante zwart-wit visual naast het formulier, 'Already have an account?' rechtsboven.",
  },
  {
    number: 17,
    title: "Login rechtsbovenin, visuals vervangen",
    content: `Login button moet echt helemaal rechtsboven komen.\nAlle visuals vervangen door simpele grijze afbeelding met berg op de achtergrond.`,
    context: "Login-knop verplaatst naar rechtsbovenhoek. Visuals vervangen door eenvoudige grijze berglandschap-afbeeldingen.",
  },
  {
    number: 18,
    title: "Create account – centreren",
    content: `Bij create account gewoon midden centreren en rechtsafbeelding en vlak weghalen. login wel houden`,
    context: "Formulier op create account gecentreerd. Afbeelding en achtergrondvlak verwijderd. Login-knop blijft behouden.",
  },
  {
    number: 19,
    title: "Logo vervangen",
    content: `Dit moet het logo worden. Verander overal [User attached an image]`,
    context: "Het Exatom logo is overal in de applicatie vervangen door het nieuwe aangeleverde logo.",
  },
  {
    number: 20,
    title: "Logo max-breedte 120px",
    content: `Logo max breedte 120px`,
    context: "Max-width van het logo ingesteld op 120px voor consistente weergave.",
  },
  {
    number: 21,
    title: "Create account – tekst centreren",
    content: `Create account en subtekst midden gecentreerd`,
    context: "Titel en subtitel van de create account pagina zijn gecentreerd.",
  },
  {
    number: 22,
    title: "Logo max-breedte 96px",
    content: `Logo max breedte 96px`,
    context: "Max-width van het logo bijgesteld van 120px naar 96px.",
  },
  {
    number: 23,
    title: "Vereenvoudiging team uitnodigingen & onboarding",
    content: `Vereenvoudiging van team member uitnodigingen: geen rolselectie meer, iedereen krijgt owner permissions tijdens free trial dus naam + e-mailadres uitvragen\nWebsite URL al vragen in de survey (stap 3 of 4) zodat deze beschikbaar is voor latere automatisering\nFormulier Implementatie: Slechts één formulier laten toevoegen in onboarding in plaats van meerdere voor simplificatie\nQua tekst ook: Add your first form\nForm Analysis & Waarde Levering\nForm score presenteren als quickscan "while data is being collected" om verwachtingen te managen\nIdealiter autofixes al tonen op basis van HTML-scan voordat er traffic data is\nSmart tooltips kunnen direct toegevoegd worden als eerste conversie-verhogende actie\nOnboarding moet sequentieel doorlopen worden om tech installatie te belonen met toegang tot analyse`,
    context: "Grote strategische ronde: team-uitnodiging vereenvoudigd (geen rollen), website URL eerder uitgevraagd in de survey, slechts 1 form in onboarding, quickscan-score als placeholder terwijl data wordt verzameld, autofixes op basis van HTML-scan.",
  },
  {
    number: 24,
    title: "Add your first form – meerdere forms en popup verbeteringen",
    content: `2. Add your first form\nLaat er wel meerdere zien, en ga er nu vanuit dat er meerdere forms gevonden zijn (10+), maar je laat alleen de 3 belangrijkste zien en dan ook een knop om de andere te laten zien.\nPopup: De stappen daar de titels veel groter van maken zo groot als de tekst ook is die je in de accordeons vindt, deze mogen dan ook onder de cijfers komen te staan.\nDe URL alleen editable maken als je op de link onder de naam van de form klikt\nExpert options helemaal weghalen.\nQuickscan your form: Select form kan weg als je een formulier hebt geselecteerd.\nAls je op run quickscan klikt dan pas daarna de autofixes laten zien.\nGet instant form improvements: Add smart tooltips uitwerken.`,
    context: "Forms-sectie uitgebreid: top 3 getoond met 'toon meer' knop. Popup-staptitels groter gemaakt. Expert options verwijderd. Quickscan pas na klikken op 'Run quickscan'. Smart tooltips popup uitgewerkt.",
  },
  {
    number: 25,
    title: "Shopify plugin & form toevoegen verbeteringen",
    content: `1 Connect your website: Bij Shopify hebben we een plugin, deze moet je installeren. De pluginlink is https://apps.shopify.com/exatom-checkout-analytics?locale=nl de main CTA moet ook zijn dat je naar deze pagina gaat.\nHet stappenplan moet ook deze stappen zijn. Niet de tag zelf plaatsen, gewoon plugin installeren\nEmail developer > Email your developer\nEmail your developer het message\nAdd your first form: Add your first form er moet ook een optie komen om een niet gevonden form toe te voegen, dus gewoon add another form. Ookal zijn er forms gevonden, beide altijd laten zien\nForm: Altijd twee velden a) What do you want to call this form? b) Form URL > deze moet ALTIJD editable zijn. Behalve als deze is ingevuld, dan moet je op een pennetje rechts binnen het veld klikken om hem te editen.\nForm fields moeten wel beschikbaar zijn als een klapuit onder categorie`,
    context: "Shopify-integratie aangepast naar plugin-installatie flow. 'Add another form' knop altijd zichtbaar. Form-velden (naam + URL) gestandaardiseerd. URL edit via pen-icoon in het veld zelf.",
  },
  {
    number: 26,
    title: "Form crawlen & quickscan rapport",
    content: `2. Add your form: Zodra je een form hebt toegevoegd moet je geen forms meer kunnen toevoegen\nHet is niet aannemelijk dat er gelijk forms worden gevonden. Maak een button dat je een kan crawlen om forms te vinden op je website, dan pas laten zien.\nBij conversion tag bij thank you URL placeholder alleen /thank-you als placeholder doen\nQuickscan your form: Je mag wel ook de groene kleur gebruiken als het goed is.\nVolledig rapport in popup exact zo maken als in screenshot. Niet exact, maar vooral qua inhoud. Visueel mag je het beter doen.\nBij je full quickscan moet je aan de bovenkant ook laten zien welke potentieel er is om te verbeteren qua mogelijke conversiegroei. En mogelijk winst op basis van conversie value\nWaarde moet echt blijken uit deze stap wat er te optimaliseren valt.\nGet instant improvements: Toegevoegde waarde moet ook zichtbaar zijn als de autofixes / smart tooltips zijn toegepast. Je moet ook het percentage toevoegen wat het potentieel is op basis van best practices van meerdere andere bedrijven. Je moet ze ook kunnen deactiveren.`,
    context: "Crawl-functie toegevoegd voor form-detectie. Quickscan rapport uitgewerkt met conversiegroei-potentieel en winstberekening. Autofixes en smart tooltips kunnen worden geactiveerd en gedeactiveerd.",
  },
  {
    number: 27,
    title: "Welcome popup – conversie-focus",
    content: `Bij de welcome popup moet gelijk in de titel duidelijk worden dat we de conversie op je form wordt geboost. Ook moet duidelijk worden dat het om een trial gaat waarbij je gelijk dingen gaat toepassen die form conversions gaan boosten (je mag ook wel wat percentages noemen met potentieel op basis van onze eigen data)`,
    context: "Welcome popup herschreven met focus op conversie-boost. Concrete percentages en trial-context toegevoegd aan de openingstekst.",
  },
  {
    number: 28,
    title: "Already have an account – beschikbaar in survey",
    content: `Already have an account moet beschikbaar zijn, ook tijdens de survey vragen`,
    context: "'Already have an account?' link/knop is toegevoegd aan alle survey-stappen, niet alleen op de eerste pagina.",
  },
  {
    number: 29,
    title: "Survey – e.g. weghalen",
    content: `Bij de survey vragen mag e.g. weg`,
    context: "De tekst 'e.g.' is verwijderd uit de survey-vragen voor een schonere formulering.",
  },
  {
    number: 30,
    title: "Already have an account – positie",
    content: `Already have an account staat op het eerste scherm echt perfect bij create account. Dit moet precies zo staan op de andere survey schermen. Ook helemaal rechts bovenin`,
    context: "De 'Already have an account?' knop is op alle survey-schermen rechtsbovenin geplaatst, consistent met het create account scherm.",
  },
  {
    number: 31,
    title: "Social login werkend maken",
    content: `Je moet de social login ook even werkende maken. Als in als je hier op klikt dan moet je ook naar de volgende pagina gaan.`,
    context: "Social login knoppen zijn functioneel gemaakt: klikken leidt naar de volgende stap in de flow.",
  },
  {
    number: 32,
    title: "Social login – naam automatisch overnemen",
    content: `Als je inlogt met social login dan pakt hij al automatisch je naam mee. Daarom kan hierbij stap 1 gelijk worden overgeslagen en ingevuld, vul hier dan nu voor de dummy 'Stephan van den Bremer' in. Als je via mail gaat dan wel stap 1 laten zien`,
    context: "Social login simuleert het ophalen van de naam (dummy: 'Stephan van den Bremer'). Stap 1 van de survey (naam invullen) wordt overgeslagen bij social login.",
  },
  {
    number: 33,
    title: "Uitloggen & reset onboarding",
    content: `In het account zelf moet er een functie komen rechtsboven dat je ook kan uitloggen of even doet reset onboarding. Dit is puur voor het testen. Dus dropdown met deze 2 opties`,
    context: "Rechtsboven in het dashboard is een dropdown toegevoegd met 'Uitloggen' en 'Reset onboarding' voor testdoeleinden.",
  },
  {
    number: 34,
    title: "Conversion value slider",
    content: `Bij add a new form popup: Je moet de conversion value kunnen toevoegen doe van 0 naar 50000 € met stappen van €500, gewoon een slider. En hij moet standaard staan op €5000`,
    context: "Conversion value veld vervangen door een slider (0–€50.000, stappen van €500, standaard €5.000) in de form-popup.",
  },
  {
    number: 35,
    title: "Detected form fields aanpassen",
    content: `Bij de dropdown van detected form fields moet je ze ook kunnen aanpassen zoals op de screenshot [User attached an image]`,
    context: "In de dropdown van gedetecteerde form-velden is edit-functionaliteit toegevoegd op basis van de meegestuurde screenshot.",
  },
  {
    number: 36,
    title: "Velden compacter naast elkaar",
    content: `Het mag ook naast elkaar zodat het allemaal wat compacter is`,
    context: "Form-velden zijn naast elkaar geplaatst voor een compactere weergave.",
  },
  {
    number: 37,
    title: "Edit/oog/prullenbak iconen per veld",
    content: `Nee de fields zelf wel onder elkaar. Maar de edit knopjes van pennetje (hiermee kan je de velden aanpassen), oogje (hiermee maak je hem onzichtbaar) en prullenbakje (hiermee verwijder je dit veld). Functies mag je ook werkende maken. Maar deze 3 kleine knopjes mogen naast elkaar, de fields wel gewoon onder elkaar`,
    context: "Velden staan onder elkaar. Per veld drie iconen naast elkaar: pen (bewerken), oog (verbergen), prullenbak (verwijderen). Alle drie zijn functioneel gemaakt.",
  },
  {
    number: 38,
    title: "Conversiepercentages bijstellen",
    content: `Momenteel bij de eerste intro popup: en ook later bij instant improvements zie je dat je een average geeft van +12% conversie bij autofixes en +8% bij smart tooltips. Dit is wat te hoog. De uiteindelijke optimalisatie zit dan ook in de verdere optimalisatie nog. Hier mag je in de eerste popup wat meer aandacht aan geven en daarna ook bij explore exatom wat er daarna nog meer mogelijk is. Uiteindelijk doel is natuurlijk dat ze gaan upgraden naar het pro plan om ook deze conversie boost te gaan verwezenlijken`,
    context: "Conversiepercentages naar beneden bijgesteld. Intro popup en Explore Exatom sectie uitgebreid met upsell-boodschap richting het pro plan.",
  },
  {
    number: 39,
    title: "Quickscan – hoger verbeterpotentieel",
    content: `Bij de quickscan moet er natuurlijk wel een hoger potentieel zijn qua improvement potentieel, dus autofixes + smart tooltips + nog latere optimalisaties`,
    context: "Quickscan rapport toont nu het totale verbeterpotentieel inclusief autofixes, smart tooltips én toekomstige optimalisaties.",
  },
  {
    number: 40,
    title: "Mobile responsive",
    content: `Maak alles mobile responsive`,
    context: "Gehele applicatie mobile-responsive gemaakt met Tailwind breakpoints en aangepaste layouts voor kleine schermen.",
  },
  {
    number: 41,
    title: "Logo klikbaar naar pricing",
    content: `Op de onboarding als ik op het logo van Exatom klik moet ik dus wel naar de pricing pagina terug kunnen gaan.`,
    context: "Exatom logo in de onboarding is klikbaar gemaakt en navigeert naar de pricing pagina.",
  },
  {
    number: 42,
    title: "Pricing – CTA aanpassingen",
    content: `Bij enterprise mag de 2nd button met let's talk weg.\nBij growth mag de main CTA zijn Start 7 day free trial`,
    context: "Enterprise: tweede 'Let's talk' knop verwijderd. Growth: hoofd-CTA gewijzigd naar 'Start 7 day free trial'.",
  },
  {
    number: 43,
    title: "Bezoekerslimieten per plan",
    content: `Growth is up to 50.000 monthly visits. Enterprise is vanaf 50.000 monthly visits`,
    context: "Bezoekerslimiet-beschrijvingen bijgewerkt: Growth tot 50K, Enterprise vanaf 50K monthly visits.",
  },
  {
    number: 44,
    title: "Pricing layout – vinkjes en toggle",
    content: `Vinkjes moeten allemaal op gelijke hoogte komen te staan\nDe beschrijving moet allemaal onder de naam van het plan komen te staan en dan allemaal max 2 regels\nVoeg een monthly / yearly toggle toe. Yearly is 30% korting`,
    context: "Pricing kolommen uitgelijnd: vinkjes op gelijke hoogte, beschrijving max 2 regels. Monthly/yearly toggle toegevoegd met 30% korting op yearly.",
  },
  {
    number: 45,
    title: "Titels groter en content uitgelijnd",
    content: `Titels iets groter\nAlle content van de drie pakketten op dezelfde hoogte ordenen.`,
    context: "Plantitels vergroot. Content van alle drie pakketten verticaal uitgelijnd zodat vergelijkbare informatie op dezelfde hoogte staat.",
  },
  {
    number: 46,
    title: "Kolommen even groot",
    content: `Kolommen wel allemaal even groot maken`,
    context: "De drie pricing-kolommen zijn gelijkgemaakt in breedte.",
  },
  {
    number: 47,
    title: "Yearly standaard, getallen animeren",
    content: `Standaard op yearly zetten (yearly moet worden annual)\nKorting kan je weghalen\nAnimeer de getallen als er een aanpassing is.\nBij growth pakket moeten wel iets meer vinkjes staan dan bij free.\nBij free krijgen ze inzicht tot max 5.000 form sessions per maand.`,
    context: "Jaarlijks abonnement is standaard geselecteerd en hernoemd naar 'Annual'. Korting-badge verwijderd. Prijsanimatie toegevoegd bij toggle. Growth heeft meer features dan Free. Free beperkt tot 5.000 form sessions/maand.",
  },
  {
    number: 48,
    title: "Plan beschrijvingen herdefiniëren",
    content: `Het verschil tussen Free en Growth is dat bij Free krijg je inzicht hoeveel mensen er afhaken en waar ze afhaken. Bij Growth krijg ik de tooling mee om dit op te lossen. Dus om echt de conversie te verhogen. Dit mag je aanpassen in alle beschrijvingen. Daarnaast mag je het beeld hier weghalen. Daarnaast kijk ik kritisch naar de vinkjes die hier nu staan. We hebben nu veel vinkjes met allemaal features. Een te groot overdaad aan informatie. Dus wil je hier wat inkorten en kijken: welke features zijn relevant voor de potentiële ICP? Waar het verschil is tussen Free en Growth daarin. Dus ik kort hier overal wat vinkjes op en doe een kritisch onderzoek hoe we dit kunnen verbeteren.\nDaarnaast book a demo > Get a demo`,
    context: "Plan-beschrijvingen herschreven: Free = inzicht in afhakers, Growth = tooling om conversie te verhogen. Visuele afbeeldingen verwijderd. Feature-lijst ingekort tot meest relevante. 'Book a demo' → 'Get a demo'.",
  },
  {
    number: 49,
    title: "(billed annually) tekst weghalen",
    content: `(billed annually) die tekst na Up to 10,000 monthly visits mag even weg.`,
    context: "De tekst '(billed annually)' onder de prijs is verwijderd.",
  },
  {
    number: 50,
    title: "Geen streepje bij beschrijving",
    content: `Geen streepje bij de beschrijving -`,
    context: "Het koppelteken/streepje aan het begin van plan-beschrijvingen is verwijderd.",
  },
  {
    number: 51,
    title: "Logo terug naar pricing",
    content: `Als je op het Exatom logo klikt moet je terug kunnen naar de pricing page`,
    context: "Logo is overal klikbaar gemaakt en navigeert terug naar de pricing pagina.",
  },
  {
    number: 52,
    title: "Logo op register page & menu stijl",
    content: `Ook op de register page moet hij terug gaan naar pricing. En logo moet dan even groot blijven. Menu bij pricing mag beetje worden zoals in bijgevoegde foto. Logo wel houden [User attached an image]`,
    context: "Logo op register/create account pagina klikbaar naar pricing. Navigatiemenu bij pricing gestyled conform de meegestuurde afbeelding.",
  },
  {
    number: 53,
    title: "Compare plans tabel stijl",
    content: `Daaronder bij compare plans mag worden zoals bijgevoegde afbeelding. [User attached an image]`,
    context: "De 'Compare plans' tabel onderaan de pricing pagina is visueel aangepast aan de meegestuurde afbeelding.",
  },
  {
    number: 54,
    title: "Vinkjes zwart bolletje wit vinkje",
    content: `Geen groene vinkjes gebruiken maar vinkjes met zwart bolletje wit vinkje`,
    context: "Alle groene vinkjes vervangen door zwarte cirkels met een wit vinkje.",
  },
  {
    number: 55,
    title: "Oude prijs tonen bij annual",
    content: `Laat bij annual ook oude prijs zien zoals in afbeelding [User attached an image]`,
    context: "Bij annual-weergave wordt de doorgestreepte maandprijs getoond naast de kortingsprijs.",
  },
  {
    number: 56,
    title: "Plan positionering herdefiniëren",
    content: `Free moet gewoon echt zijn alleen dat je ziet waar je bezoekers afhaken. Growth is volledig inzicht, en fix wat is broken en boost conversions. Enterprise is dit ook met alles voor je gedaan.`,
    context: "Duidelijke positionering: Free = waar bezoekers afhaken, Growth = volledig inzicht + fix + boost, Enterprise = alles inclusief begeleiding.",
  },
  {
    number: 57,
    title: "Enterprise beschrijving verfijnen",
    content: `Full insights en directe activations to boost conversions. Enterprise is meer dat je ook consultancy erbij krijgt etc maar niet door een CRO team. Dus niet alles wordt voor je gedaan. Maar schrijf even positief op`,
    context: "Enterprise omschrijving bijgesteld: consultancy en begeleiding zonder dat het 'alles voor je gedaan' impliceert.",
  },
  {
    number: 58,
    title: "Growth en Enterprise tekst aanscherpen",
    content: `Growth: nog wel iets met fix drop offs.\nEnterprise: Gewoon voor welke bedrijven dit zijn.`,
    context: "Growth beschrijving aangescherpt met 'fix drop-offs'. Enterprise beschrijving verduidelijkt met doelgroepomschrijving.",
  },
  {
    number: 59,
    title: "Pricing titel",
    content: `Titel:\nCheaper than losing leads daily\nDaarboven klein kopje met pricing`,
    context: "Pricing pagina titel gewijzigd naar 'Cheaper than losing leads daily' met een klein 'PRICING' kopje erboven.",
  },
  {
    number: 60,
    title: "Titel groter en max-width",
    content: `Titel stuk groter en max width geven zodat de titel op 2 regels komt te staan`,
    context: "Hoofdtitel vergroot en max-width ingesteld zodat de tekst over twee regels loopt.",
  },
  {
    number: 61,
    title: "Titel gewijzigd naar 'Cheaper than wasted ad spend'",
    content: `Cheaper than wasted ad spend als titel`,
    context: "Definitieve pricing-paginatitel vastgesteld: 'Cheaper than wasted ad spend'.",
  },
  {
    number: 62,
    title: "Padding titelsectie 72px",
    content: `Ruimte tussen titel sectie (dus pricing + hoofdtitel) moet padding boven en onder gelijk zijn. 72px boven en onder`,
    context: "Titelsectie heeft nu 72px padding boven en onder voor symmetrische witruimte.",
  },
  {
    number: 63,
    title: "Switch onderdeel van sectie",
    content: `Beschouw de switch wel tot de sectie met pricing.`,
    context: "De monthly/annual toggle is visueel onderdeel gemaakt van de pricing-sectie.",
  },
  {
    number: 64,
    title: "Padding verfijnen",
    content: `Voeg iets meer padding toe tussen de switch en de tabel. Iets minder ruimte tussen titel en switch. Je mag overal gewoon 64px padding tussen doen`,
    context: "Witruimte verfijnd: meer ruimte tussen toggle en tabel, minder tussen titel en toggle, 64px als standaard padding.",
  },
  {
    number: 65,
    title: "Monthly visits vs form sessions verduidelijken",
    content: `Monthly visits is eigenlijk iets anders dan form sessions. Bij het gratis plan: onbeperkt monthly visits, alleen form sessions beperkt tot 5.000. Bij Growth tot 50.000 visits, form sessions unlimited. Enterprise ook form sessions unlimited, monthly visits 50k plus.`,
    context: "Verschil tussen monthly visits en form sessions verduidelijkt in de compare-tabel per plan.",
  },
  {
    number: 66,
    title: "Monthly visits bij free – streepje",
    content: `Monthly visits bij free mag je dan zetten op gewoon streepje omdat dat niet relevant is, anders is het ook raar dat het gratis plan daar wel onbeperkt heeft en de andere niet.`,
    context: "Monthly visits bij Free plan weergegeven als '–' omdat het niet relevant is voor dit plan.",
  },
  {
    number: 67,
    title: "Aantal forms per plan",
    content: `Aantal forms is bij free 1. En bij growth en enterprise onbeperkt`,
    context: "Forms-limiet: Free = 1 form, Growth en Enterprise = onbeperkt.",
  },
  {
    number: 68,
    title: "Rijen breder voor annual weergave",
    content: `Deze rijen allemaal iets breder maken zodat als hij op annual staat /month er nog naast kan. [User attached an image]`,
    context: "Tabelrijen verbreed zodat de '/month' tekst naast de prijs past bij annual weergave.",
  },
  {
    number: 69,
    title: "Form Analytics rij verwijderen uit compare",
    content: `Form Analytics\nUnderstand and improve conversion\nDit kan weg in de compare tabel`,
    context: "De 'Form Analytics' / 'Understand and improve conversion' rij is verwijderd uit de vergelijkingstabel.",
  },
  {
    number: 70,
    title: "FAQ full width",
    content: `Maak FAQ ook full width`,
    context: "De FAQ sectie heeft nu volledige breedte.",
  },
  {
    number: 71,
    title: "FAQ twee kolommen",
    content: `Maak FAQ twee tabellen. tabel 1 (links) titel, tabel 2 (rechts) de vragen`,
    context: "FAQ opgesplitst in twee kolommen: linkskolom de sectietitel, rechtskolom de vragen.",
  },
  {
    number: 72,
    title: "Info tooltips bij technische termen",
    content: `Alle technische dingen die we noemen moet een i achter komen en als je hovert moet er een info tooltip komen of hoe je dat ook noemt. Gewoon zo'n info boxje. Bedenk dat voor elke feature en plaats zowel in pricing tabel als compare.`,
    context: "Bij alle technische termen is een info-icoon (i) toegevoegd met hover-tooltip in zowel de pricing-kaarten als de vergelijkingstabel.",
  },
  {
    number: 73,
    title: "Info icoon direct achter tekst",
    content: `De i mag in het geval van de tabel direct achter de tekst komen. Dus soms heeft een tekstje 2 regels dan mag hij dus direct achter de tekst komen.`,
    context: "Info-icoon staat nu inline direct achter de tekst, ook als die over twee regels loopt.",
  },
  {
    number: 74,
    title: "Upgrade links naar pricing",
    content: `Als je op upgrade your plan klikt of de XX trial days left in de bovenbalk moet je naar de pricing pagina gaan.`,
    context: "'Upgrade your plan' en de trial-countdown in de topbalk navigeren nu naar de pricing pagina.",
  },
  {
    number: 75,
    title: "Create account – nieuwe stijl",
    content: `De create account page moet er een beetje zo uit zien. Doe alleen Google en als je in het email veld klikt en begint te typen dan moet ook het wachtwoord veld zichtbaar worden + button en daaronder dan daarna een button [User attached an image]`,
    context: "Create account herontworpen: alleen Google social login, wachtwoordveld verschijnt dynamisch bij het typen van een e-mailadres.",
  },
  {
    number: 76,
    title: "CTA altijd zichtbaar",
    content: `Oke de CTA onder de mail mag wel altijd zichtbaar zijn`,
    context: "De continue-knop onder het e-mailadresveld is altijd zichtbaar (niet pas na invullen).",
  },
  {
    number: 77,
    title: "Knop donker maken",
    content: `Knop mag wel gewoon donker zijn`,
    context: "De continue-knop op de create account pagina is donker gestyled.",
  },
  {
    number: 78,
    title: "Skip for now verwijderen",
    content: `Bij de onboarding flow van stap 1-5, moet je skip for now overal weghalen`,
    context: "'Skip for now' is verwijderd uit alle 5 onboarding-stappen.",
  },
  {
    number: 79,
    title: "Bevestigingscode scherm",
    content: `Als je met je e-mailadres sign up, moet je een confirmatie code invoeren. Voeg zo'n soort scherm toe. Keep it simple stijl houden zoals onboarding nu [User attached an image]`,
    context: "Nieuw scherm toegevoegd: verificatiecode invoeren na e-mailregistratie, in de bestaande stijl van de onboarding.",
  },
  {
    number: 80,
    title: "Wachtwoordcriteria tonen",
    content: `Remove the confirm password field. And add instructions of criteria below password`,
    context: "Bevestig-wachtwoord veld verwijderd. Wachtwoordcriteria (lengte, speciale tekens, etc.) worden getoond onder het wachtwoordveld.",
  },
];

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
          Een overzicht van alle prompts die zijn gebruikt om de Exatom onboarding te bouwen. Per prompt zie je de exacte instructie en een toelichting over wat er mee is gedaan.
        </p>

        <div className="space-y-14">
          {prompts.map((prompt) => (
            <article key={prompt.number} className="border-t border-border pt-10">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Prompt {prompt.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {prompt.title}
              </h3>
              <div className="bg-muted/40 rounded-lg p-4 mb-4">
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed font-mono">
                  {prompt.content}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="mt-0.5 text-muted-foreground">💬</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Wat is er gedaan: </span>
                  {prompt.context}
                </p>
              </div>
            </article>
          ))}
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
