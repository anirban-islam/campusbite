"use client";

import { useState } from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonRounded,
  Input,
  InputVariant,
  InputSize,
  InputRounded,
  Dropdown,
  DropdownOption,
  DropdownVariant,
  DropdownSize,
  DropdownRounded,
  Checkbox,
  CheckboxSize,
  CheckboxRounded,
  Textarea,
  TextareaVariant,
  TextareaSize,
  TextareaRounded,
  TextareaResize,
  Badge,
  BadgeVariant,
  BadgeSize,
  BadgeRounded,
  RadioGroup,
  RadioGroupItem,
  RadioSize,
  RadioVariant,
  RadioOrientation,
} from "@/components/ui";
import {
  CartIcon,
  ArrowRight,
  LocationPinIcon,
  Search,
  Mail,
  Utensils,
  Coffee,
  Pizza,
  Salad,
  Store,
  Flame,
  Sparkles,
  Tag,
  Check,
  Bike,
  Clock,
  CreditCard,
} from "@/lib/icons";

export default function DesignArchitecturePage() {
  const [activeTab, setActiveTab] = useState<"radiogroup" | "badge" | "textarea" | "checkbox" | "dropdown" | "input" | "button">("radiogroup");

  // RadioGroup Playground State
  const [radioSize, setRadioSize] = useState<RadioSize>("md");
  const [radioVariant, setRadioVariant] = useState<RadioVariant>("card");
  const [radioOrientation, setRadioOrientation] = useState<RadioOrientation>("vertical");
  const [radioValue, setRadioValue] = useState("delivery");
  const [radioHasError, setRadioHasError] = useState(false);
  const [radioDisabled, setRadioDisabled] = useState(false);

  // Badge Playground State
  const [badgeVariant, setBadgeVariant] = useState<BadgeVariant>("popular");
  const [badgeSize, setBadgeSize] = useState<BadgeSize>("md");
  const [badgeRounded, setBadgeRounded] = useState<BadgeRounded>("full");
  const [badgeDot, setBadgeDot] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const [badgeWithIcon, setBadgeWithIcon] = useState(true);
  const [badgeText, setBadgeText] = useState("Most Popular");

  // Textarea Playground State
  const [taVariant, setTaVariant] = useState<TextareaVariant>("outline");
  const [taSize, setTaSize] = useState<TextareaSize>("md");
  const [taRounded, setTaRounded] = useState<TextareaRounded>("lg");
  const [taResize, setTaResize] = useState<TextareaResize>("vertical");
  const [taLabel, setTaLabel] = useState("Special Food Instructions");
  const [taPlaceholder, setTaPlaceholder] = useState("e.g. Please put spicy sauce on the side, extra crispy fries...");
  const [taHelper, setTaHelper] = useState("The campus cafeteria kitchen will review your note.");
  const [taError, setTaError] = useState(false);
  const [taDisabled, setTaDisabled] = useState(false);
  const [taRequired, setTaRequired] = useState(false);
  const [taShowCount, setTaShowCount] = useState(true);

  // Checkbox Playground State
  const [cbChecked, setCbChecked] = useState(true);
  const [cbSize, setCbSize] = useState<CheckboxSize>("md");
  const [cbRounded, setCbRounded] = useState<CheckboxRounded>("md");
  const [cbIndeterminate, setCbIndeterminate] = useState(false);
  const [cbDisabled, setCbDisabled] = useState(false);
  const [cbError, setCbError] = useState(false);
  const [cbLabel, setCbLabel] = useState("Include Cutlery & Napkins");
  const [cbDescription, setCbDescription] = useState("Help our campus cafeteria reduce plastic waste if not needed.");

  // Dropdown Playground State
  const [dropdownValue, setDropdownValue] = useState("hall-a");
  const [dropdownVariant, setDropdownVariant] = useState<DropdownVariant>("outline");
  const [dropdownSize, setDropdownSize] = useState<DropdownSize>("md");
  const [dropdownRounded, setDropdownRounded] = useState<DropdownRounded>("lg");
  const [dropdownSearchable, setDropdownSearchable] = useState(true);
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [dropdownRequired, setDropdownRequired] = useState(true);
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownLeftIcon, setDropdownLeftIcon] = useState(true);
  const [dropdownHideScrollbar, setDropdownHideScrollbar] = useState(false);

  // Button Playground State
  const [btnVariant, setBtnVariant] = useState<ButtonVariant>("primary");
  const [btnSize, setBtnSize] = useState<ButtonSize>("md");
  const [btnRounded, setBtnRounded] = useState<ButtonRounded>("lg");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLeftIcon, setBtnLeftIcon] = useState(false);
  const [btnRightIcon, setBtnRightIcon] = useState(false);
  const [btnText, setBtnText] = useState("Order Meal");

  // Input Playground State
  const [inputVariant, setInputVariant] = useState<InputVariant>("outline");
  const [inputSize, setInputSize] = useState<InputSize>("md");
  const [inputRounded, setInputRounded] = useState<InputRounded>("lg");
  const [inputLabel, setInputLabel] = useState("Delivery Location");
  const [inputPlaceholder, setInputPlaceholder] = useState("e.g. Science Building, Room 204");
  const [inputHelper, setInputHelper] = useState("We will deliver your food directly to your floor.");
  const [hasError, setHasError] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputRequired, setInputRequired] = useState(true);
  const [inputLeftIcon, setInputLeftIcon] = useState(true);

  const campusLocations: DropdownOption[] = [
    { value: "hall-a", label: "Central Dining Hall", description: "Main Campus Center, Ground Floor" },
    { value: "sci-quad", label: "Science Quad Cafe", description: "Building B, Near Laboratory 3" },
    { value: "lib-bistro", label: "Library Bistro & Coffee", description: "2nd Floor, Quiet Study Wing" },
    { value: "eng-hub", label: "Engineering Food Hub", description: "Tech Block, East Terrace" },
    { value: "dorm-south", label: "South Residence Commons", description: "Hostel Zone 4, Fast Pickup" },
    { value: "admin-kiosk", label: "Administration Kiosk", description: "Main Gate, Pickup Point 1" },
  ];

  const mealCategories: DropdownOption[] = [
    { value: "all", label: "All Items" },
    { value: "breakfast", label: "Breakfast & Bakery" },
    { value: "meals", label: "Lunch & Dinner Plates" },
    { value: "snacks", label: "Quick Bites & Burgers" },
    { value: "drinks", label: "Beverages & Cold Brews" },
    { value: "dessert", label: "Desserts & Pastries" },
  ];

  const btnVariants: ButtonVariant[] = [
    "primary",
    "secondary",
    "outline",
    "subtle",
    "ghost",
    "destructive",
    "link",
  ];
  const btnSizes: ButtonSize[] = ["sm", "md", "lg", "icon", "icon-sm"];
  const roundedOptions = ["none", "sm", "md", "lg", "xl", "full"] as const;

  const inputVariants: InputVariant[] = ["outline", "filled", "subtle"];
  const inputSizes: InputSize[] = ["sm", "md", "lg"];

  const BagIcon = () => <CartIcon className="w-4 h-4" />;
  const ArrowRightIcon = () => <ArrowRight className="w-4 h-4" />;
  const PinIcon = () => <LocationPinIcon className="w-4 h-4" />;
  const SearchIcon = () => <Search className="w-4 h-4" />;
  const MailIcon = () => <Mail className="w-4 h-4" />;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="border-b border-border pb-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary-200">
              Design Architecture
            </span>
            <span className="text-xs text-muted-foreground">@/components/ui/</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            CampusBite UI Component System
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Reusable, accessible UI components styled strictly with global brand tokens (<span className="text-primary font-semibold">#c34e31</span>).
            Organized inside <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-foreground">src/components/ui/</code>.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab("radiogroup")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "radiogroup"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Radio Group Component
            </button>
            <button
              onClick={() => setActiveTab("badge")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "badge"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Badge Component
            </button>
            <button
              onClick={() => setActiveTab("textarea")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "textarea"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Textarea Component
            </button>
            <button
              onClick={() => setActiveTab("checkbox")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "checkbox"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Checkbox Component
            </button>
            <button
              onClick={() => setActiveTab("dropdown")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "dropdown"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Dropdown Component
            </button>
            <button
              onClick={() => setActiveTab("input")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "input"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Input Component
            </button>
            <button
              onClick={() => setActiveTab("button")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "button"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Button Component
            </button>
          </div>
        </header>

        {/* ======================= RADIO GROUP COMPONENT TAB ======================= */}
        {activeTab === "radiogroup" && (
          <div className="space-y-10">
            {/* Interactive RadioGroup Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive RadioGroup Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Single-choice selection component supporting standard radio indicators, horizontal flows, and food-ordering card tiles.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["default", "card"] as RadioVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setRadioVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            radioVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as RadioSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRadioSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            radioSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orientation */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Orientation (`orientation`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["vertical", "horizontal"] as RadioOrientation[]).map((o) => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setRadioOrientation(o)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            radioOrientation === o
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Toggles */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Interactive States
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <Checkbox
                        size="sm"
                        label="Error state"
                        checked={radioHasError}
                        onChange={(e) => setRadioHasError(e.target.checked)}
                      />
                      <Checkbox
                        size="sm"
                        label="Disabled group"
                        checked={radioDisabled}
                        onChange={(e) => setRadioDisabled(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview Display */}
                <div className="lg:col-span-5 bg-background/50 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        Live Preview
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-foreground">
                        Selected: <strong className="text-primary font-bold">{radioValue}</strong>
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-dashed border-border/80 bg-card">
                      <RadioGroup
                        value={radioValue}
                        onChange={setRadioValue}
                        size={radioSize}
                        variant={radioVariant}
                        orientation={radioOrientation}
                        disabled={radioDisabled}
                        error={radioHasError ? "Please select a fulfillment method to proceed." : undefined}
                        label="Select Campus Fulfillment Method"
                        required
                        helperText="Estimated arrival times updated live based on kitchen queue."
                      >
                        <RadioGroupItem
                          value="delivery"
                          label="Dorm Delivery"
                          description="Courier delivers straight to your residential hall entrance."
                          icon={<Bike />}
                          badge={<Badge variant="popular" size="sm">Fastest</Badge>}
                        />
                        <RadioGroupItem
                          value="pickup"
                          label="Express Counter Pickup"
                          description="Skip lines at Campus Central Dining Hall, Counter #4."
                          icon={<Store />}
                          badge={<Badge variant="available" size="sm">Ready in 5m</Badge>}
                        />
                        <RadioGroupItem
                          value="dine_in"
                          label="Cafeteria Dine-In"
                          description="Reserved seating at Student Center table with food bell."
                          icon={<Utensils />}
                        />
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div className="bg-card p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground overflow-x-auto">
                    <code>
                      {`<RadioGroup value="${radioValue}" size="${radioSize}" variant="${radioVariant}">\n  <RadioGroupItem value="delivery" label="Dorm Delivery" />\n  <RadioGroupItem value="pickup" label="Express Pickup" />\n</RadioGroup>`}
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Food Ordering Real-World Card Radios */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Food Ordering Real-World Scenarios</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  How RadioGroup is applied across CampusBite meal customizations, portions, and payments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scenario 1: Portion Size Selector */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <h3 className="font-bold text-foreground flex items-center justify-between">
                    <span>1. Portion Size Options</span>
                    <Badge variant="subtle" size="sm">Required</Badge>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Card radio selector for double patties, sides, and drink combos.
                  </p>

                  <RadioGroup defaultValue="regular" variant="card" size="md">
                    <RadioGroupItem
                      value="small"
                      label="Standard Single Patty"
                      description="120g beef patty with classic house seasoning."
                      badge={<span className="text-xs font-mono font-bold text-foreground">$5.50</span>}
                    />
                    <RadioGroupItem
                      value="regular"
                      label="Double Deluxe Combo"
                      description="Two patties + melted cheese + seasoned campus fries."
                      badge={<span className="text-xs font-mono font-bold text-primary">$8.20</span>}
                    />
                    <RadioGroupItem
                      value="jumbo"
                      label="Campus Beast Monster Box"
                      description="Three patties + bacon + waffle fries + beverage."
                      badge={<span className="text-xs font-mono font-bold text-foreground">$11.00</span>}
                    />
                  </RadioGroup>
                </div>

                {/* Scenario 2: Payment Method */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <h3 className="font-bold text-foreground flex items-center justify-between">
                    <span>2. Campus Checkout Payment</span>
                    <Badge variant="subtle" size="sm">Single Choice</Badge>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Quick tap radio choices supporting Student ID card balance or credit.
                  </p>

                  <RadioGroup defaultValue="campus_card" variant="card" size="md">
                    <RadioGroupItem
                      value="campus_card"
                      label="Campus ID Smart Pay"
                      description="Deduct from semester meal balance: $84.50 remaining."
                      icon={<CreditCard />}
                      badge={<Badge variant="discount" size="sm">5% Student Rebate</Badge>}
                    />
                    <RadioGroupItem
                      value="credit_card"
                      label="Credit / Debit Card"
                      description="Visa, Mastercard, or Google Pay via campus terminal."
                      icon={<CreditCard />}
                    />
                    <RadioGroupItem
                      value="cash_counter"
                      label="Pay with Cash at Counter"
                      description="Pay physical currency when collecting your order."
                      icon={<Store />}
                    />
                  </RadioGroup>
                </div>
              </div>
            </section>

            {/* Standard Circular Radios & Horizontal Scales */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Standard Circular Radios & Sizes</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Classic circular indicators with centered typography and balanced scales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Size sm */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    size="sm" (compact)
                  </span>
                  <RadioGroup defaultValue="medium" size="sm" label="Spice Preference">
                    <RadioGroupItem value="mild" label="Mild (Gentle herbs)" />
                    <RadioGroupItem value="medium" label="Medium (Jalapeño kick)" />
                    <RadioGroupItem value="hot" label="Ghost Chili (Extreme)" />
                  </RadioGroup>
                </div>

                {/* Size md */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    size="md" (default)
                  </span>
                  <RadioGroup defaultValue="medium" size="md" label="Beverage Temperature">
                    <RadioGroupItem value="iced" label="Extra Iced" description="Chilled with cube ice" />
                    <RadioGroupItem value="room" label="Room Temperature" description="No ice added" />
                    <RadioGroupItem value="hot" label="Steamed Hot" description="Served at 70°C" />
                  </RadioGroup>
                </div>

                {/* Size lg */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    size="lg" (prominent)
                  </span>
                  <RadioGroup defaultValue="fast" size="lg" label="Delivery Urgency">
                    <RadioGroupItem value="standard" label="Standard (25-30m)" />
                    <RadioGroupItem value="fast" label="Priority Rush (10-15m)" />
                  </RadioGroup>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= BADGE COMPONENT TAB ======================= */}
        {activeTab === "badge" && (
          <div className="space-y-10">
            {/* Interactive Badge Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Badge Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview badges with custom variants, icons, live status dots, and sizes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "popular",
                          "new",
                          "discount",
                          "available",
                          "primary",
                          "secondary",
                          "outline",
                          "subtle",
                          "destructive",
                        ] as BadgeVariant[]
                      ).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setBadgeVariant(v);
                            if (v === "popular") setBadgeText("Most Popular");
                            else if (v === "new") setBadgeText("New Dish");
                            else if (v === "discount") setBadgeText("20% OFF");
                            else if (v === "available") {
                              setBadgeText("Available Now");
                              setBadgeDot(true);
                              setBadgePulse(true);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            badgeVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as BadgeSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setBadgeSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            badgeSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "full"] as BadgeRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setBadgeRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            badgeRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Badge Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={badgeDot}
                          onChange={(e) => setBadgeDot(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Dot Indicator (`dot`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={badgePulse}
                          onChange={(e) => setBadgePulse(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Pulsing Dot (`pulse`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={badgeWithIcon}
                          onChange={(e) => setBadgeWithIcon(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>With Icon</span>
                      </label>
                    </div>
                  </div>

                  {/* Custom Label */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full max-w-sm px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 border border-border min-h-[260px] space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-xl shadow-xs">
                    <Badge
                      variant={badgeVariant}
                      size={badgeSize}
                      rounded={badgeRounded}
                      dot={badgeDot}
                      pulse={badgePulse}
                      leftIcon={
                        badgeWithIcon ? (
                          badgeVariant === "popular" ? (
                            <Flame />
                          ) : badgeVariant === "new" ? (
                            <Sparkles />
                          ) : badgeVariant === "discount" ? (
                            <Tag />
                          ) : badgeVariant === "available" ? (
                            <Check />
                          ) : undefined
                        ) : undefined
                      }
                    >
                      {badgeText}
                    </Badge>
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Badge
  variant="${badgeVariant}"
  size="${badgeSize}"
  rounded="${badgeRounded}"${badgeDot ? "\n  dot" : ""}${badgePulse ? "\n  pulse" : ""}
>
  ${badgeText}
</Badge>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* The 4 Special Food & Menu Variants Showcase */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Core Food Platform Badges</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Specialized variants requested for CampusBite dishes, deals, and cafeteria items.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Popular */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="popular"
                    </span>
                    <Badge variant="popular" leftIcon={<Flame />}>
                      Popular
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Warm brand primary color (#c34e31) for student favorite meals and top-rated orders.
                  </p>
                </div>

                {/* New */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="new"
                    </span>
                    <Badge variant="new" leftIcon={<Sparkles />}>
                      New Dish
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fresh blue highlight to catch the eye for new seasonal items and menu additions.
                  </p>
                </div>

                {/* Discount */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="discount"
                    </span>
                    <Badge variant="discount" leftIcon={<Tag />}>
                      25% OFF
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Warm secondary amber color for student deals, meal combos, and promo discounts.
                  </p>
                </div>

                {/* Available */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="available"
                    </span>
                    <Badge variant="available" dot pulse>
                      In Stock
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fresh green status badge with live pulsing dot for immediate counter pickup availability.
                  </p>
                </div>
              </div>
            </section>

            {/* Real World Food Card Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Menu Item Previews</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  How badges look attached to food items and campus dining cards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Menu Item 1: Popular Burger */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="popular" leftIcon={<Flame />}>
                      Campus Favorite
                    </Badge>
                    <span className="text-xs font-semibold text-primary font-mono">$6.50</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Double Peri-Peri Smash Burger</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Two grilled beef patties with melted cheddar and signature campus sauce.
                    </p>
                  </div>
                </div>

                {/* Menu Item 2: New Beverage */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="new" leftIcon={<Sparkles />}>
                      New Arrival
                    </Badge>
                    <span className="text-xs font-semibold text-primary font-mono">$4.20</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Iced Caramel Cinnamon Brew</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Slow-steeped cold brew with oat milk and brown sugar syrup.
                    </p>
                  </div>
                </div>

                {/* Menu Item 3: Discount Combo with Available Status */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="discount" leftIcon={<Tag />}>
                      Save $3.00
                    </Badge>
                    <Badge variant="available" dot pulse size="sm">
                      Ready in 5m
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Study Snack Power Combo</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Includes sandwich, fresh chips, and cold lemonade beverage.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= TEXTAREA COMPONENT TAB ======================= */}
        {activeTab === "textarea" && (
          <div className="space-y-10">
            {/* Interactive Textarea Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Textarea Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview multi-line input variants, size scales, corner radii, and live character counting.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["outline", "filled", "subtle"] as TextareaVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setTaVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`textareaSize`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as TextareaSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setTaSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "xl", "full"] as TextareaRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setTaRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resize */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Resize Behavior (`resize`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "vertical", "horizontal", "both"] as TextareaResize[]).map((rs) => (
                        <button
                          key={rs}
                          type="button"
                          onClick={() => setTaResize(rs)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taResize === rs
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          resize-{rs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      State & Count Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taShowCount}
                          onChange={(e) => setTaShowCount(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Character Counter (`showCount`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taRequired}
                          onChange={(e) => setTaRequired(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Required Asterisk</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taError}
                          onChange={(e) => setTaError(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taDisabled}
                          onChange={(e) => setTaDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full">
                    <Textarea
                      label={taLabel}
                      placeholder={taPlaceholder}
                      helperText={!taError ? taHelper : undefined}
                      error={taError ? "Please provide cooking instructions" : undefined}
                      variant={taVariant}
                      textareaSize={taSize}
                      rounded={taRounded}
                      resize={taResize}
                      showCount={taShowCount}
                      maxLength={150}
                      disabled={taDisabled}
                      required={taRequired}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Textarea
  label="${taLabel}"
  placeholder="${taPlaceholder}"
  variant="${taVariant}"
  textareaSize="${taSize}"
  rounded="${taRounded}"${taShowCount ? "\n  showCount\n  maxLength={150}" : ""}${taDisabled ? "\n  disabled" : ""}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Real World Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Examples</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Order delivery notes, kitchen allergy warnings, and dining feedback.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kitchen Allergy & Customization */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Kitchen Dietary Notes
                  </span>
                  <Textarea
                    label="Allergy Instructions"
                    placeholder="e.g. Peanut allergy, gluten intolerant..."
                    variant="outline"
                    showCount
                    maxLength={100}
                    helperText="Kitchen chef will strictly adhere to allergy notes."
                  />
                </div>

                {/* Delivery Drop-off Instructions (Filled) */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Rider Drop-off (Filled)
                  </span>
                  <Textarea
                    label="Hostel Room Directions"
                    defaultValue="Leave order with security desk if after 9 PM. Call upon arrival."
                    variant="filled"
                    rows={3}
                  />
                </div>

                {/* Review & Feedback (Subtle) */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Meal Review (Subtle)
                  </span>
                  <Textarea
                    label="Cafeteria Review"
                    placeholder="How was your spicy burger meal?"
                    variant="subtle"
                    showCount
                    maxLength={250}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= CHECKBOX COMPONENT TAB ======================= */}
        {activeTab === "checkbox" && (
          <div className="space-y-10">
            {/* Interactive Checkbox Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Checkbox Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview check states, indeterminate mode, size scales, and corner radii.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as CheckboxSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setCbSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            cbSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "full"] as CheckboxRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setCbRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            cbRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Toggles */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      State Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbChecked}
                          onChange={(e) => setCbChecked(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Checked</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbIndeterminate}
                          onChange={(e) => setCbIndeterminate(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Indeterminate (`-`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbDisabled}
                          onChange={(e) => setCbDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbError}
                          onChange={(e) => setCbError(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>
                    </div>
                  </div>

                  {/* Custom Label and Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                        Label Text
                      </label>
                      <input
                        type="text"
                        value={cbLabel}
                        onChange={(e) => setCbLabel(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                        Description Text
                      </label>
                      <input
                        type="text"
                        value={cbDescription}
                        onChange={(e) => setCbDescription(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full p-4 rounded-xl bg-card border border-border">
                    <Checkbox
                      label={cbLabel}
                      description={cbDescription}
                      size={cbSize}
                      rounded={cbRounded}
                      checked={cbChecked}
                      onChange={(e) => setCbChecked(e.target.checked)}
                      indeterminate={cbIndeterminate}
                      disabled={cbDisabled}
                      error={cbError ? "You must accept to continue" : undefined}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Checkbox
  label="${cbLabel}"
  description="${cbDescription}"
  size="${cbSize}"
  rounded="${cbRounded}"${cbIndeterminate ? "\n  indeterminate" : ""}${cbDisabled ? "\n  disabled" : ""}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Real World Food Ordering Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Examples</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Meal customization, dietary preferences, and checkout options.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Meal Add-ons */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Meal Customization Add-ons
                  </span>
                  <div className="space-y-3">
                    <Checkbox label="Extra Cheddar Cheese" description="+$1.00 • Melted rich cheddar" defaultChecked />
                    <Checkbox label="Spicy Peri-Peri Sauce" description="+$0.50 • Medium campus heat" />
                    <Checkbox label="Double Patty" description="+$2.50 • Extra 100g beef" />
                  </div>
                </div>

                {/* Dietary Filter Checkboxes */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Dietary Badges (Circular)
                  </span>
                  <div className="space-y-3">
                    <Checkbox label="Vegetarian Only" rounded="full" defaultChecked />
                    <Checkbox label="100% Halal Certified" rounded="full" defaultChecked />
                    <Checkbox label="Gluten-Free Prep" rounded="full" />
                  </div>
                </div>

                {/* Checkout Agreements */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Order Delivery Notification
                  </span>
                  <div className="space-y-3">
                    <Checkbox
                      label="SMS Delivery Alert"
                      description="Receive a text ping when rider is at your campus door."
                      defaultChecked
                    />
                    <Checkbox
                      label="Hostel Room Drop-off"
                      description="Leave order outside room door if in class."
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= DROPDOWN COMPONENT TAB ======================= */}
        {activeTab === "dropdown" && (
          <div className="space-y-10">
            {/* Interactive Dropdown Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Dropdown Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview selection, search filtering, sizes, radii, and validation states.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["outline", "filled", "subtle"] as DropdownVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setDropdownVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dropdownVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as DropdownSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setDropdownSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dropdownSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roundedOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setDropdownRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dropdownRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Options & Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownSearchable}
                          onChange={(e) => setDropdownSearchable(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Searchable (`isSearchable`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownRequired}
                          onChange={(e) => setDropdownRequired(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Required Asterisk</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownError}
                          onChange={(e) => setDropdownError(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownDisabled}
                          onChange={(e) => setDropdownDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownLeftIcon}
                          onChange={(e) => setDropdownLeftIcon(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Left Icon</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownHideScrollbar}
                          onChange={(e) => setDropdownHideScrollbar(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Hide Scrollbar (`hideScrollbar`)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full">
                    <Dropdown
                      label="Pickup & Delivery Point"
                      options={campusLocations}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant={dropdownVariant}
                      size={dropdownSize}
                      rounded={dropdownRounded}
                      isSearchable={dropdownSearchable}
                      disabled={dropdownDisabled}
                      required={dropdownRequired}
                      error={dropdownError ? "Please select a designated campus location" : undefined}
                      helperText={!dropdownError ? "Your hot meal will be prepared near this station." : undefined}
                      leftIcon={dropdownLeftIcon ? <PinIcon /> : undefined}
                      hideScrollbar={dropdownHideScrollbar}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Dropdown
  label="Pickup Point"
  options={campusLocations}
  value="${dropdownValue}"
  onChange={setSelectedPoint}
  variant="${dropdownVariant}"
  size="${dropdownSize}"
  rounded="${dropdownRounded}"
  isSearchable={${dropdownSearchable}}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Real World Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Examples</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Pre-configured dropdowns for campus food ordering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pill Category Filter */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Pill Category Filter
                  </span>
                  <Dropdown
                    placeholder="Filter by Food Category"
                    options={mealCategories}
                    defaultValue="meals"
                    rounded="full"
                    variant="outline"
                  />
                </div>

                {/* Searchable Station Picker */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Searchable Stations (Filled)
                  </span>
                  <Dropdown
                    label="Cafeteria Station"
                    options={campusLocations}
                    defaultValue="central"
                    variant="filled"
                    isSearchable
                  />
                </div>

                {/* Validation Error */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Error Validation State
                  </span>
                  <Dropdown
                    label="Required Dropdown"
                    options={mealCategories}
                    error="Selection is required to proceed"
                    required
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= INPUT COMPONENT TAB ======================= */}
        {activeTab === "input" && (
          <div className="space-y-10">
            {/* Interactive Input Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Input Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview all combinations of variants, sizes, radii, and error states.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inputVariants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setInputVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            inputVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`inputSize`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inputSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setInputSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            inputSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roundedOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setInputRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            inputRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Toggles */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      State & Icon Controls
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inputRequired}
                          onChange={(e) => setInputRequired(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Required Asterisk</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasError}
                          onChange={(e) => {
                            setHasError(e.target.checked);
                            if (e.target.checked) setHasSuccess(false);
                          }}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasSuccess}
                          onChange={(e) => {
                            setHasSuccess(e.target.checked);
                            if (e.target.checked) setHasError(false);
                          }}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Success State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inputDisabled}
                          onChange={(e) => setInputDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inputLeftIcon}
                          onChange={(e) => setInputLeftIcon(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Left Icon</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full">
                    <Input
                      label={inputLabel}
                      placeholder={inputPlaceholder}
                      helperText={!hasError && !hasSuccess ? inputHelper : undefined}
                      error={hasError ? "Please enter a valid campus delivery room" : false}
                      success={hasSuccess}
                      variant={inputVariant}
                      inputSize={inputSize}
                      rounded={inputRounded}
                      disabled={inputDisabled}
                      required={inputRequired}
                      leftIcon={inputLeftIcon ? <PinIcon /> : undefined}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= BUTTON COMPONENT TAB ======================= */}
        {activeTab === "button" && (
          <div className="space-y-10">
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Button Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Customize button props and inspect live styling with the global theme.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {btnVariants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setBtnVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            btnVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {btnSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setBtnSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            btnSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roundedOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setBtnRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            btnRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={btnLoading}
                        onChange={(e) => setBtnLoading(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Loading (`isLoading`)</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={btnDisabled}
                        onChange={(e) => setBtnDisabled(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Disabled (`disabled`)</span>
                    </label>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-muted/40 border border-border min-h-[260px] space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    rounded={btnRounded}
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                    leftIcon={btnLeftIcon ? <BagIcon /> : undefined}
                    rightIcon={btnRightIcon ? <ArrowRightIcon /> : undefined}
                  >
                    {btnSize.startsWith("icon") ? <BagIcon /> : btnText}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
