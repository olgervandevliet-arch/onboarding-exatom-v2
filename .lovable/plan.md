

## Plan: Sign up knop altijd zichtbaar

### Wat er verandert
Op de Create Account pagina (`/signup`) wordt de "Sign up" knop direct onder het e-mailveld altijd zichtbaar, ook voordat de gebruiker iets heeft getypt. De wachtwoordvelden blijven wel conditioneel verschijnen zodra er in het e-mailveld wordt getypt.

### Gedrag
- **E-mailveld**: altijd zichtbaar
- **Sign up knop**: altijd zichtbaar, direct onder het e-mailveld
- **Wachtwoordvelden**: verschijnen pas wanneer `email.length > 0` (huidige gedrag blijft)
- **Knop disabled state**: knop is `disabled` totdat email + beide wachtwoorden ingevuld zijn en matchen

### Technische aanpak
In `src/pages/CreateAccount.tsx`:
1. De "Sign up" knop wordt uit het conditionele `{showPasswordFields && ...}` blok gehaald.
2. De knop komt direct na het e-mail `<div>`, vóór het conditionele blok met de wachtwoordvelden.
3. De wachtwoordvelden blijven binnen `{showPasswordFields && ...}` met de fade-in animatie.
4. De `disabled={!canSubmit}` logica blijft ongewijzigd, zodat de knop pas klikbaar wordt wanneer alle velden correct zijn ingevuld.

### Bestanden
- `src/pages/CreateAccount.tsx` — enige wijziging

