import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, RotateCcw, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Bell,
  Home,
  BarChart3,
  Layers,
  Monitor,
  Globe,
  Award,
  Sparkles,
  Star,
  Zap,
  CheckCircle,
  Settings,
  HelpCircle,
  ArrowRight,
  Copy,
  BookOpen,
  Youtube,
  MessageSquare,
  Mail,
  Users,
  Check,
  Pencil,
  ChevronRight,
  ShoppingBag,
  FileCode,
  Tag,
  X,
  UserPlus,
  Send,
  Plus,
  ExternalLink,
  Trash2,
  PartyPopper,
  Info,
  Loader2,
  ClipboardList,
  CreditCard,
  Briefcase,
  AlertTriangle,
  Eye,
  EyeOff,
  Shield,
  Type,
  Smartphone,
  TrendingUp,
  FileText,
  Hash,
  LockKeyhole,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SIDEBAR_INSIGHTS = [
  { icon: BarChart3, label: "Form engagement" },
  { icon: Layers, label: "Field metrix" },
  { icon: Monitor, label: "Session replays" },
  { icon: Globe, label: "Industry benchmarks" },
  { icon: Award, label: "Score" },
  { icon: Sparkles, label: "AI analysis" },
];

const SIDEBAR_IMPROVEMENTS = [
  { icon: Zap, label: "Autofixes" },
  { icon: CheckCircle, label: "Smart tooltips" },
];

const LOCKED_FEATURES: Record<string, string> = {
  "Field metrix": "See exactly which fields cause drop-offs and where visitors hesitate.",
  "Session replays": "Watch real recordings of visitors filling out your forms.",
  "Industry benchmarks": "Compare your form's conversion rate against industry averages.",
  "Autofixes": "Automatically fix the issues that cause visitors to abandon your form.",
  "Smart tooltips": "Add smart nudges that guide visitors through difficult fields.",
};

const CATEGORIES = [
  { value: "lead", label: "Lead gen", icon: UserPlus },
  { value: "contact", label: "Contact", icon: Mail },
  { value: "checkout", label: "Checkout", icon: ShoppingBag },
  { value: "registration", label: "Registration", icon: FileCode },
  { value: "account", label: "Account", icon: CreditCard },
  { value: "support", label: "Support", icon: MessageSquare },
  { value: "job", label: "Job application", icon: Briefcase },
  { value: "survey", label: "Survey", icon: ClipboardList },
];

interface AddedForm {
  name: string;
  url: string;
  category: string;
  conversionValue: number;
}

// All detected forms (10+)
const ALL_DETECTED_FORMS = [
  { name: "Contact form", url: "/contact", category: "contact" },
  { name: "Request a demo", url: "/demo", category: "lead" },
  { name: "Newsletter signup", url: "/newsletter", category: "registration" },
  { name: "Career application", url: "/careers/apply", category: "job" },
  { name: "Support ticket", url: "/support", category: "support" },
  { name: "Partner registration", url: "/partners", category: "registration" },
  { name: "Feedback form", url: "/feedback", category: "survey" },
  { name: "Quote request", url: "/quote", category: "lead" },
  { name: "Account settings", url: "/account/settings", category: "account" },
  { name: "Checkout form", url: "/checkout", category: "checkout" },
  { name: "Webinar registration", url: "/webinar", category: "registration" },
  { name: "Free trial signup", url: "/trial", category: "lead" },
];

// Form fields detected from HTML scan
const FORM_FIELDS = [
  { id: "field-1", type: "text", label: "Naam (vereist)", nameAttr: "first_name", idAttr: "field-first-name", category: "First name", icon: Type },
  { id: "field-2", type: "text", label: "Achternaam", nameAttr: "last_name", idAttr: "field-last-name", category: "Last name", icon: Type },
  { id: "field-3", type: "email", label: "E-mailadres (vereist)", nameAttr: "email", idAttr: "field-email", category: "Email address", icon: Mail },
  { id: "field-4", type: "tel", label: "Telefoonnummer", nameAttr: "phone", idAttr: "field-phone", category: "Phone number", icon: Smartphone },
  { id: "field-5", type: "text", label: "Bedrijfsnaam", nameAttr: "company", idAttr: "field-company", category: "Company name", icon: Briefcase },
  { id: "field-6", type: "textarea", label: "Uw bericht", nameAttr: "message", idAttr: "field-message", category: "Large text input", icon: FileText },
  { id: "field-7", type: "select", label: "Onderwerp", nameAttr: "subject", idAttr: "field-subject", category: "Dropdown", icon: ChevronDown },
  { id: "field-8", type: "checkbox", label: "Ik ga akkoord met de voorwaarden", nameAttr: "terms", idAttr: "field-terms", category: "Consent checkbox", icon: CheckCircle },
];

// Autofix items from HTML scan
const AUTOFIX_ITEMS = [
  { id: "labels", title: "Add missing field labels", desc: "3 fields are missing accessible labels — screen readers can't identify them", icon: Type, severity: "high", enabled: true },
  { id: "inputTypes", title: "Set correct input types", desc: "Email and phone fields use type=\"text\" instead of type=\"email\" / type=\"tel\"", icon: Smartphone, severity: "high", enabled: true },
  { id: "autocomplete", title: "Enable autocomplete attributes", desc: "Add autocomplete hints so browsers can prefill name, email, and address fields", icon: Zap, severity: "medium", enabled: true },
  { id: "errorMessages", title: "Improve error message clarity", desc: "Replace generic \"This field is required\" with specific guidance per field", icon: AlertTriangle, severity: "medium", enabled: true },
  { id: "ariaDescriptions", title: "Add ARIA descriptions", desc: "Link help text to fields with aria-describedby for better accessibility", icon: Shield, severity: "low", enabled: true },
  { id: "placeholders", title: "Add example placeholders", desc: "Show format hints in empty fields (e.g. \"john@example.com\")", icon: Type, severity: "low", enabled: true },
];

// Smart tooltip suggestions
const SMART_TOOLTIP_ITEMS = [
  { id: "email", field: "Email address", tooltip: "We'll only use this to send you a confirmation. No spam, ever.", enabled: true },
  { id: "phone", field: "Phone number", tooltip: "Optional — only if you'd prefer a call back. Takes about 2 minutes.", enabled: true },
  { id: "company", field: "Company name", tooltip: "This helps us personalise your demo. Takes just a few seconds.", enabled: true },
  { id: "message", field: "Message", tooltip: "A short description is fine — we'll follow up with details. Most people write 1-2 sentences.", enabled: true },
  { id: "budget", field: "Budget range", tooltip: "This helps us recommend the right plan. You can always change it later.", enabled: true },
];

// Quickscan categories with sub-scores (8 categories)
const QUICKSCAN_CATEGORIES = [
  { name: "E-Commerce", score: 8, max: 10, color: "hsl(var(--foreground))" },
  { name: "Accessibility", score: 4, max: 10, color: "hsl(var(--muted-foreground))" },
  { name: "Usability", score: 7, max: 10, color: "hsl(var(--foreground))" },
  { name: "Validation", score: 5, max: 10, color: "hsl(var(--muted-foreground))" },
  { name: "Style", score: 9, max: 10, color: "hsl(var(--foreground))" },
  { name: "Web Standards", score: 6, max: 10, color: "hsl(var(--muted-foreground))" },
  { name: "Performance", score: 8, max: 10, color: "hsl(var(--foreground))" },
  { name: "Privacy", score: 7, max: 10, color: "hsl(var(--foreground))" },
];

// Top quickscan issues
const QUICKSCAN_ISSUES = [
  { id: "qs-1", title: "Missing labels on 3 form fields", severity: "high", category: "Accessibility" },
  { id: "qs-2", title: "No autocomplete attributes detected", severity: "high", category: "Usability" },
  { id: "qs-3", title: "Incorrect input types for email & phone", severity: "high", category: "Validation" },
  { id: "qs-4", title: "Generic error messages on all fields", severity: "medium", category: "Usability" },
  { id: "qs-5", title: "Form not optimised for mobile viewport", severity: "medium", category: "Style" },
  { id: "qs-6", title: "No ARIA descriptions for help text", severity: "low", category: "Accessibility" },
];

// Full report items (8 categories with descriptions)
const FULL_REPORT_ITEMS = [
  { category: "E-Commerce", description: "Conversion-focused best practices for forms that drive revenue.", score: 8, checks: [
    { name: "Form has clear call-to-action", pass: true },
    { name: "Trust signals present near submit", pass: true },
    { name: "Value proposition visible", pass: true },
    { name: "Progressive disclosure used", pass: false },
    { name: "Social proof elements near form", pass: true },
  ]},
  { category: "Accessibility", description: "Ensures your form is usable by everyone, including screen reader users.", score: 4, checks: [
    { name: "All fields have labels", pass: false },
    { name: "ARIA attributes present", pass: false },
    { name: "Keyboard navigation works", pass: true },
    { name: "Colour contrast sufficient", pass: true },
    { name: "Focus indicators visible", pass: false },
    { name: "Error messages linked to fields", pass: false },
  ]},
  { category: "Usability", description: "How easy and intuitive the form is to complete for your visitors.", score: 7, checks: [
    { name: "Autocomplete attributes set", pass: false },
    { name: "Tab order is logical", pass: true },
    { name: "Error messages are specific", pass: false },
    { name: "Placeholder text is helpful", pass: true },
    { name: "Field grouping is logical", pass: true },
  ]},
  { category: "Validation", description: "Input validation and error handling quality.", score: 5, checks: [
    { name: "Input types match content", pass: false },
    { name: "Required fields are marked", pass: true },
    { name: "Inline validation present", pass: false },
    { name: "Error states are clear", pass: true },
    { name: "Pattern validation for phone/email", pass: false },
  ]},
  { category: "Style", description: "Visual consistency, branding, and responsive design.", score: 9, checks: [
    { name: "Consistent styling applied", pass: true },
    { name: "Mobile responsive layout", pass: false },
    { name: "Whitespace and padding adequate", pass: true },
    { name: "Button styling prominent", pass: true },
    { name: "Typography hierarchy clear", pass: true },
  ]},
  { category: "Web Standards", description: "HTML standards compliance and security best practices.", score: 6, checks: [
    { name: "Valid HTML structure", pass: true },
    { name: "Form uses POST method", pass: true },
    { name: "CSRF token present", pass: false },
    { name: "Character encoding set", pass: true },
    { name: "Form action URL is HTTPS", pass: true },
  ]},
  { category: "Performance", description: "Form loading speed and render performance.", score: 8, checks: [
    { name: "No render-blocking scripts", pass: true },
    { name: "Form loads within 1.5s", pass: true },
    { name: "No excessive DOM elements", pass: true },
    { name: "Images optimised", pass: true },
    { name: "Third-party scripts minimal", pass: false },
  ]},
  { category: "Privacy", description: "Data handling, consent, and privacy compliance.", score: 7, checks: [
    { name: "Privacy policy linked", pass: true },
    { name: "Consent checkbox present", pass: true },
    { name: "Data encryption in transit", pass: true },
    { name: "Cookie consent handled", pass: false },
    { name: "GDPR-compliant data handling", pass: true },
  ]},
];

/* ------------------------------------------------------------------ */
/*  Info Tooltip                                                       */
/* ------------------------------------------------------------------ */
const InfoTip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help inline-block ml-1" />
    </TooltipTrigger>
    <TooltipContent side="top" className="max-w-[240px] text-xs font-normal z-[200]" collisionPadding={16}>
      {text}
    </TooltipContent>
  </Tooltip>
);

/* ------------------------------------------------------------------ */
/*  Donut Chart SVG                                                    */
/* ------------------------------------------------------------------ */
const DonutChart = ({ score, max = 100 }: { score: number; max?: number }) => {
  const pct = score / max;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);
  const color = "hsl(var(--foreground))";

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
      <circle
        cx="50" cy="50" r={radius} fill="none"
        stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        className="transition-all duration-1000"
      />
      <text x="50" y="46" textAnchor="middle" className="fill-foreground text-xl font-bold" fontSize="22">{score}</text>
      <text x="50" y="62" textAnchor="middle" className="fill-muted-foreground" fontSize="10">/ {max}</text>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Convert slider position (0–100) to logarithmic value (1–10000) */
const sliderPositionToValue = (position: number): number =>
  Math.round(Math.exp((Math.log(10000) * position) / 100));

/** Convert actual value (1–10000) to slider position (0–100) */
const valueToSliderPosition = (value: number): number =>
  Math.round((Math.log(value) / Math.log(10000)) * 100);

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const GetStarted = () => {
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [tagVerified, setTagVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // User data from onboarding
  const [userName, setUserName] = useState("Name Surname");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const isPaidPlan = localStorage.getItem("exatom_plan") === "growth";

  useEffect(() => {
    const name = localStorage.getItem("exatom_user_name");
    const company = localStorage.getItem("exatom_company_name");
    const website = localStorage.getItem("exatom_website_url");
    if (name) setUserName(name);
    if (company) setCompanyName(company);
    if (website) setWebsiteUrl(website);
  }, []);

  // Added forms
  const [addedForms, setAddedForms] = useState<AddedForm[]>([]);
  const [showAllDetected, setShowAllDetected] = useState(false);

  // Form dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formDialogStep, setFormDialogStep] = useState<1 | 2>(1);
  const [formName, setFormName] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [isEditingFormUrl, setIsEditingFormUrl] = useState(false);
  const [conversionValue, setConversionValue] = useState([100]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hasThankYouPage, setHasThankYouPage] = useState<boolean | null>(null);
  const [editingFormIndex, setEditingFormIndex] = useState<number | null>(null);
  const [showFormFields, setShowFormFields] = useState(false);
  const [crawlingForms, setCrawlingForms] = useState(false);
  const [formsCrawled, setFormsCrawled] = useState(false);

  // Conversion tag verification
  const [conversionTagVerified, setConversionTagVerified] = useState(false);
  const [conversionTagVerifying, setConversionTagVerifying] = useState(false);

  // Field editing state
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
  const [deletedFields, setDeletedFields] = useState<Set<string>>(new Set());

  const [gtmDialogOpen, setGtmDialogOpen] = useState(false);
  const [shopifyDialogOpen, setShopifyDialogOpen] = useState(false);
  const [wordpressDialogOpen, setWordpressDialogOpen] = useState(false);
  const [emailDevDialogOpen, setEmailDevDialogOpen] = useState(false);
  const [emailDevAddress, setEmailDevAddress] = useState("");
  const [emailDevPersonalNote, setEmailDevPersonalNote] = useState("");
  const [emailDevSendCopy, setEmailDevSendCopy] = useState(false);

  // Invite dialog
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteRows, setInviteRows] = useState([{ name: "", email: "" }]);

  // Step 3: Quickscan
  const [quickscanRun, setQuickscanRun] = useState(false);
  const [quickscanRunning, setQuickscanRunning] = useState(false);
  const [quickscanScore, setQuickscanScore] = useState(0);
  const [estimatedVisitors, setEstimatedVisitors] = useState(0);
  const [fullReportOpen, setFullReportOpen] = useState(false);
  const [editingVisitors, setEditingVisitors] = useState(false);
  const [visitorsInput, setVisitorsInput] = useState("");

  // Sidebar active item + upgrade modal
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeModalFeature, setUpgradeModalFeature] = useState("");

  // Step 4: Autofixes & Smart tooltips dialogs
  const [autofixDialogOpen, setAutofixDialogOpen] = useState(false);
  const [autofixItems, setAutofixItems] = useState(AUTOFIX_ITEMS.map(i => ({ ...i })));
  const [autofixesApplied, setAutofixesApplied] = useState(false);

  const [tooltipDialogOpen, setTooltipDialogOpen] = useState(false);
  const [tooltipItems, setTooltipItems] = useState(SMART_TOOLTIP_ITEMS.map(i => ({ ...i })));
  const [tooltipsApplied, setTooltipsApplied] = useState(false);

  const toggleStep = (step: number) => {
    const previousSteps = Array.from({ length: step - 1 }, (_, i) => i + 1);
    const allPreviousCompleted = previousSteps.every((s) => completedSteps.has(s));
    if (!allPreviousCompleted && step > 1) return;
    setExpandedStep(expandedStep === step ? null : step);
  };

  const completeStep = (step: number) => {
    const newCompleted = new Set([...completedSteps, step]);
    setCompletedSteps(newCompleted);
    const nextStep = [1, 2, 3, 4, 5].find(
      (s) => s > step && !newCompleted.has(s)
    );
    setExpandedStep(nextStep ?? null);
    if (newCompleted.size === 5) {
      setTimeout(() => setCompletionDialogOpen(true), 500);
    }
  };

  const skipStep = (step: number) => {
    const newCompleted = new Set([...completedSteps, step]);
    setCompletedSteps(newCompleted);
    const nextStep = [1, 2, 3, 4, 5].find(
      (s) => s > step && !newCompleted.has(s)
    );
    setExpandedStep(nextStep ?? null);
    if (newCompleted.size === 5) {
      setTimeout(() => setCompletionDialogOpen(true), 500);
    }
  };

  const completedCount = completedSteps.size;

  const getStepStatus = (step: number): "pending" | "completed" => {
    if (completedSteps.has(step)) return "completed";
    return "pending";
  };

  const openFormDialog = (defaults?: { name: string; url: string; category?: string }) => {
    setFormDialogStep(1);
    setFormName(defaults?.name || "");
    setFormUrl(defaults?.url || "");
    setIsEditingFormUrl(!defaults?.url);
    setShowFormFields(false);
    setHasThankYouPage(null);
    setConversionValue([100]);
    setSelectedCategory(defaults?.category || "");
    setEditingFormIndex(null);
    setConversionTagVerified(false);
    setConversionTagVerifying(false);
    setFormDialogOpen(true);
  };

  const openEditFormDialog = (index: number) => {
    const form = addedForms[index];
    setFormDialogStep(1);
    setFormName(form.name);
    setFormUrl(form.url);
    setConversionValue([form.conversionValue]);
    setSelectedCategory(form.category);
    setHasThankYouPage(null);
    setEditingFormIndex(index);
    setShowFormFields(false);
    setFormDialogOpen(true);
  };

  const deleteForm = (index: number) => {
    setAddedForms((prev) => prev.filter((_, i) => i !== index));
    setFormDialogOpen(false);
    if (addedForms.length <= 1) {
      setCompletedSteps((prev) => { const n = new Set(prev); n.delete(2); return n; });
    }
  };

  const saveForm = () => {
    const form: AddedForm = {
      name: formName,
      url: formUrl,
      category: selectedCategory,
      conversionValue: conversionValue[0],
    };
    if (editingFormIndex !== null) {
      setAddedForms((prev) => prev.map((f, i) => (i === editingFormIndex ? form : f)));
    } else {
      setAddedForms((prev) => [...prev, form]);
    }
    setFormDialogOpen(false);
    if (!completedSteps.has(2)) completeStep(2);
  };

  const addInviteRow = () => {
    setInviteRows((prev) => [...prev, { name: "", email: "" }]);
  };

  const getCategoryIcon = (cat: string) => {
    const found = CATEGORIES.find((c) => c.value === cat);
    return found ? found.icon : FileCode;
  };

  const [codeCopied, setCodeCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCodeCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCodeCopied(false), 3000);
  };

  const handleVerifyTag = () => {
    if (tagVerified) {
      setTagVerified(false);
      setCompletedSteps((prev) => { const n = new Set(prev); n.delete(1); return n; });
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setTagVerified(true);
      toast.success("🎉 Tag verified! Exatom is now tracking your website.", { duration: 4000 });
      completeStep(1);
    }, 2000);
  };

  const handleRunQuickscan = () => {
    setQuickscanRunning(true);
    setTimeout(() => {
      setQuickscanRunning(false);
      setQuickscanRun(true);
      setQuickscanScore(67);
      setEstimatedVisitors(12400);
      toast.success("Quickscan complete! We found 6 improvements for your form.");
      // Do NOT auto-complete step 3
    }, 2500);
  };

  // Impact calculations
  const formValue = addedForms.length > 0 ? addedForms[0].conversionValue : 5000;
  const autofixUplift = 0.035; // 3.5% conversion uplift
  const tooltipUplift = 0.02; // 2% conversion uplift
  const baseConversionRate = 0.03; // 3% assumed base conversion rate
  const autofixImpact = estimatedVisitors > 0 ? Math.round(estimatedVisitors * baseConversionRate * autofixUplift * formValue) : 0;
  const tooltipImpact = estimatedVisitors > 0 ? Math.round(estimatedVisitors * baseConversionRate * tooltipUplift * formValue) : 0;

  // Detected forms with website URL prefix
  const detectedForms = ALL_DETECTED_FORMS.map(f => ({
    ...f,
    url: websiteUrl ? `${websiteUrl.replace(/\/$/, '')}${f.url}` : `https://www.example.com${f.url}`,
  }));
  const topForms = detectedForms.slice(0, 3);
  const remainingForms = detectedForms.slice(3);

  // Filter: exclude added forms
  const availableTopForms = topForms.filter(sf => !addedForms.some(af => af.url === sf.url));
  const availableRemainingForms = remainingForms.filter(sf => !addedForms.some(af => af.url === sf.url));

  const handleSidebarItemClick = (label: string) => {
    if (!isPaidPlan && LOCKED_FEATURES[label]) {
      setUpgradeModalFeature(label);
      setUpgradeModalOpen(true);
    } else {
      setActiveSidebarItem(label);
    }
  };

  const sidebarContent = (
    <>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <SidebarItem icon={ArrowRight} label="Get started" active />
        <div className="h-2" />
        <SidebarItem icon={Home} label="Dashboard" />

        <SidebarSection title="Insights">
          {SIDEBAR_INSIGHTS.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              indent
              locked={!isPaidPlan && !!LOCKED_FEATURES[item.label]}
              onClick={() => handleSidebarItemClick(item.label)}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Improvements">
          {SIDEBAR_IMPROVEMENTS.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              indent
              locked={!isPaidPlan && !!LOCKED_FEATURES[item.label]}
              onClick={() => handleSidebarItemClick(item.label)}
            />
          ))}
        </SidebarSection>

        <SidebarItem icon={Bell} label="Performance alerts" />
      </nav>

      <div className="p-3 space-y-1">
        <Button className="w-full" size="sm" onClick={() => navigate("/pricing")}>
          <Star className="w-4 h-4 mr-1" />
          Upgrade your plan
        </Button>
        <SidebarItem icon={HelpCircle} label="Support" />
        <SidebarItem icon={Settings} label="Settings" />
      </div>
    </>
  );

  return (
    <TooltipProvider delayDuration={200}>
    <div className="flex min-h-screen bg-surface">
      {/* ---- Sidebar (desktop) ---- */}
      <aside className="hidden md:flex w-60 bg-background border-r border-border flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-4">
          <Logo maxWidth="96px" />
        </div>
        {sidebarContent}
      </aside>

      {/* ---- Sidebar (mobile) ---- */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-60 p-0 flex flex-col">
          <SheetHeader className="p-4 pb-0">
            <SheetTitle>
              <Logo maxWidth="96px" />
            </SheetTitle>
          </SheetHeader>
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* ---- Main ---- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-background flex items-center justify-between px-3 sm:px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 -ml-1 rounded hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ask Eureka..."
                className="flex-1 bg-muted/50 text-sm outline-none placeholder:text-muted-foreground rounded px-3 py-1.5"
              />
              <Button size="sm" className="text-xs gap-1">
                Ask <Sparkles className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline text-xs text-muted-foreground border border-border rounded px-3 py-1 cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate("/pricing")}>
              Free plan
            </span>
            <Bell className="w-4 h-4 text-muted-foreground" />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer outline-none">
                <div className="w-7 h-7 rounded-full bg-muted" />
                <span className="text-sm hidden sm:inline">{userName}</span>
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => {
                  localStorage.removeItem("exatom_user_name");
                  localStorage.removeItem("exatom_company_name");
                  localStorage.removeItem("exatom_website_url");
                  localStorage.removeItem("exatom_plan");
                  navigate("/");
                }}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset onboarding
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
          {companyName && (
            <p className="text-sm text-muted-foreground mb-4">
              Setting up Exatom for <strong>{companyName}</strong>
            </p>
          )}

          {/* Progress */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 flex-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-500"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{completedCount}/5 completed</span>
          </div>

          {/* Invite banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <p className="text-sm">
              <span className="font-semibold">Need help from your team?</span>{" "}
              Invite a teammate to complete your setup.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setInviteDialogOpen(true)}
              className="shrink-0 gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Invite a teammate
            </Button>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {/* ========== STEP 1: Connect your website ========== */}
            <AccordionStep
              number={1}
              title="Connect your website"
              status={getStepStatus(1)}
              isOpen={expandedStep === 1}
              onToggle={() => toggleStep(1)}
            >
              <div className="space-y-5">
                <p className="text-sm font-semibold flex items-center gap-1.5">A. Copy the tag <InfoTip text="This is your unique tracking script. It allows Exatom to collect form analytics data from your website." /></p>
                <div
                  className="flex items-center gap-3 bg-surface rounded p-3 cursor-pointer hover:bg-muted/70 transition-colors overflow-x-auto"
                  onClick={() => copyToClipboard('<script src="https://assets.exatom.io/event.js?clientCode=SWVN" async></script>')}
                >
                  <code className="flex-1 text-xs font-mono break-all">
                    {'<script src="https://assets.exatom.io/event.js?clientCode=SWVN" async></script>'}
                  </code>
                  <Button size="sm" variant={codeCopied ? "outline" : "default"} className="gap-1 shrink-0">
                    {codeCopied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy code</>}
                  </Button>
                </div>

                <p className="text-sm font-semibold flex items-center gap-1.5">
                  B. Paste the tag into the &lt;head&gt; of your website. <InfoTip text="Place the script tag inside the <head> section of every page where you have forms." />
                </p>

                <p className="text-sm font-semibold flex items-center gap-1.5">
                  C. Verify your tag to make sure your tag is installed. <InfoTip text="Click the verify button below to check if the tag is correctly installed on your website." />
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    variant={tagVerified ? "default" : "outline"}
                    size="sm"
                    onClick={handleVerifyTag}
                    disabled={verifying}
                  >
                    {verifying ? (
                      <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Verifying...</>
                    ) : tagVerified ? (
                      <><Check className="w-3 h-3 mr-1" /> Tag verified</>
                    ) : (
                      "Verify your installed tag"
                    )}
                  </Button>
                  {tagVerified && (
                    <span className="text-xs text-muted-foreground animate-in fade-in-0 slide-in-from-left-2 duration-300">
                      ✓ Tag detected on your website
                    </span>
                  )}
                </div>

                <div className="border-t border-border" />

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Other ways to install Exatom</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setGtmDialogOpen(true)} className="flex items-center gap-2 text-sm border border-border rounded px-5 py-3 bg-surface hover:bg-muted transition-colors">
                      <Tag className="w-5 h-5" /> Google Tag Manager
                    </button>
                    <button onClick={() => setShopifyDialogOpen(true)} className="flex items-center gap-2 text-sm border border-border rounded px-5 py-3 bg-surface hover:bg-muted transition-colors">
                      <ShoppingBag className="w-5 h-5" /> Shopify
                    </button>
                    <button onClick={() => setWordpressDialogOpen(true)} className="flex items-center gap-2 text-sm border border-border rounded px-5 py-3 bg-surface hover:bg-muted transition-colors">
                      <FileCode className="w-5 h-5" /> WordPress
                    </button>
                    <button onClick={() => setEmailDevDialogOpen(true)} className="flex items-center gap-2 text-sm border border-border rounded px-5 py-3 bg-surface hover:bg-muted transition-colors">
                      <Mail className="w-5 h-5" /> Email to your developer
                    </button>
                  </div>
                </div>
              </div>
            </AccordionStep>

            {/* ========== STEP 2: Add your first form ========== */}
            <AccordionStep
              number={2}
              title="Add your first form"
              status={getStepStatus(2)}
              isOpen={expandedStep === 2}
              onToggle={() => toggleStep(2)}
              locked={!completedSteps.has(1)}
            >
              <div className="space-y-4">
                {/* Added form */}
                {addedForms.length > 0 && (
                  <div className="space-y-2">
                    {addedForms.map((form, i) => {
                      const CatIcon = getCategoryIcon(form.category);
                      return (
                        <div key={i} className="flex items-center justify-between bg-surface rounded p-4">
                          <div className="flex items-center gap-3">
                            <CatIcon className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-semibold text-sm">{form.name}</p>
                              <p className="text-xs text-muted-foreground">{form.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditFormDialog(i)}>
                              <Pencil className="w-3 h-3 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => deleteForm(i)}>
                              <Trash2 className="w-3 h-3 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Only show crawl/detected/add options if no form added yet */}
                {addedForms.length === 0 && (
                  <>
                    {/* Crawl button — shown when tag verified but not yet crawled */}
                    {tagVerified && !formsCrawled && !crawlingForms && (
                      <div className="bg-surface rounded p-5 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">Find forms on your website</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Crawl your website to automatically detect all forms.</p>
                        </div>
                        <Button size="sm" onClick={() => {
                          setCrawlingForms(true);
                          setTimeout(() => {
                            setCrawlingForms(false);
                            setFormsCrawled(true);
                            toast.success(`Found ${ALL_DETECTED_FORMS.length} forms on your website!`);
                          }, 2000);
                        }}>
                          <Search className="w-3 h-3 mr-1" /> Crawl website for forms
                        </Button>
                      </div>
                    )}

                    {/* Crawling loading state */}
                    {crawlingForms && (
                      <div className="bg-surface rounded p-8 flex flex-col items-center gap-3 animate-in fade-in-0 duration-300">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        <p className="text-sm font-semibold">Crawling your website for forms...</p>
                      </div>
                    )}

                    {/* Detected forms — shown after crawl */}
                    {formsCrawled && (
                      <div className="space-y-3">
                        {availableTopForms.length > 0 && (
                          <>
                            <p className="text-sm font-semibold">
                              We've found {detectedForms.length} forms on your website
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Here are the 3 most important ones. Select one to get started.
                            </p>

                            <div className="space-y-2">
                              {availableTopForms.map((sf, i) => {
                                const CatIcon = getCategoryIcon(sf.category);
                                return (
                                  <div key={i} className="flex items-center justify-between border border-dashed border-border rounded p-4">
                                    <div className="flex items-center gap-3">
                                      <CatIcon className="w-4 h-4 text-muted-foreground" />
                                      <div>
                                        <p className="font-semibold text-sm">{sf.name}</p>
                                        <p className="text-xs text-muted-foreground">{sf.url}</p>
                                      </div>
                                    </div>
                                    <Button size="sm" onClick={() => openFormDialog({ name: sf.name, url: sf.url, category: sf.category })}>
                                      Connect form
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>

                            {availableRemainingForms.length > 0 && (
                              <>
                                {!showAllDetected ? (
                                  <button
                                    onClick={() => setShowAllDetected(true)}
                                    className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline underline-offset-2"
                                  >
                                    <ChevronDown className="w-4 h-4" />
                                    Show {availableRemainingForms.length} more forms
                                  </button>
                                ) : (
                                  <div className="space-y-2">
                                    {availableRemainingForms.map((sf, i) => {
                                      const CatIcon = getCategoryIcon(sf.category);
                                      return (
                                        <div key={i} className="flex items-center justify-between border border-dashed border-border rounded p-4">
                                          <div className="flex items-center gap-3">
                                            <CatIcon className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                              <p className="font-semibold text-sm">{sf.name}</p>
                                              <p className="text-xs text-muted-foreground">{sf.url}</p>
                                            </div>
                                          </div>
                                          <Button size="sm" onClick={() => openFormDialog({ name: sf.name, url: sf.url, category: sf.category })}>
                                            Connect form
                                          </Button>
                                        </div>
                                      );
                                    })}
                                    <button
                                      onClick={() => setShowAllDetected(false)}
                                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                                    >
                                      <ChevronUp className="w-4 h-4" /> Show less
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Add form manually — always visible */}
                    {!formsCrawled && (
                      <div className="border border-dashed border-border rounded p-4 flex items-center justify-between">
                        <p className="text-sm font-semibold">Add your first form</p>
                        <Button size="sm" variant="outline" onClick={() => openFormDialog()}>
                          <Plus className="w-3 h-3 mr-1" /> Add form
                        </Button>
                      </div>
                    )}

                    {/* Can't find your form — shown after crawl */}
                    {formsCrawled && (
                      <p className="text-xs text-muted-foreground">
                        Can't find your form?{" "}
                        <button
                          onClick={() => openFormDialog()}
                          className="underline underline-offset-2 font-medium text-foreground hover:text-foreground/80 transition-colors"
                        >
                          Add a form manually
                        </button>
                      </p>
                    )}

                    {!tagVerified && (
                      <p className="text-xs text-muted-foreground">
                        Connect your website first to auto-detect forms, or add one manually.
                      </p>
                    )}
                  </>
                )}

                <StepActions onSkip={() => skipStep(2)} />
              </div>
            </AccordionStep>

            {/* ========== STEP 3: Quickscan your form ========== */}
            <AccordionStep
              number={3}
              title="Quickscan your form"
              status={getStepStatus(3)}
              isOpen={expandedStep === 3}
              onToggle={() => toggleStep(3)}
              locked={!completedSteps.has(2)}
            >
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Get an instant quickscan of your form based on HTML analysis — no traffic data needed yet.
                </p>

                {/* Show selected form */}
                {addedForms.length > 0 && (
                  <div className="flex items-center gap-3 bg-surface rounded p-3">
                    {(() => { const CatIcon = getCategoryIcon(addedForms[0].category); return <CatIcon className="w-4 h-4 text-muted-foreground" />; })()}
                    <div>
                      <p className="text-sm font-semibold">{addedForms[0].name}</p>
                      <p className="text-xs text-muted-foreground">{addedForms[0].url}</p>
                    </div>
                  </div>
                )}

                {/* Run quickscan button */}
                {!quickscanRun && !quickscanRunning && (
                  <div className="bg-surface rounded p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">Form Quickscan</p>
                        <p className="text-xs text-muted-foreground">
                          Instant HTML-based analysis against 200+ best practices
                        </p>
                      </div>
                      <Button size="sm" onClick={handleRunQuickscan}>
                        Run quickscan
                      </Button>
                    </div>
                  </div>
                )}

                {/* Loading state */}
                {quickscanRunning && (
                  <div className="bg-surface rounded p-8 flex flex-col items-center gap-4 animate-in fade-in-0 duration-300">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    <div className="text-center">
                      <p className="font-semibold text-sm">Scanning your form...</p>
                      <p className="text-xs text-muted-foreground mt-1">Checking against 200+ best practices</p>
                    </div>
                  </div>
                )}

                {/* Quickscan results — inline report */}
                {quickscanRun && (
                  <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                    {/* Score + categories */}
                    <div className="bg-surface rounded p-5">
                      <div className="flex gap-6">
                        {/* Donut chart */}
                        <div className="flex flex-col items-center gap-2">
                          <DonutChart score={quickscanScore} />
                          <p className="text-xs text-muted-foreground font-medium">Form Score</p>
                        </div>

                        {/* Category bars */}
                        <div className="flex-1 space-y-2.5">
                        {QUICKSCAN_CATEGORIES.map((cat) => {
                          const barColor = "hsl(var(--foreground))";
                          return (
                            <div key={cat.name} className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground w-24 shrink-0">{cat.name}</span>
                              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${(cat.score / cat.max) * 100}%`,
                                    backgroundColor: barColor,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium w-8 text-right">{cat.score}/{cat.max}</span>
                            </div>
                          );
                        })}
                        </div>
                      </div>

                      {/* Estimated visitors */}
                      <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                        {editingVisitors ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={visitorsInput}
                              onChange={(e) => setVisitorsInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const val = parseInt(visitorsInput);
                                  if (val > 0) setEstimatedVisitors(val);
                                  setEditingVisitors(false);
                                }
                              }}
                              className="h-7 w-28 text-xs"
                              autoFocus
                            />
                            <button onClick={() => {
                              const val = parseInt(visitorsInput);
                              if (val > 0) setEstimatedVisitors(val);
                              setEditingVisitors(false);
                            }}>
                              <Check className="w-3.5 h-3.5 text-foreground" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            ~{estimatedVisitors.toLocaleString()} monthly visitors estimated
                            <button onClick={() => { setVisitorsInput(String(estimatedVisitors)); setEditingVisitors(true); }}>
                              <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                            </button>
                          </p>
                        )}
                      </div>

                      {/* Improvement potential */}
                      {estimatedVisitors > 0 && (
                        <div className="mt-3 bg-primary/5 border border-primary/10 rounded p-3 flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold">Improvement potential: up to +30% conversion rate</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Instant fixes ~5-8% · Data-driven optimization up to +30%. Potential additional revenue: +€{Math.round(estimatedVisitors * 0.03 * 0.30 * formValue).toLocaleString()}/month based on €{formValue.toLocaleString()} form value
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Top 6 issues */}
                    <div className="bg-surface rounded p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">Top issues found</p>
                        <button
                          onClick={() => setFullReportOpen(true)}
                          className="text-xs text-primary font-medium hover:underline underline-offset-2 flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" /> View full report
                        </button>
                      </div>
                      <div className="space-y-2">
                        {QUICKSCAN_ISSUES.map((issue) => (
                          <div key={issue.id} className="flex items-center gap-3 text-sm">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${
                              issue.severity === "high" ? "bg-foreground" : issue.severity === "medium" ? "bg-foreground/60" : "bg-foreground/30"
                            }`} />
                            <span className="flex-1 text-xs">{issue.title}</span>
                            <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${
                              issue.severity === "high" ? "bg-muted text-foreground"
                                : issue.severity === "medium" ? "bg-muted text-muted-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}>{issue.severity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Get instant improvements button */}
                    <Button className="w-full gap-2" onClick={() => completeStep(3)}>
                      Get instant improvements <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <StepActions onSkip={() => skipStep(3)} />
              </div>
            </AccordionStep>

            {/* ========== STEP 4: Get instant form improvements ========== */}
            <AccordionStep
              number={4}
              title="Get instant form improvements"
              status={getStepStatus(4)}
              isOpen={expandedStep === 4}
              onToggle={() => toggleStep(4)}
              locked={!completedSteps.has(3)}
            >
              {!isPaidPlan ? (
                <div className="flex flex-col items-center text-center py-8 px-6 gap-4">
                  <LockKeyhole className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">Unlock instant improvements</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                      Apply autofixes and smart tooltips to immediately boost your form conversion rate. Available on the Growth plan.
                    </p>
                  </div>
                  <Button onClick={() => navigate("/pricing")}>Upgrade to Growth</Button>
                </div>
              ) : (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Start improving your forms right away — no traffic data or developer needed.
                </p>

                {/* Autofixes first (recommended) */}
                <div className={`bg-surface rounded p-5 space-y-3 border-2 ${!autofixesApplied ? "border-primary/20" : "border-border"}`}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <h4 className="font-semibold text-sm">Autofixes</h4>
                    {!autofixesApplied && (
                      <span className="text-[10px] font-semibold bg-primary text-primary-foreground rounded px-1.5 py-0.5">Recommended</span>
                    )}
                    {autofixesApplied && (
                      <span className="text-[10px] font-semibold bg-accent text-foreground rounded px-1.5 py-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Applied
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {quickscanRun
                      ? `Based on your quickscan, we found ${AUTOFIX_ITEMS.length} fixes that can be applied instantly to improve accessibility, UX, and conversions.`
                      : "Based on your form's HTML, we can automatically fix issues like missing labels, poor error messages, and accessibility problems."
                    }
                  </p>
                  <p className="text-[11px] text-muted-foreground italic">
                    Companies applying these fixes see on average <strong className="text-foreground">+3-5% conversions</strong> based on data from 500+ forms.
                  </p>

                  {/* Impact estimation — always visible when we have data */}
                  {estimatedVisitors > 0 && autofixImpact > 0 && (
                    <div className="flex items-start gap-2 rounded p-3 bg-primary/5 border border-primary/10">
                      <TrendingUp className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold">
                          {autofixesApplied ? "Applied" : "Estimated"} — +€{autofixImpact.toLocaleString()}/month extra revenue
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Based on ~{estimatedVisitors.toLocaleString()} monthly visitors and €{formValue.toLocaleString()} form value
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={autofixesApplied ? "outline" : "default"}
                      onClick={() => {
                        setAutofixItems(AUTOFIX_ITEMS.map(i => ({ ...i })));
                        setAutofixDialogOpen(true);
                      }}
                    >
                      {autofixesApplied ? "View autofixes" : "Apply autofixes"}
                    </Button>
                    {autofixesApplied && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setAutofixItems(AUTOFIX_ITEMS.map(i => ({ ...i })));
                          setAutofixDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                    )}
                  </div>
                </div>

                {/* Smart tooltips — unlocks after autofixes */}
                <div className={`bg-surface rounded p-5 space-y-3 ${!autofixesApplied ? "opacity-60" : ""} ${tooltipsApplied ? "border border-border" : autofixesApplied ? "border-2 border-primary/20" : "border border-border"}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <h4 className="font-semibold text-sm">Smart tooltips</h4>
                    {autofixesApplied && !tooltipsApplied && (
                      <span className="text-[10px] font-semibold bg-primary text-primary-foreground rounded px-1.5 py-0.5">Up next</span>
                    )}
                    {tooltipsApplied && (
                      <span className="text-[10px] font-semibold bg-accent text-foreground rounded px-1.5 py-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Applied
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add contextual help tooltips to your form fields. When users hesitate, a helpful message appears — like "This only takes 2 minutes" or "We'll never share your data."
                  </p>
                  <p className="text-[11px] text-muted-foreground italic">
                    Forms with smart tooltips see on average <strong className="text-foreground">+2-4% conversions</strong> based on data from 300+ forms.
                  </p>

                  {/* Impact estimation — always visible */}
                  {estimatedVisitors > 0 && tooltipImpact > 0 && autofixesApplied && (
                    <div className="flex items-start gap-2 rounded p-3 bg-primary/5 border border-primary/10">
                      <TrendingUp className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold">
                          {tooltipsApplied ? "Applied" : "Estimated"} — +€{tooltipImpact.toLocaleString()}/month extra revenue
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Based on ~{estimatedVisitors.toLocaleString()} monthly visitors and €{formValue.toLocaleString()} form value
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={tooltipsApplied ? "outline" : autofixesApplied ? "default" : "outline"}
                      disabled={!autofixesApplied}
                      onClick={() => {
                        setTooltipItems(SMART_TOOLTIP_ITEMS.map(i => ({ ...i })));
                        setTooltipDialogOpen(true);
                      }}
                    >
                      {tooltipsApplied ? "View smart tooltips" : "Add smart tooltips"}
                    </Button>
                    {tooltipsApplied && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setTooltipItems(SMART_TOOLTIP_ITEMS.map(i => ({ ...i })));
                          setTooltipDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                    )}
                  </div>
                </div>

                {(autofixesApplied && tooltipsApplied) && (
                  <div className="flex items-center gap-2 bg-accent rounded p-3 animate-in fade-in-0 duration-300">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold">All improvements applied! Moving on…</p>
                  </div>
                )}

                <StepActions onSkip={() => skipStep(4)} />
              </div>
              )}
            </AccordionStep>

            {/* ========== STEP 5: Explore Exatom ========== */}
            <AccordionStep
              number={5}
              title="Explore Exatom"
              status={getStepStatus(5)}
              isOpen={expandedStep === 5}
              onToggle={() => toggleStep(5)}
              locked={!completedSteps.has(4)}
            >
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Discover all the tools Exatom offers to understand and improve your forms.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: BarChart3, title: "Form engagement", desc: "See how users interact with your forms in real-time" },
                    { icon: Monitor, title: "Session replays", desc: "Watch recordings of users filling out your forms" },
                    { icon: Globe, title: "Industry benchmarks", desc: "Compare your form performance against industry averages" },
                    { icon: Sparkles, title: "AI analysis", desc: "Get AI-powered suggestions to improve conversions" },
                  ].map((item) => (
                    <button key={item.title} className="bg-surface rounded p-4 text-left hover:bg-muted transition-colors">
                      <item.icon className="w-5 h-5 mb-2" />
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="bg-surface rounded p-5 border border-dashed border-border">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-sm">Try with demo data</p>
                      <p className="text-xs text-muted-foreground">
                        Explore the platform with pre-filled example data — session replays, tooltips, A/B tests and more.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0 ml-auto">
                      Explore demo
                    </Button>
                  </div>
                </div>

                <StepActions
                  onComplete={() => completeStep(5)}
                  onSkip={() => skipStep(5)}
                  completeLabel="Mark as done"
                />
              </div>
            </AccordionStep>
          </div>

          {/* ========== NEED HELP ========== */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm font-semibold mb-3">Need help?</p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: BookOpen, label: "Installation guide" },
                { icon: Youtube, label: "Watch video" },
                { icon: MessageSquare, label: "Ask Eureka AI" },
                { icon: Mail, label: "Email to your developer", action: () => setEmailDevDialogOpen(true) },
                { icon: Users, label: "Invite teammate", action: () => setInviteDialogOpen(true) },
              ].map((h) => (
                <button
                  key={h.label}
                  onClick={h.action}
                  className="flex items-center gap-1.5 text-xs border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors"
                >
                  <h.icon className="w-3 h-3" />
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ================================================================ */}
      {/*  DIALOGS                                                         */}
      {/* ================================================================ */}

      {/* ---- Add Form Dialog (2 steps) ---- */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{editingFormIndex !== null ? "Edit form" : "Add form"}</DialogTitle>
          </DialogHeader>

          {/* Step bar */}
          <div className="flex items-center gap-3 pb-4">
            <div className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-1.5 text-xs font-medium ${formDialogStep === 1 ? "text-foreground" : "text-muted-foreground"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${formDialogStep === 1 ? "bg-foreground text-background" : formDialogStep === 2 ? "bg-foreground text-background" : "border border-border"}`}>
                  {formDialogStep > 1 ? <Check className="w-3 h-3" /> : "1"}
                </div>
              </div>
              <div className="flex-1 h-px bg-border" />
              <div className={`flex items-center gap-1.5 text-xs font-medium ${formDialogStep === 2 ? "text-foreground" : "text-muted-foreground"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${formDialogStep === 2 ? "bg-foreground text-background" : "border border-border"}`}>
                  2
                </div>
              </div>
            </div>
          </div>

          {formDialogStep === 1 && (
            <div className="space-y-5">
              {/* Big title */}
              <h2 className="text-xl font-bold">Add your form</h2>

              <FormRow label={<>What do you want to call this form? <InfoTip text="Give your form a recognisable name so you can easily find it in your dashboard." /></>}>
                <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Contact form" />
              </FormRow>

              <FormRow label={<>Form URL <InfoTip text="The page where this form is located." /></>}>
                <div className="relative">
                  <Input
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://www.example.com/contact"
                    disabled={!!formUrl && !isEditingFormUrl}
                    className={!!formUrl && !isEditingFormUrl ? "pr-10 bg-muted/50" : ""}
                  />
                  {formUrl && !isEditingFormUrl && (
                    <button
                      type="button"
                      onClick={() => setIsEditingFormUrl(true)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {formUrl && isEditingFormUrl && (
                    <button
                      type="button"
                      onClick={() => setIsEditingFormUrl(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </FormRow>

              {/* Category — always visible grid */}
              <div>
                <label className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                  Category <InfoTip text="Categorise your form so we can apply relevant benchmarks and best practices." />
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`flex flex-col items-center gap-1.5 border rounded px-3 py-3 text-xs transition-colors ${
                        selectedCategory === cat.value
                          ? "border-foreground bg-accent font-medium"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <cat.icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion value slider */}
              <div>
                <label className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                  Conversion value <InfoTip text="The average revenue or value each form submission generates for your business." />
                </label>
                <p className="text-xs text-muted-foreground mb-3">Average order or lead value per conversion. This is an estimate — you can always update it later.</p>
                <div className="space-y-3">
                  <Slider
                    value={[valueToSliderPosition(conversionValue[0])]}
                    onValueChange={(pos) => setConversionValue([sliderPositionToValue(pos[0])])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>€1</span>
                    <span className="text-sm font-semibold text-foreground">€{conversionValue[0].toLocaleString()}</span>
                    <span>€10,000</span>
                  </div>
                </div>
              </div>

              {/* Form fields — collapsible */}
              <div className="border border-border rounded">
                <button
                  type="button"
                  onClick={() => setShowFormFields(!showFormFields)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    Detected form fields
                    <span className="text-xs font-normal text-muted-foreground">
                      ({FORM_FIELDS.length} fields)
                    </span>
                  </span>
                  {showFormFields ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {showFormFields && (
                  <div className="px-4 pb-4 space-y-2">
                    {FORM_FIELDS.filter(f => !deletedFields.has(f.id)).map((field) => {
                      const isHidden = hiddenFields.has(field.id);
                      return (
                        <div key={field.id} className={`flex items-center gap-3 border border-border rounded-lg p-3 ${isHidden ? "opacity-40" : ""}`}>
                          {/* Field type preview */}
                          <div className="flex flex-col items-center gap-0.5 shrink-0">
                            <div className="w-10 h-10 rounded bg-muted/50 border border-border flex items-center justify-center">
                              <field.icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <span className="text-[9px] text-muted-foreground">{field.type}</span>
                          </div>

                          {/* Field info */}
                          <div className="flex-1 min-w-0">
                            {editingFieldId === field.id ? (
                              <Input
                                autoFocus
                                defaultValue={field.label}
                                onBlur={(e) => {
                                  field.label = e.target.value;
                                  setEditingFieldId(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    field.label = (e.target as HTMLInputElement).value;
                                    setEditingFieldId(null);
                                  }
                                }}
                                className="h-7 text-xs"
                              />
                            ) : (
                              <p className="text-xs font-semibold truncate">{field.label}</p>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {field.category}
                            </p>
                          </div>

                          {/* Action icons — horizontal */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setEditingFieldId(editingFieldId === field.id ? null : field.id)}
                              className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              title="Edit label"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setHiddenFields(prev => {
                                const next = new Set(prev);
                                if (next.has(field.id)) next.delete(field.id);
                                else next.add(field.id);
                                return next;
                              })}
                              className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              title={isHidden ? "Show field" : "Hide field"}
                            >
                              {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletedFields(prev => new Set([...prev, field.id]))}
                              className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
                              title="Remove field"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={() => setFormDialogStep(2)} className="flex-1">
                  Next: Conversion tracking
                </Button>
              </div>
            </div>
          )}

          {formDialogStep === 2 && (
            <div className="space-y-5">
              {/* Big title */}
              <h2 className="text-xl font-bold">
                Does this form have a thank-you page after submission?
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => setHasThankYouPage(true)}
                  className={`flex-1 border rounded p-5 text-left transition-colors ${
                    hasThankYouPage === true ? "border-foreground bg-accent" : "border-border hover:bg-muted"
                  }`}
                >
                  <p className="font-semibold text-base">Yes, I have a thank-you page</p>
                  <p className="text-sm text-muted-foreground mt-1">Just enter the URL</p>
                </button>
                <button
                  onClick={() => setHasThankYouPage(false)}
                  className={`flex-1 border rounded p-5 text-left transition-colors ${
                    hasThankYouPage === false ? "border-foreground bg-accent" : "border-border hover:bg-muted"
                  }`}
                >
                  <p className="font-semibold text-base">No thank-you page</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll add a conversion tag</p>
                </button>
              </div>

              {hasThankYouPage === true && (
                <FormRow label="Thank-you URL">
                  <Input placeholder="/thank-you" />
                </FormRow>
              )}

              {hasThankYouPage === false && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Conversion tag installation</p>
                    <InfoTip text="Since your form doesn't redirect to a thank-you page, a conversion tag is needed to detect successful submissions." />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Place this code on the page where your form is displayed, just before the closing <code className="text-xs font-mono bg-muted px-1 rounded">&lt;/body&gt;</code> tag.
                  </p>

                  <div className="flex items-center gap-2 bg-background border border-border rounded p-3">
                    <code className="flex-1 text-xs font-mono break-all">
                      {'<script>exatom("trackConversion", {formId: "' + (formName ? formName.toLowerCase().replace(/\s+/g, '-') : 'form') + '"});</script>'}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 shrink-0"
                      onClick={() => copyToClipboard(`<script>exatom("trackConversion", {formId: "${formName ? formName.toLowerCase().replace(/\s+/g, '-') : 'form'}"});</script>`)}
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </Button>
                  </div>

                  {conversionTagVerified ? (
                    <div className="flex items-center gap-2 bg-accent rounded p-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Conversion tag verified!</p>
                        <p className="text-xs text-muted-foreground">Form submissions will now be tracked automatically.</p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setConversionTagVerifying(true);
                        setTimeout(() => {
                          setConversionTagVerifying(false);
                          setConversionTagVerified(true);
                          toast.success("🎉 Conversion tag verified!");
                        }, 2500);
                      }}
                      disabled={conversionTagVerifying}
                      className="w-full"
                    >
                      {conversionTagVerifying ? (
                        <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Verifying tag…</>
                      ) : (
                        <><CheckCircle className="w-4 h-4 mr-1" /> Verify conversion tag</>
                      )}
                    </Button>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setFormDialogStep(1)}>Back</Button>
                {editingFormIndex !== null && (
                  <Button variant="outline" onClick={() => deleteForm(editingFormIndex)}>Delete form</Button>
                )}
                <Button className="flex-1" onClick={saveForm}>
                  {editingFormIndex !== null ? "Save changes" : "Add form"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ---- Autofixes Dialog ---- */}
      <Dialog open={autofixDialogOpen} onOpenChange={setAutofixDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Zap className="w-5 h-5" /> Recommended autofixes
            </DialogTitle>
            <DialogDescription>
              Based on your form's HTML scan, these fixes can be applied instantly. Toggle individual fixes on or off.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {autofixItems.map((item, idx) => (
              <div key={item.id} className="flex items-start gap-3 border border-border rounded p-4">
                <item.icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${
                      item.severity === "high" ? "bg-muted text-foreground"
                        : item.severity === "medium" ? "bg-muted text-muted-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>{item.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Switch
                  checked={item.enabled}
                  onCheckedChange={(checked) => {
                    setAutofixItems(prev => prev.map((it, i) => i === idx ? { ...it, enabled: checked } : it));
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setAutofixDialogOpen(false)}>Cancel</Button>
            <Button className="flex-1 gap-1" onClick={() => {
              setAutofixesApplied(true);
              setAutofixDialogOpen(false);
              const enabledCount = autofixItems.filter(i => i.enabled).length;
              toast.success(`${enabledCount} autofixes applied successfully!`);
            }}>
              <Zap className="w-4 h-4" />
              Apply {autofixItems.filter(i => i.enabled).length} fixes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Smart Tooltips Dialog ---- */}
      <Dialog open={tooltipDialogOpen} onOpenChange={setTooltipDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CheckCircle className="w-5 h-5" /> Recommended smart tooltips
            </DialogTitle>
            <DialogDescription>
              These tooltips appear when users hesitate on a field, reducing doubt and boosting conversions. Toggle individual tooltips on or off.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {tooltipItems.map((item, idx) => (
              <div key={item.id} className="flex items-start gap-3 border border-border rounded p-4">
                <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{item.field}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 italic">"{item.tooltip}"</p>
                </div>
                <Switch
                  checked={item.enabled}
                  onCheckedChange={(checked) => {
                    setTooltipItems(prev => prev.map((it, i) => i === idx ? { ...it, enabled: checked } : it));
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setTooltipDialogOpen(false)}>Cancel</Button>
            <Button className="flex-1 gap-1" onClick={() => {
              setTooltipsApplied(true);
              setTooltipDialogOpen(false);
              const enabledCount = tooltipItems.filter(i => i.enabled).length;
              toast.success(`${enabledCount} smart tooltips activated!`);
              if (!completedSteps.has(4)) completeStep(4);
            }}>
              <CheckCircle className="w-4 h-4" />
              Activate {tooltipItems.filter(i => i.enabled).length} tooltips
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Full Report Dialog ---- */}
      <Dialog open={fullReportOpen} onOpenChange={setFullReportOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[780px] p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Award className="w-5 h-5" /> Full Quickscan Report
            </DialogTitle>
            <DialogDescription>
              Complete analysis of your form against 200+ best practices across 8 categories.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Potential block */}
            {estimatedVisitors > 0 && (
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <p className="font-semibold text-sm">Conversion Growth Potential</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-background rounded p-4 text-center">
                    <p className="text-2xl font-bold text-primary">+5-8%</p>
                    <p className="text-xs text-muted-foreground mt-1">Estimated conversion rate improvement</p>
                  </div>
                  <div className="bg-background rounded p-4 text-center">
                    <p className="text-2xl font-bold text-primary">+€{Math.round(estimatedVisitors * 0.03 * 0.08 * formValue).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Potential additional revenue / month</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Based on ~{estimatedVisitors.toLocaleString()} monthly visitors and €{formValue.toLocaleString()} form conversion value. Estimates based on averages from 500+ similar forms.
                </p>
              </div>
            )}

            {/* Overall score */}
            <div className="flex items-center gap-4 bg-surface rounded p-4">
              <DonutChart score={quickscanScore} />
              <div>
                <p className="font-semibold">Overall Form Score: {quickscanScore}/100</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your form has room for improvement. Apply the suggested fixes to boost your score.
                </p>
              </div>
            </div>

            {/* Category reports */}
            {FULL_REPORT_ITEMS.map((cat) => {
              const passed = cat.checks.filter(c => c.pass).length;
              const total = cat.checks.length;
              const scorePct = (cat.score || 0) / 10;
              const scoreColor = "bg-primary";
              return (
                <div key={cat.category} className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                    <div>
                      <p className="font-semibold text-sm">{cat.category}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{passed}/{total} passed</span>
                      <span className={`text-xs font-bold text-white rounded px-2 py-0.5 ${scoreColor}`}>
                        {cat.score}/10
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    {cat.checks.map((check, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {check.pass ? (
                          <CheckCircle className="w-3.5 h-3.5 text-foreground shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-foreground shrink-0" />
                        )}
                        <span className={check.pass ? "text-muted-foreground" : "text-foreground"}>{check.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setFullReportOpen(false)}>Close</Button>
            <Button className="flex-1 gap-1" onClick={() => {
              setFullReportOpen(false);
              completeStep(3);
            }}>
              Get instant improvements <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- GTM Dialog ---- */}
      <Dialog open={gtmDialogOpen} onOpenChange={setGtmDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" /> Activating Exatom on your website
            </DialogTitle>
            <DialogDescription>
              Our <strong>Google Tag Manager</strong> integration is the fastest way to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-border rounded p-5 text-center space-y-2 cursor-pointer hover:bg-muted/50 transition-colors relative" onClick={() => copyToClipboard("I25M")}>
                <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"><Copy className="w-3.5 h-3.5" /></button>
                <p className="text-sm font-semibold text-primary">Client code</p>
                <p className="text-2xl font-bold tracking-wider">I25M</p>
              </div>
              <div className="border border-border rounded p-5 text-center space-y-2 cursor-pointer hover:bg-muted/50 transition-colors relative" onClick={() => copyToClipboard("2XHJH")}>
                <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"><Copy className="w-3.5 h-3.5" /></button>
                <p className="text-sm font-semibold text-primary">Conversion code</p>
                <p className="text-2xl font-bold tracking-wider">2XHJH</p>
              </div>
            </div>
            <div className="border border-border rounded p-5 space-y-2">
              <div className="flex items-center gap-2 mb-2"><Tag className="w-4 h-4" /><p className="font-semibold text-sm">Google Tag Manager</p></div>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Follow our <a href="https://support.exatom.io/portal/en/kb/articles/google-tag-manager#Prerequisites" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">installation guide</a>.</li>
                <li>Visit your website and test your form and submit it.</li>
                <li>Continue the set up over here by continuing to the next step.</li>
              </ol>
            </div>
            <Button className="w-full gap-2" onClick={() => window.open("https://tagmanager.google.com", "_blank")}>
              <ExternalLink className="w-4 h-4" /> Open Google Tag Manager
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Shopify Dialog ---- */}
      <Dialog open={shopifyDialogOpen} onOpenChange={setShopifyDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> Shopify integration</DialogTitle>
            <DialogDescription>Install the Exatom plugin from the Shopify App Store.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
              <li>Click the button below to open the Exatom plugin in the Shopify App Store.</li>
              <li>Click <strong>"Add app"</strong> and follow the installation steps.</li>
              <li>Once installed, Exatom will automatically start tracking your Shopify checkout forms.</li>
              <li>Come back here and verify your installation.</li>
            </ol>
            <Button className="w-full gap-2" onClick={() => window.open("https://apps.shopify.com/exatom-checkout-analytics?locale=nl", "_blank")}>
              <ExternalLink className="w-4 h-4" /> Install Exatom Shopify plugin
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- WordPress Dialog ---- */}
      <Dialog open={wordpressDialogOpen} onOpenChange={setWordpressDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FileCode className="w-5 h-5" /> WordPress integration</DialogTitle>
            <DialogDescription>Install Exatom on your WordPress site.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
              <li>Install the "Insert Headers and Footers" plugin (or similar).</li>
              <li>Go to Settings → Insert Headers and Footers.</li>
              <li>Paste the Exatom tag in the "Scripts in Header" box.</li>
              <li>Save changes and verify.</li>
            </ol>
            <Button className="w-full gap-2" onClick={() => setWordpressDialogOpen(false)}>Got it</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Email Developer Dialog ---- */}
      <Dialog open={emailDevDialogOpen} onOpenChange={setEmailDevDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Mail className="w-5 h-5" /> Email to your developer</DialogTitle>
            <DialogDescription>Send the installation instructions to your developer so they can set it up for you.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <FormRow label="Developer's email address">
              <Input
                placeholder="developer@company.com"
                value={emailDevAddress}
                onChange={(e) => setEmailDevAddress(e.target.value)}
              />
            </FormRow>
            <FormRow label={<>Add a personal note <span className="text-muted-foreground font-normal">(optional)</span></>}>
              <Textarea
                placeholder="Add a personal note (optional)"
                value={emailDevPersonalNote}
                onChange={(e) => setEmailDevPersonalNote(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </FormRow>
            <div>
              <p className="text-sm font-semibold mb-2">Email preview</p>
              <div className="bg-muted/40 rounded-lg p-4 text-sm font-mono space-y-2 text-muted-foreground">
                <p><span className="text-foreground font-semibold">Subject:</span> Please install Exatom on our website</p>
                <p>Hi,</p>
                {emailDevPersonalNote.trim() && (
                  <p>{emailDevPersonalNote.trim()}</p>
                )}
                <p>Could you add the Exatom tracking tag to our website? Here are the instructions:</p>
                <p>1. Copy this script tag:<br />
                  {'<script src="https://assets.exatom.io/event.js?clientCode=SWVN" async></script>'}
                </p>
                <p>2. Paste it in the &lt;head&gt; section of every page that has a form.</p>
                <p>3. Once installed, let me know so I can verify it's working.</p>
                <p>Thanks!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="email-dev-copy"
                checked={emailDevSendCopy}
                onCheckedChange={(checked) => setEmailDevSendCopy(!!checked)}
              />
              <label htmlFor="email-dev-copy" className="text-sm cursor-pointer select-none">
                Send me a copy
              </label>
            </div>
            <Button className="w-full gap-2" onClick={() => {
              toast.success("Instructions sent to your developer!");
              setEmailDevDialogOpen(false);
            }}>
              <Send className="w-4 h-4" /> Send instructions
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Invite Dialog ---- */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8">
          <DialogHeader>
            <DialogTitle>Invite teammates</DialogTitle>
            <DialogDescription>
              Send invites to your team members.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground bg-muted/50 rounded px-3 py-2">
              All teammates get full access on the free plan.
            </p>
            {inviteRows.map((row, i) => (
              <div key={i} className="flex items-center gap-3">
                <Input
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => {
                    const updated = [...inviteRows];
                    updated[i] = { ...updated[i], name: e.target.value };
                    setInviteRows(updated);
                  }}
                  className="flex-1"
                />
                <Input
                  placeholder="Email address"
                  value={row.email}
                  onChange={(e) => {
                    const updated = [...inviteRows];
                    updated[i] = { ...updated[i], email: e.target.value };
                    setInviteRows(updated);
                  }}
                  className="flex-1"
                />
                {inviteRows.length > 1 && (
                  <button
                    onClick={() => setInviteRows(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addInviteRow}
              className="flex items-center gap-1 text-sm text-primary font-medium"
            >
              <Plus className="w-3 h-3" /> Add another person
            </button>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
              <Button className="gap-2"><Send className="w-4 h-4" /> Send invites</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Welcome Dialog ---- */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-[620px] p-4 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-xl">Boost your form conversions by up to 30%</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-2">
              Welcome {userName.split(' ')[0]} — you're on the free plan. In the next few minutes, you'll set up quick wins that give your forms an immediate boost of ~5-8%. The real gains come after — with data driven optimization.
            </DialogDescription>
          </DialogHeader>
          <div className="border border-border rounded-lg p-4 space-y-3 mt-2">
            <p className="text-sm font-semibold">Quick wins you'll set up now:</p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Auto-fix common form issues</div>
                <span className="text-xs text-muted-foreground">avg. +3-5% conversions</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Smart conversion tooltips</div>
                <span className="text-xs text-muted-foreground">avg. +2-4% conversions</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Real-time visitor & drop-off insights</div>
                <span className="text-xs text-muted-foreground">continuous optimization</span>
              </div>
            </div>
            <Separator className="my-1" />
            <p className="text-xs font-semibold text-muted-foreground">And there's more after setup...</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><LockKeyhole className="w-4 h-4" /> Data-driven field optimization</div>
                <span className="text-xs">avg. +10-15% conversions</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><LockKeyhole className="w-4 h-4" /> AI-powered A/B testing</div>
                <span className="text-xs">avg. +8-12% conversions</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><LockKeyhole className="w-4 h-4" /> Advanced drop-off recovery</div>
                <span className="text-xs">avg. +5-10% conversions</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground italic">Available on the Growth plan — unlock the full +30% potential by upgrading</p>
          </div>
          <Button className="w-full mt-4" onClick={() => setShowWelcomeDialog(false)}>Start boosting my forms</Button>
        </DialogContent>
      </Dialog>

      {/* ---- Upgrade Modal (locked features) ---- */}
      <Dialog open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[420px] p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <LockKeyhole className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">{upgradeModalFeature}</h2>
            <p className="text-sm text-muted-foreground">
              {LOCKED_FEATURES[upgradeModalFeature] || ""}
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setUpgradeModalOpen(false);
                navigate("/pricing");
              }}
            >
              Upgrade to Growth
            </Button>
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Onboarding Completion Dialog ---- */}
      <Dialog open={completionDialogOpen} onOpenChange={setCompletionDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[820px] p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Congratulations */}
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">You're all set!</h2>
              <p className="text-sm text-muted-foreground">
                Your onboarding is complete. Exatom is now tracking your forms and collecting data.
                It usually takes a <strong>few days</strong> to gather enough data for meaningful insights — we'll notify you as soon as results are ready.
              </p>

              <div className="bg-surface rounded-lg p-4 space-y-3">
                <p className="text-sm font-semibold">What happens next?</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <BarChart3 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Data from your form fields will start flowing in over the coming days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Once enough data is collected, you'll get AI-powered recommendations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bell className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Set up <strong>performance alerts</strong> to get notified when something needs attention.</span>
                  </li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-4 flex items-center gap-3">
                <Star className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">You're on the free plan</p>
                  <p className="text-xs text-muted-foreground">Upgrade anytime to unlock all features.</p>
                </div>
              </div>

              <Button variant="outline" onClick={() => setCompletionDialogOpen(false)}>
                Go to Dashboard
              </Button>
            </div>

            {/* Right: Eureka CTA */}
            <div className="flex flex-col gap-4 justify-center">
              <div className="border border-primary/20 bg-primary/5 rounded-lg p-6 flex flex-col gap-4">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-lg font-bold">Unlock up to +30% conversion improvement</p>
                  <p className="text-sm text-muted-foreground mt-1">Upgrade to Growth for data driven optimization, AI A/B testing, and advanced drop-off recovery.</p>
                </div>
                <Button onClick={() => { setCompletionDialogOpen(false); navigate("/pricing"); }}>
                  Upgrade to Growth
                </Button>
              </div>
              <Button className="gap-1" variant="outline" onClick={() => setCompletionDialogOpen(false)}>
                <Bell className="w-4 h-4" /> Set up performance alerts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </TooltipProvider>
  );
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const StepActions = ({
  onComplete,
  completeLabel,
}: {
  onComplete?: () => void;
  onSkip?: () => void;
  completeLabel?: string;
}) => {
  if (!onComplete || !completeLabel) return null;
  return (
    <div className="flex items-center gap-3 pt-2">
      <Button size="sm" onClick={onComplete}>
        <Check className="w-3 h-3 mr-1" />
        {completeLabel}
      </Button>
    </div>
  );
};

const FormRow = ({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold">{label}</label>
    <div>{children}</div>
  </div>
);

/* ---- Sidebar ---- */

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  indent,
  locked,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  indent?: boolean;
  locked?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
      indent ? "pl-8" : ""
    } ${active ? "bg-accent font-medium" : "hover:bg-accent"} ${locked ? "text-muted-foreground" : ""}`}
  >
    <Icon className="w-4 h-4 shrink-0" />
    <span className="flex-1 text-left">{label}</span>
    {locked && <LockKeyhole className="w-3.5 h-3.5 shrink-0 opacity-50" />}
  </button>
);

const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium"
      >
        {title}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
};

/* ---- Accordion step ---- */

const AccordionStep = ({
  number,
  title,
  status,
  isOpen,
  onToggle,
  children,
  locked,
}: {
  number: number;
  title: string;
  status: "pending" | "completed";
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  locked?: boolean;
}) => (
  <div
    className={`border rounded ${
      locked
        ? "border-border bg-background opacity-60"
        : status === "completed"
        ? "border-foreground/30 bg-background"
        : isOpen
        ? "border-foreground/40 bg-background"
        : "border-border bg-background"
    }`}
  >
    <button
      onClick={locked ? undefined : onToggle}
      className={`w-full flex items-center justify-between p-4 sm:p-6 text-left ${locked ? "cursor-not-allowed" : ""}`}
    >
      <div className="flex items-center gap-3">
        {status === "completed" ? (
          <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-background" />
          </div>
        ) : isOpen ? (
          <div className="w-6 h-6 rounded-full border border-foreground flex items-center justify-center shrink-0 text-xs font-bold text-foreground">
            {number}
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 text-xs font-semibold text-muted-foreground">
            {number}
          </div>
        )}
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        {status === "completed" && (
          <span className="text-xs text-muted-foreground ml-2">Completed</span>
        )}
        {locked && (
          <span className="text-xs text-muted-foreground ml-2">Complete previous steps first</span>
        )}
      </div>
      {!locked && (isOpen ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />)}
    </button>
    {isOpen && !locked && children && <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>}
  </div>
);

export default GetStarted;
